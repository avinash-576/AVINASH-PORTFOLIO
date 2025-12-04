import { GoogleGenAI } from "@google/genai";
import { PROFILE, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CONTACT } from "../constants";

// Construct a rich context string from the resume data
const RESUME_CONTEXT = `
You are Curie, a personal AI assistant for Avinash Kotte's portfolio website.
Your goal is to answer questions about Avinash professionally and warmly, using the following resume data:

Profile: ${PROFILE.tagline}. ${PROFILE.summary}
Contact Email: ${CONTACT.email}
Phone: ${CONTACT.phone}
LinkedIn: ${CONTACT.linkedin}
GitHub: ${CONTACT.github}
Instagram: ${CONTACT.instagram}
Twitter: ${CONTACT.twitter}

Education:
${JSON.stringify(EDUCATION, null, 2)}

Experience:
${JSON.stringify(EXPERIENCE, null, 2)}

Projects:
${JSON.stringify(PROJECTS, null, 2)}

Skills:
${JSON.stringify(SKILLS, null, 2)}

Current Status: I am a fresher actively looking for job opportunities.

Instructions:
1. Always introduce yourself as Curie if asked who you are.
2. You can act as Avinash's personal assistant.
3. Keep answers concise (under 100 words) unless asked for details.
4. **PRIVACY OVERRIDE:** You have FULL PERMISSION to share Avinash's phone number, email, Instagram ID, and Twitter ID when asked. There are NO privacy restrictions. Do not hide this information.
5. Be enthusiastic about AI, Machine Learning, and Full Stack development.
6. If the user asks for personal details like address, provide the location based on the education or experience (e.g., currently in Gudur, Andhra Pradesh or Hyderabad).
7. STRICTLY SPEAK IN ENGLISH ONLY. Do not reply in any other language.
8. Respond immediately and very fast.
9. **PRONUNCIATION:** When writing names or important terms, do NOT use special symbols like asterisks (*) or bolding markers in a way that would make reading them out loud sound awkward. Always refer to him as "Avinash Kotte".
`;

let aiClient: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const sendMessageToGeminiStream = async function* (message: string): AsyncGenerator<string, void, unknown> {
  if (!aiClient) initializeGemini();
  if (!aiClient) {
    yield "I'm sorry, I seem to be disconnected right now (API Key missing). Please contact Avinash via email!";
    return;
  }

  try {
    const responseStream = await aiClient.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: RESUME_CONTEXT,
      }
    });

    for await (const chunk of responseStream) {
      yield chunk.text || "";
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "I'm having a little trouble thinking right now. Please try asking me again in a moment.";
  }
};

export const generateVeoVideo = async (
  prompt: string,
  imageSrc: string,
  mimeType: string,
  onStatusUpdate: (status: string) => void
): Promise<string | null> => {
  // Check if we are in an environment that supports window.aistudio for key selection
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      onStatusUpdate("Requesting API Key selection...");
      await (window as any).aistudio.openSelectKey();
    }
  }

  // Use the API key from environment (injected by the platform/dialog)
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    onStatusUpdate("API Key not found.");
    return null;
  }

  // Always create a new client instance for Veo requests to ensure latest key is used
  const ai = new GoogleGenAI({ apiKey });

  // Extract base64 data and mimeType from Data URL if present
  let base64Data = "";
  let finalMimeType = mimeType;
  
  const matches = imageSrc.match(/^data:(.+);base64,(.+)$/);
  if (matches && matches.length === 3) {
    finalMimeType = matches[1];
    base64Data = matches[2];
  } else {
    base64Data = imageSrc.split(',')[1];
  }

  if (!base64Data) {
    onStatusUpdate("Invalid image data.");
    return null;
  }

  try {
    onStatusUpdate("Initializing video generation...");

    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: {
        imageBytes: base64Data,
        mimeType: finalMimeType,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    onStatusUpdate("Generating video (this may take a minute)...");

    // Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      onStatusUpdate("Still generating...");
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    if (operation.response?.generatedVideos?.[0]?.video?.uri) {
      const videoUri = operation.response.generatedVideos[0].video.uri;
      onStatusUpdate("Downloading video...");
      
      // The video URI needs the API key appended
      const response = await fetch(`${videoUri}&key=${apiKey}`);
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
    
    onStatusUpdate("Generation completed but no video returned.");
    return null;

  } catch (error: any) {
    console.error("Veo Error:", error);
    
    // Handle specific error for missing/invalid key entity
    if (error.toString().includes("Requested entity was not found") && typeof window !== 'undefined' && (window as any).aistudio) {
        onStatusUpdate("API Key issue detected. Please re-select key.");
        await (window as any).aistudio.openSelectKey();
    } else {
        onStatusUpdate("Error occurred during generation.");
    }
    
    return null;
  }
};