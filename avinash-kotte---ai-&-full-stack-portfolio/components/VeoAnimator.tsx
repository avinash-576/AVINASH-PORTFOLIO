import React, { useState, useRef } from 'react';
import { Upload, Film, Play, Loader2, Video } from 'lucide-react';
import { generateVeoVideo } from '../services/gemini';

export const VeoAnimator: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setVideoUrl(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    
    setIsGenerating(true);
    setStatus('Starting...');
    setVideoUrl(null);

    try {
      const result = await generateVeoVideo(
        prompt || "Animate this image naturally",
        selectedImage,
        'image/jpeg', // Assuming jpeg/png, Veo handles standard types
        (s) => setStatus(s)
      );
      if (result) {
        setVideoUrl(result);
        setStatus('');
      } else {
        setStatus('Failed to generate video.');
      }
    } catch (error) {
      setStatus('Error occurred.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900/50 rounded-3xl border border-slate-800 p-8 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
          <Film size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Veo AI Animator</h3>
          <p className="text-slate-400 text-sm">Bring your images to life with Google's Generative Video</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all ${
              selectedImage 
                ? 'border-purple-500/50 bg-slate-950/50' 
                : 'border-slate-700 hover:border-purple-500 hover:bg-slate-800/50'
            }`}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Upload" className="h-full w-full object-contain rounded-xl" />
            ) : (
              <div className="text-center p-6">
                <Upload className="mx-auto text-slate-500 mb-3" size={32} />
                <p className="text-slate-300 font-medium">Click to upload image</p>
                <p className="text-xs text-slate-500 mt-1">JPG or PNG supported</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Animation Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Make the water flow, add cinematic lighting..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-purple-500 transition-colors resize-none h-24"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={!selectedImage || isGenerating}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              !selectedImage || isGenerating
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-[1.02] shadow-lg shadow-purple-900/20'
            }`}
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {status || 'Generating...'}
              </>
            ) : (
              <>
                <Video size={20} />
                Generate Video
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden h-96 md:h-auto">
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-8 opacity-50">
              <div className="w-16 h-16 rounded-full bg-slate-900 mx-auto flex items-center justify-center mb-4 border border-slate-800">
                <Play className="text-slate-600 ml-1" size={24} />
              </div>
              <p className="text-slate-500">Video output will appear here</p>
            </div>
          )}
          
          {isGenerating && !videoUrl && (
             <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
               <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4"></div>
               <p className="text-purple-300 font-mono text-sm animate-pulse">{status}</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};