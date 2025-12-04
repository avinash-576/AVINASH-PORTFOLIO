import { 
  Profile, 
  SocialLinks, 
  Education, 
  Experience, 
  Project, 
  Skill, 
  Certification, 
  Achievement 
} from './types';
import React from 'react';
import { 
  Code2, 
  Brain, 
  Database, 
  Terminal, 
  Cpu
} from 'lucide-react';

// User provided image URLs
const FORMAL_PHOTO_URL = "https://cdn.pixabay.com/photo/2023/04/26/09/25/ai-generated-7951983_1280.png"; 
const CASUAL_PHOTO_URL = "https://img.freepik.com/premium-photo/hand-drawn-cartoon-anime-fashion-illustration-handsome-handsome-boy_561641-16355.jpg";

export const PROFILE: Profile = {
  name: "Avinash Kotte",
  tagline: "AI Engineer & Full Stack Developer",
  summary: "Innovative and results-driven Computer Science graduate specializing in Artificial Intelligence and Full Stack Development. Passionate about building intelligent systems that solve real-world problems. With a strong foundation in Python, Java, and modern web technologies, I am eager to contribute to dynamic technical teams and drive impactful solutions.",
  photos: {
    formal: FORMAL_PHOTO_URL,
    casual: CASUAL_PHOTO_URL
  }
};

export const CONTACT: SocialLinks = {
  email: "avinashkotte15@gmail.com",
  phone: "+91-6305942445",
  linkedin: "https://linkedin.com/in/kotte-avinash",
  github: "https://github.com/avinash-576",
  instagram: "https://www.instagram.com/rocking_avinash576?igsh=MW1wYzU5YTBvZTV2cA==",
  twitter: "https://x.com/AvinashKot48511"
};

