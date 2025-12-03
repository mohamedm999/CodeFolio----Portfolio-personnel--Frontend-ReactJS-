import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, Rocket, Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, ExternalLink, Briefcase, Code, Award } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { getProfile } from '../services/firebase/profile.service';
import { Profile, Project, Skill, Experience } from '../types/firebase.types';
import { Loading } from '../components/ui/Loading';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ChatWidget } from '../components/ui/ChatWidget';
import { Loader } from '../components/ui/Loader';

export const Home: React.FC = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { data: projects, loading: projectsLoading } = useFirestore<Project>('projects');
  const { data: skills, loading: skillsLoading } = useFirestore<Skill>('skills');
  const { data: experiences, loading: experiencesLoading } = useFirestore<Experience>('experiences');

  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<Error | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setProfileError(err);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const loading = projectsLoading || skillsLoading || experiencesLoading || profileLoading;
  const error = profileError;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message!');
    setFormState({ name: '', email: '', message: '' });
  };

  // Show animated loader on first visit
  if (isInitialLoading) {
    return <Loader onLoadingComplete={() => setIsInitialLoading(false)} />;
  }

  // Show simple loading while fetching data
  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-purple-500/30 selection:text-white">
      <Navbar profileName={profile?.name} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-pink-600/30 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Available for Freelance
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient-x">
                {profile?.name || "CodeZenith"}
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              {profile?.title || "Full Stack Developer"}
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
              {profile?.bio || "Crafting modern, responsive web applications with clean UI, robust backend architecture, and seamless user experiences."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a href="#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/50 transition-all transform hover:-translate-y-1 flex items-center gap-2">
                <Rocket size={20} />
                Hire Me
              </a>
              <button className="px-8 py-3 rounded-full border border-purple-500/30 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                <Download size={20} />
                Download CV
              </button>
              <a href="#projects" className="text-gray-300 hover:text-white flex items-center gap-2 transition-colors">
                View My Work <Eye size={16} />
              </a>
            </div>
          </motion.div>

          {/* Hero Image with floating badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[750px] lg:-mb-20">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full blur-[80px] opacity-40 animate-pulse"></div>
              <img
                src={profile?.avatar || "/me.png"}
                alt={profile?.name || "Developer"}
                className="relative w-full h-auto object-contain z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">About <span className="text-purple-500">Me</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image with spinning borders */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 border-2 border-purple-500 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-2 border-2 border-pink-500 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-4 rounded-full overflow-hidden bg-gray-900">
                  <img
                    src={profile?.avatar || "/me.png"}
                    alt="Profile"
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {profile?.bio || "I'm a Full-Stack Developer with hands-on experience building fast, scalable, and responsive web applications using React.js, Node.js, Express, MongoDB, and PostgreSQL/MySQL."}
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                My skill set spans both frontend and backend development, with a strong focus on clean code, smooth user experiences, and animation-driven UI using libraries like Framer Motion.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card p-4 rounded-xl text-center hover:bg-purple-500/10 transition-colors">
                  <Briefcase className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">1+</h3>
                  <p className="text-gray-400 text-sm">Years Experience</p>
                </div>
                <div className="glass-card p-4 rounded-xl text-center hover:bg-purple-500/10 transition-colors">
                  <Code className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">{projects.length}+</h3>
                  <p className="text-gray-400 text-sm">Projects Completed</p>
                </div>
                <div className="glass-card p-4 rounded-xl text-center hover:bg-purple-500/10 transition-colors">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">100%</h3>
                  <p className="text-gray-400 text-sm">Client Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">My <span className="text-purple-500">Skills</span></h2>
            <p className="text-gray-400">Technological stack I work with</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all group hover:-translate-y-2"
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">💻</span>
                  <h3 className="text-lg font-semibold text-white mb-4">{skill.name}</h3>

                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 text-right w-full">{skill.level}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured <span className="text-purple-500">Projects</span></h2>
            <p className="text-gray-400">A curated collection of my best work</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300"
              >
                {project.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] to-transparent opacity-60 z-10" />
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies?.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="flex items-center gap-2 text-sm text-white hover:text-purple-400 transition-colors">
                        View Project <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Get In <span className="text-purple-500">Touch</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#030014] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#030014] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#030014] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600 resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                  Send Message <Send size={18} />
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-400 mb-8">
                  I'm always excited to work on new projects and collaborate with amazing people. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                {profile?.email && (
                  <div className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">{profile.email}</p>
                    </div>
                  </div>
                )}

                {profile?.phone && (
                  <div className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white font-medium">{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile?.location && (
                  <div className="glass-card p-4 rounded-xl flex items-center gap-4 hover:border-purple-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-white font-medium">{profile.location}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-8">
                <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all">
                    <Github size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </div>
  );
};
