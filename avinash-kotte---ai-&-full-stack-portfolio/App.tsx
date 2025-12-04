import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Linkedin, 
  Mail, 
  ExternalLink,
  MapPin,
  Calendar,
  Award,
  Phone,
  Copy,
  Check,
  Send,
  MessageCircle,
  Instagram,
  Twitter,
  FileCheck,
  Brain,
  Code2,
  Github,
  FileText
} from 'lucide-react';
import { 
  PROFILE, 
  NAV_LINKS, 
  EXPERIENCE, 
  PROJECTS, 
  SKILLS, 
  EDUCATION,
  ACHIEVEMENTS,
  CERTIFICATIONS,
  CONTACT,
  getCategoryIcon
} from './constants';
import { Certification } from './types';
import { SkillChart } from './components/SkillChart';
import { GeminiChat } from './components/GeminiChat';

// Typewriter component that types text one char at a time
const Typewriter = ({ 
  text, 
  delay = 100, 
  startDelay = 0, 
  onComplete, 
  className = '' 
}: { 
  text: string; 
  delay?: number; 
  startDelay?: number; 
  onComplete?: () => void; 
  className?: string; 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, started, onComplete]);

  return <span className={className}>{displayText}</span>;
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    } else {
      console.warn(`Element with id '${id}' not found`);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0A%0A${formData.message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Please fill in your name and message.");
      return;
    }
    const cleanPhone = CONTACT.phone.replace(/\D/g, '');
    const text = `Hi Avinash, I'm ${formData.name} (${formData.email}).\n\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleOpenCert = (url?: string) => {
    if (url) {
      // Create a temporary link and click it to ensure best compatibility with local files if possible
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Certificate preview not available for this item.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-600/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-[40%] right-[-10%] w-80 h-80 bg-secondary-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Certification Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedCert(null)}>
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-2xl w-full relative shadow-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedCert(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-500/10 rounded-xl text-primary-400">
                  <Award size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.name}</h3>
                  <p className="text-lg text-primary-400 font-medium">{selectedCert.issuer}</p>
                </div>
              </div>
              
              <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-800">
                <p className="text-slate-300 leading-relaxed text-lg">
                  {selectedCert.description || "No description available."}
                </p>
                {selectedCert.credentialUrl && selectedCert.credentialUrl.startsWith("C:") && (
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-200 text-sm flex gap-2 items-start">
                    <FileText size={16} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Local File Path Detected:</strong> This certificate points to a file on your local computer. 
                      <br/>Path: <code className="text-xs bg-black/30 p-1 rounded mt-1 block break-all">{selectedCert.credentialUrl}</code>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={16} />
                  <span className="font-semibold">{selectedCert.date}</span>
                </div>
                {selectedCert.credentialUrl && (
                  <button 
                    onClick={() => handleOpenCert(selectedCert.credentialUrl)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-colors font-medium text-sm shadow-lg shadow-primary-900/20"
                  >
                    View Certificate <ExternalLink size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-lg border-b border-slate-800' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* AK Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/20">
              <span className="text-white font-bold text-lg tracking-tighter">AK</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:inline-block">Avinash Kotte</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button 
                key={link.label} 
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-slate-400 hover:text-primary-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          <button className="md:hidden text-slate-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
            {NAV_LINKS.map(link => (
              <button 
                key={link.label} 
                onClick={() => scrollToSection(link.href)}
                className="text-left text-slate-300 hover:text-primary-400 py-2 border-b border-slate-800/50"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative z-10 min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-primary-400 text-xs font-bold tracking-widest uppercase shadow-sm animate-fade-in-up">
              Fresher • Actively Seeking Opportunities
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight min-h-[160px]">
              <span className="block mb-2">
                <Typewriter text="Hello. I am " delay={100} onComplete={() => setShowName(true)} />
              </span>
              {showName && (
                <Typewriter 
                  text="Avinash Kotte" 
                  delay={150} 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-300% animate-gradient inline-block"
                />
              )}
              <span className="inline-block w-1.5 h-10 md:h-16 ml-2 bg-primary-400 animate-blink align-middle"></span>
            </h1>
            
            {/* Enhanced Summary Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 p-6 rounded-xl shadow-lg">
                 <p className="text-lg text-slate-300 leading-relaxed font-light">
                   {PROFILE.tagline}. <br/>
                   <span className="block mt-3 text-base text-slate-400">{PROFILE.summary}</span>
                 </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all shadow-lg shadow-primary-900/20 hover:shadow-primary-600/30 flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                <Linkedin size={20} />
                Connect on LinkedIn
              </a>
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium transition-all flex items-center gap-2 backdrop-blur-sm bg-slate-900/30"
              >
                View Work
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 group">
               {/* Animated Gradient Border */}
               <div className="absolute inset-[-6px] rounded-full bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 animate-spin-slow opacity-80 blur-md group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-slate-950 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                 <img 
                  src={PROFILE.photos.formal} 
                  alt={PROFILE.name}
                  className="w-full h-full object-cover object-top contrast-110 brightness-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section - Reordered to be after Hero */}
      <section id="education" className="relative z-10 py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 flex items-center gap-3 border-b border-slate-800 pb-4">
              <Calendar className="text-primary-500" size={32} />
              Education
           </h2>
           <div className="grid md:grid-cols-3 gap-8">
             {EDUCATION.map((edu, idx) => (
                <div key={idx} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-primary-500/50 transition-all shadow-lg">
                  <div className="text-sm font-mono text-primary-400 mb-2">{edu.year}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{edu.institution}</h3>
                  <p className="text-slate-300 text-sm mb-4">{edu.degree}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800/50">
                     <span className="flex items-center gap-1"><MapPin size={12}/> {edu.location}</span>
                     <span className="font-semibold text-white">{edu.score}</span>
                  </div>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Professional Journey</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              My hands-on experience in building intelligent systems and scalable web applications.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            <div className="absolute left-0 md:left-1/2 h-full w-px bg-slate-800 transform md:-translate-x-1/2"></div>
            <div className="space-y-12">
              {EXPERIENCE.map((exp, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-[-5px] md:left-1/2 top-6 w-3 h-3 rounded-full bg-primary-500 transform md:-translate-x-1.5 ring-4 ring-slate-950 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                  <div className="md:w-1/2"></div>
                  <div className="md:w-1/2 pl-8 md:pl-0">
                    <div className={`bg-slate-950/80 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl hover:border-primary-500/30 transition-all hover:shadow-xl hover:shadow-primary-900/10 ${index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'}`}>
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-white leading-tight">{exp.role}</h3>
                          <span className="text-xs font-mono text-primary-400 bg-primary-950/50 px-2 py-1 rounded border border-primary-900/50 whitespace-nowrap">
                            {exp.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="flex items-center gap-1.5 font-medium text-slate-200"><ExternalLink size={14}/> {exp.company}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                          <span className="flex items-center gap-1.5"><MapPin size={14}/> {exp.location}</span>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="text-slate-400 text-sm flex items-start gap-3 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0" />
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
              <p className="text-slate-400 text-lg">Innovations in AI, ML, and Modern Web Tech.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <div key={index} className="group bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-primary-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/10 hover:-translate-y-1 flex flex-col h-full relative">
                <div className="p-8 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-2 rounded-lg ${
                      project.category === 'AI/ML' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-teal-500/20 text-teal-300'
                    }`}>
                      {project.category === 'AI/ML' ? <Brain size={24} /> : <Code2 size={24} />}
                    </div>
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-colors relative z-20"
                        title="View Code on GitHub"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block group-hover:text-primary-400 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {project.title}
                    </h3>
                  </a>
                  
                  <div className="flex-grow">
                    <ul className="space-y-2 mb-8">
                      {project.description.map((desc, i) => (
                        <li key={i} className="text-slate-400 text-sm leading-relaxed">
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800/50 mt-auto">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs font-medium text-slate-300 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Clickable Card Overlay */}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0" aria-label={`View ${project.title} on GitHub`}></a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-24 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent pointer-events-none"></div>
                <h3 className="text-center text-slate-400 mb-8 text-sm font-mono tracking-widest uppercase">Skill Proficiency Radar</h3>
                <SkillChart />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Technical Arsenal</h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                Proficient in a diverse stack of technologies, from low-level systems to high-level AI frameworks.
              </p>
              
              <div className="space-y-10">
                {['Languages', 'Frameworks', 'Concepts', 'Tools'].map(category => (
                  <div key={category}>
                    <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="p-1.5 bg-slate-800 rounded text-primary-400">{getCategoryIcon(category)}</span>
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {SKILLS.filter(s => s.category === category).map(skill => (
                        <div key={skill.name} className="group relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                          <div className="relative bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-lg flex items-center justify-between gap-4 group-hover:bg-slate-900/90 transition-all">
                            <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                            <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500" style={{ width: `${skill.level}%` }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section (Education removed from here) */}
      <section id="certifications" className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          {/* Certifications Grid */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-3 border-b border-slate-800 pb-4">
              <FileCheck className="text-secondary-500" size={32} />
              Certifications & Credentials
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CERTIFICATIONS.map((cert, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedCert(cert)}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-900/10 flex flex-col h-full cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  <div className="mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-primary-500/50 transition-colors">
                      <Award size={20} />
                    </div>
                  </div>
                  <h4 className="font-bold text-white mb-2 line-clamp-2 min-h-[3rem]">{cert.name}</h4>
                  <p className="text-xs text-primary-400 font-medium mb-3">{cert.issuer}</p>
                  
                  {cert.description && (
                    <p className="text-xs text-slate-500 mb-4 line-clamp-3 leading-relaxed flex-grow">
                      {cert.description}
                    </p>
                  )}
                  
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-auto">
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{cert.date}</span>
                    <span className="flex items-center gap-1 text-xs text-primary-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
           <div className="mt-20">
             <h2 className="text-2xl font-bold text-white mb-8">Honors & Achievements</h2>
             <div className="grid md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-slate-900 to-slate-900/50 p-6 rounded-xl border border-slate-800 flex items-start gap-4">
                    <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-500 mt-1">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{ach.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{ach.description}</p>
                    </div>
                  </div>
                ))}
             </div>
           </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Ready to collaborate? Reach out and let's build something extraordinary together.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-primary-500/50 transition-colors">
                   <Mail className="text-primary-500 mb-4" size={28} />
                   <h3 className="text-lg font-bold text-white mb-1">Email</h3>
                   <p className="text-slate-400 text-sm mb-4 break-all">{CONTACT.email}</p>
                   <button onClick={() => handleCopy(CONTACT.email, 'email')} className="text-xs font-medium text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 w-fit">
                     {copied === 'email' ? <Check size={14} /> : <Copy size={14} />} Copy
                   </button>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-secondary-500/50 transition-colors">
                   <Phone className="text-secondary-500 mb-4" size={28} />
                   <h3 className="text-lg font-bold text-white mb-1">Phone</h3>
                   <p className="text-slate-400 text-sm mb-4">{CONTACT.phone}</p>
                   <button onClick={() => handleCopy(CONTACT.phone, 'phone')} className="text-xs font-medium text-white bg-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 w-fit">
                     {copied === 'phone' ? <Check size={14} /> : <Copy size={14} />} Copy
                   </button>
                </div>
              </div>

              {/* Socials */}
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6">Connect on Social</h3>
                <div className="flex gap-4">
                   <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:border-primary-500 transition-all hover:-translate-y-1">
                     <Linkedin size={24} />
                   </a>
                   <a href={CONTACT.github} target="_blank" rel="noreferrer" className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:border-primary-500 transition-all hover:-translate-y-1">
                     <Github size={24} />
                   </a>
                   <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500 transition-all hover:-translate-y-1">
                     <Instagram size={24} />
                   </a>
                   <a href={CONTACT.twitter} target="_blank" rel="noreferrer" className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:border-white transition-all hover:-translate-y-1">
                     <Twitter size={24} />
                   </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-all focus:ring-1 focus:ring-primary-500/50"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-all focus:ring-1 focus:ring-primary-500/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-primary-500 transition-all focus:ring-1 focus:ring-primary-500/50 resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button 
                    onClick={handleContactSubmit}
                    className="bg-primary-600 hover:bg-primary-500 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-primary-900/20"
                  >
                    <Send size={18} />
                    Send Email
                  </button>
                  <button 
                    onClick={handleWhatsAppSubmit}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">© 2023 Avinash Kotte.</p>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <GeminiChat />
    </div>
  );
}

export default App;