export const EDUCATION: Education[] = [
  {
    institution: "Narayana Engineering College",
    degree: "B.Tech in Computer Science and Engineering",
    year: "Expected May 2026",
    location: "Gudur, Andhra Pradesh",
    score: "CGPA: 8.75/10"
  },
  {
    institution: "Sri Chaitanya Boys Junior College",
    degree: "HSC - Class XII",
    year: "May 2022",
    location: "Vijayawada, Andhra Pradesh",
    score: "93%"
  },
  {
    institution: "Pratibha English Medium School",
    degree: "SSC - Class X",
    year: "March 2020",
    location: "Jnagareddygudem, Telangana",
    score: "98%"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Machine Learning Intern",
    company: "Swecha",
    duration: "Jul 2025", 
    location: "Hyderabad",
    description: [
      "Developed and deployed machine learning models using Python and TensorFlow.",
      "Implemented data preprocessing pipelines and conducted EDA on large datasets.",
      "Optimized model performance and reduced inference time by 30%."
    ]
  },
  {
    role: "Python Developer",
    company: "Codesoft",
    duration: "Oct 2024",
    location: "Chennai",
    description: [
      "Developed Python-based applications for various client requirements.",
      "Contributed to team environment focused on Python best practices."
    ]
  },
  {
    role: "AI Engineer & Data Analyst",
    company: "APSCHE",
    duration: "Aug 2024",
    location: "Vijayawada",
    description: [
      "Applied AI and data analytics to solve problems and drive business insights.",
      "Performed comprehensive data analysis to support decision-making."
    ]
  },
  {
    role: "Web Developer",
    company: "Apex Planet",
    duration: "May 2024",
    location: "Bangalore",
    description: [
      "Developed and maintained web applications using HTML, CSS, JavaScript.",
      "Built responsive websites with modern frameworks and technologies."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Fake News Detection using AI and NLP",
    tech: ["Python", "NLP", "Machine Learning", "Streamlit"],
    category: "AI/ML",
    description: [
      "Developed an AI-powered system using Python and NLP techniques to classify news articles as fake or real.",
      "Implemented machine learning models achieving 85% accuracy on test datasets.",
      "Deployed as web application using Streamlit and integrated with APK for mobile access."
    ],
    githubUrl: "https://github.com/avinash-576"
  },
  {
    title: "Intelligent Image Analysis System",
    tech: ["Computer Vision", "AI", "Python", "Transfer Learning"],
    category: "AI/ML",
    description: [
      "Engineered a system using Computer Vision and AI to analyze and interpret images.",
      "Applied transfer learning with pre-trained models for efficient inference."
    ],
    githubUrl: "https://github.com/avinash-576"
  },
  {
    title: "AI Agents for Autonomous Tasks",
    tech: ["Python", "Reinforcement Learning"],
    category: "AI/ML",
    description: [
      "Built and deployed autonomous AI agents for various tasks with self-learning capabilities.",
      "Demonstrated proficiency in AI development, deployment, and optimization."
    ],
    githubUrl: "https://github.com/avinash-576"
  },
  {
    title: "Diabetic Detection System",
    tech: ["Machine Learning", "Python", "Scikit-learn"],
    category: "AI/ML",
    description: [
      "Developed ML model to predict likelihood of diabetes based on patient health data.",
      "Achieved 88% accuracy with data preprocessing and feature engineering."
    ],
    githubUrl: "https://github.com/avinash-576"
  }
];

export const SKILLS: Skill[] = [
  // Languages
  { name: "Python", level: 85, category: "Languages" },
  { name: "Java", level: 70, category: "Languages" },
  { name: "C", level: 40, category: "Languages" },
  { name: "JavaScript", level: 55, category: "Languages" },
  
  // Frameworks
  { name: "React.js", level: 50, category: "Frameworks" },
  { name: "Node.js", level: 30, category: "Frameworks" },
  { name: "TensorFlow", level: 45, category: "Frameworks" },
  { name: "OpenCV", level: 90, category: "Frameworks" },
  
  // Concepts
  { name: "Machine Learning", level: 92, category: "Concepts" },
  { name: "Deep Learning", level: 87, category: "Concepts" },
  { name: "NLP", level: 98, category: "Concepts" },
  { name: "Computer Vision", level: 90, category: "Concepts" },
  { name: "Data Structures", level: 35, category: "Concepts" },
  
  // Tools
  { name: "SQL", level: 86, category: "Tools" },
  { name: "GitHub", level: 97, category: "Tools" },
];

export const CERTIFICATIONS: Certification[] = [
  { 
    name: "Introduction to IoT and Digital Transformation", 
    issuer: "Cisco Networking Academy / NSDC",
    date: "Dec 25, 2024",
    description: "Comprehensive overview of IoT concepts and digital transformation strategies.",
    credentialUrl: "C:\\Users\\Gopika Sri\\Downloads\\Introduction_to_IoT_certificate_avinashkotte15-gmail-com_42548c77-a7a0-49fe-866e-157b4ab9dabb.pdf"
  },
  { 
    name: "AI for Entrepreneurship", 
    issuer: "Intel Technology India Pvt Ltd / Skill India",
    date: "Dec 24, 2024",
    description: "Leveraging Artificial Intelligence for business innovation and entrepreneurial ventures."
  },
  { 
    name: "Installation of POS Terminal Machine", 
    issuer: "NSDC / Skill India Digital Hub",
    date: "Oct 22, 2024",
    description: "Technical training on installation and maintenance of Point of Sale terminals (NSQF: 4)."
  },
  { 
    name: "HR Leadership Council Connect", 
    issuer: "NSDC / Skill India Digital Hub",
    date: "Oct 21, 2024",
    description: "Leadership strategies and HR management practices."
  },
  { 
    name: "Summer of AI Internship", 
    issuer: "Viswam.AI / Swecha",
    date: "July 2025",
    description: "4-week internship focused on building impactful technology solutions for the Global South."
  },
  { 
    name: "Generative AI with IBM Cloud", 
    issuer: "SmartBridge / APSCHE",
    date: "July 2025",
    description: "Applied Generative AI models and cloud deployment strategies.",
    credentialUrl: "C:\\Users\\Gopika Sri\\Downloads\\avinash apsche internship crtificate.pdf"
  },
  { 
    name: "SQL Basic", 
    issuer: "HackerRank",
    date: "2024",
    description: "Verified proficiency in SQL fundamentals and database queries."
  },
  { 
    name: "TCS ion Career Edge", 
    issuer: "TCS",
    date: "2024",
    description: "Young Professional Training covering soft skills and corporate etiquette."
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { title: "Best NSS Volunteer Award", description: "Recognized for outstanding volunteer service and community contribution during B.Tech studies at Narayana Engineering College." },
  { title: "Second Prize in CodeQuest", description: "Secured 2nd position in programming competition organized by Unstop." },
  { title: "Competitive Coding Proficiency", description: "Active participant on LeetCode, GeeksForGeeks, and HackerRank with strong problem-solving skills." },
  { title: "Social Engagements", description: "Active NSS Volunteer and Competitive Coder." }
];

export const NAV_LINKS = [
  { label: "About", href: "about" },
  { label: "Education", href: "education" },
  { label: "Experience", href: "experience" },
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "skills" },
  { label: "Certifications", href: "certifications" },
  { label: "Contact", href: "contact" },
];

// Helper to get Icon for category
export const getCategoryIcon = (cat: string) => {
  switch (cat) {
    case 'Languages': return <Code2 className="w-4 h-4" />;
    case 'Frameworks': return <Terminal className="w-4 h-4" />;
    case 'Concepts': return <Brain className="w-4 h-4" />;
    case 'Tools': return <Database className="w-4 h-4" />;
    default: return <Cpu className="w-4 h-4" />;
  }
};