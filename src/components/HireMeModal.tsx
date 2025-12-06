import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mail, Calendar, MessageCircle, UserPlus, FileText, 
  Send, ArrowRight, ArrowLeft, CheckCircle, Briefcase, 
  Clock, DollarSign, Phone, Linkedin, Github
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: {
    name?: string;
    email?: string;
    phone?: string;
    title?: string;
  };
}

// Contact info - Update with your details
const CONTACT_INFO = {
  name: 'Mohamed Moukhtari',
  title: 'Full Stack Developer',
  email: 'moukhtari.mohamed.dev@gmail.com',
  phone: '+212772841600',
  phoneDisplay: '+212 772 841 600',
  linkedin: 'https://www.linkedin.com/in/mohamed-moukhtari-197a53338/',
  github: 'https://github.com/mohamedm999',
  website: 'https://code-folio-portfolio-personnel-fron.vercel.app/',
  calendly: 'https://calendly.com/moukhtari-mohamed-dev', // Update with your Calendly
};

// EmailJS Config - Set these in Vercel Environment Variables
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

type ModalView = 'main' | 'email' | 'form' | 'success';

export const HireMeModal: React.FC<HireMeModalProps> = ({ isOpen, onClose, profile }) => {
  const { t } = useTranslation();
  const [view, setView] = useState<ModalView>('main');
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    message: '',
  });

  const contactInfo = {
    ...CONTACT_INFO,
    name: profile?.name || CONTACT_INFO.name,
    email: profile?.email || CONTACT_INFO.email,
    phone: profile?.phone || CONTACT_INFO.phone,
    title: profile?.title || CONTACT_INFO.title,
  };

  // Reset modal state when closed
  const handleClose = () => {
    setView('main');
    setFormStep(1);
    setFormData({ projectType: '', budget: '', timeline: '', name: '', email: '', message: '' });
    onClose();
  };

  // WhatsApp handler
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi ${contactInfo.name}! I found your portfolio and I'm interested in working with you.`
    );
    window.open(`https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  // Calendly handler
  const openCalendly = () => {
    window.open(contactInfo.calendly, '_blank');
  };

  // Download vCard
  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
TITLE:${contactInfo.title}
TEL;TYPE=CELL:${contactInfo.phone}
EMAIL:${contactInfo.email}
URL:${contactInfo.website}
X-SOCIALPROFILE;TYPE=linkedin:${contactInfo.linkedin}
X-SOCIALPROFILE;TYPE=github:${contactInfo.github}
NOTE:Full Stack Developer - React, Node.js, Laravel, Vue.js
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactInfo.name.replace(/\s+/g, '_')}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Email form submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // If EmailJS is configured
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            project_type: formData.projectType,
            budget: formData.budget,
            timeline: formData.timeline,
            to_name: contactInfo.name,
          },
          EMAILJS_PUBLIC_KEY
        );
      } else {
        // Fallback: Open email client
        const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType || 'New Project'}`);
        const body = encodeURIComponent(
          `Hi ${contactInfo.name},\n\n` +
          `${formData.message}\n\n` +
          `Project Type: ${formData.projectType}\n` +
          `Budget: ${formData.budget}\n` +
          `Timeline: ${formData.timeline}\n\n` +
          `Best regards,\n${formData.name}\n${formData.email}`
        );
        window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`);
      }

      setView('success');
    } catch (error) {
      console.error('Error sending email:', error);
      // Fallback to mailto
      const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
      const body = encodeURIComponent(formData.message);
      window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`);
      setView('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Project types
  const projectTypes = [
    { id: 'website', label: t('hireModal.projectTypes.website'), icon: '🌐' },
    { id: 'webapp', label: t('hireModal.projectTypes.webapp'), icon: '💻' },
    { id: 'ecommerce', label: t('hireModal.projectTypes.ecommerce'), icon: '🛒' },
    { id: 'api', label: t('hireModal.projectTypes.api'), icon: '⚙️' },
    { id: 'other', label: t('hireModal.projectTypes.other'), icon: '📦' },
  ];

  // Budget ranges
  const budgetRanges = [
    { id: 'small', label: t('hireModal.budgetRanges.small'), icon: '💰' },
    { id: 'medium', label: t('hireModal.budgetRanges.medium'), icon: '💰💰' },
    { id: 'large', label: t('hireModal.budgetRanges.large'), icon: '💰💰💰' },
    { id: 'enterprise', label: t('hireModal.budgetRanges.enterprise'), icon: '🏆' },
    { id: 'discuss', label: t('hireModal.budgetRanges.discuss'), icon: '💬' },
  ];

  // Timeline options
  const timelineOptions = [
    { id: 'urgent', label: t('hireModal.timelines.urgent'), icon: '🚀' },
    { id: 'short', label: t('hireModal.timelines.short'), icon: '📅' },
    { id: 'medium', label: t('hireModal.timelines.medium'), icon: '📆' },
    { id: 'flexible', label: t('hireModal.timelines.flexible'), icon: '🕐' },
  ];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.8, y: 50 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-[#0a0a1a] border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="relative p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Main View */}
                {view === 'main' && (
                  <motion.div
                    key="main"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {t('hireModal.title')} <span className="text-purple-500">{t('hireModal.titleHighlight')}</span>
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {t('hireModal.subtitle')}
                      </p>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setView('form')}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-500/60 hover:scale-105 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Mail size={24} />
                        </div>
                        <span className="text-white font-medium">{t('hireModal.sendMessage')}</span>
                        <span className="text-gray-500 text-xs">{t('hireModal.projectInquiry')}</span>
                      </button>

                      <button
                        onClick={openWhatsApp}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 hover:border-green-500/60 hover:scale-105 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <MessageCircle size={24} />
                        </div>
                        <span className="text-white font-medium">{t('hireModal.whatsapp')}</span>
                        <span className="text-gray-500 text-xs">{t('hireModal.quickChat')}</span>
                      </button>

                      <button
                        onClick={openCalendly}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:border-blue-500/60 hover:scale-105 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Calendar size={24} />
                        </div>
                        <span className="text-white font-medium">{t('hireModal.scheduleCall')}</span>
                        <span className="text-gray-500 text-xs">{t('hireModal.bookMeeting')}</span>
                      </button>

                      <button
                        onClick={downloadVCard}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-orange-600/20 to-amber-600/20 border border-orange-500/30 hover:border-orange-500/60 hover:scale-105 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <UserPlus size={24} />
                        </div>
                        <span className="text-white font-medium">{t('hireModal.saveContact')}</span>
                        <span className="text-gray-500 text-xs">{t('hireModal.downloadVCard')}</span>
                      </button>
                    </div>

                    {/* Direct Contact Info */}
                    <div className="pt-4 border-t border-gray-800">
                      <p className="text-gray-500 text-xs text-center mb-3">{t('hireModal.reachDirectly')}</p>
                      <div className="flex items-center justify-center gap-4">
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-gray-400 hover:text-purple-400 transition-colors"
                          title="Email"
                        >
                          <Mail size={20} />
                        </a>
                        <a
                          href={`tel:${contactInfo.phone}`}
                          className="text-gray-400 hover:text-green-400 transition-colors"
                          title="Phone"
                        >
                          <Phone size={20} />
                        </a>
                        <a
                          href={contactInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin size={20} />
                        </a>
                        <a
                          href={contactInfo.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          title="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Multi-Step Form */}
                {view === 'form' && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 mb-6">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            step <= formStep
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                              : 'bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>

                    <form onSubmit={handleEmailSubmit}>
                      {/* Step 1: Project Type */}
                      {formStep === 1 && (
                        <div className="space-y-4">
                          <div className="text-center mb-6">
                            <Briefcase className="w-10 h-10 text-purple-500 mx-auto mb-2" />
                            <h3 className="text-xl font-bold text-white">{t('hireModal.form.projectType')}</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {projectTypes.map((type) => (
                              <button
                                key={type.id}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, projectType: type.label });
                                  setFormStep(2);
                                }}
                                className={`p-4 rounded-xl border text-left transition-all hover:scale-105 ${
                                  formData.projectType === type.label
                                    ? 'border-purple-500 bg-purple-500/20'
                                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                }`}
                              >
                                <span className="text-2xl">{type.icon}</span>
                                <p className="text-white font-medium mt-2">{type.label}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 2: Budget */}
                      {formStep === 2 && (
                        <div className="space-y-4">
                          <div className="text-center mb-6">
                            <DollarSign className="w-10 h-10 text-purple-500 mx-auto mb-2" />
                            <h3 className="text-xl font-bold text-white">{t('hireModal.form.budget')}</h3>
                          </div>
                          <div className="space-y-2">
                            {budgetRanges.map((budget) => (
                              <button
                                key={budget.id}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, budget: budget.label });
                                  setFormStep(3);
                                }}
                                className={`w-full p-4 rounded-xl border text-left transition-all hover:scale-[1.02] flex items-center gap-3 ${
                                  formData.budget === budget.label
                                    ? 'border-purple-500 bg-purple-500/20'
                                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                }`}
                              >
                                <span className="text-xl">{budget.icon}</span>
                                <span className="text-white font-medium">{budget.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Timeline */}
                      {formStep === 3 && (
                        <div className="space-y-4">
                          <div className="text-center mb-6">
                            <Clock className="w-10 h-10 text-purple-500 mx-auto mb-2" />
                            <h3 className="text-xl font-bold text-white">{t('hireModal.form.timeline')}</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {timelineOptions.map((timeline) => (
                              <button
                                key={timeline.id}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, timeline: timeline.label });
                                  setFormStep(4);
                                }}
                                className={`p-4 rounded-xl border text-center transition-all hover:scale-105 ${
                                  formData.timeline === timeline.label
                                    ? 'border-purple-500 bg-purple-500/20'
                                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                                }`}
                              >
                                <span className="text-2xl">{timeline.icon}</span>
                                <p className="text-white font-medium mt-2">{timeline.label}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 4: Contact Details */}
                      {formStep === 4 && (
                        <div className="space-y-4">
                          <div className="text-center mb-6">
                            <Mail className="w-10 h-10 text-purple-500 mx-auto mb-2" />
                            <h3 className="text-xl font-bold text-white">{t('hireModal.form.yourDetails')}</h3>
                          </div>
                          <div className="space-y-3">
                            <input
                              type="text"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              required
                              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <input
                              type="email"
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <textarea
                              placeholder="Tell me about your project..."
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              required
                              rows={4}
                              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                {t('contact.form.sending')}
                              </>
                            ) : (
                              <>
                                {t('hireModal.sendMessage')} <Send size={18} />
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Navigation */}
                      <div className="flex items-center justify-between mt-6">
                        <button
                          type="button"
                          onClick={() => formStep > 1 ? setFormStep(formStep - 1) : setView('main')}
                          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <ArrowLeft size={16} />
                          {t('hireModal.form.back')}
                        </button>
                        {formStep < 4 && (
                          <button
                            type="button"
                            onClick={() => setFormStep(formStep + 1)}
                            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            {t('hireModal.form.skip')} <ArrowRight size={16} />
                          </button>
                        )}
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Success View */}
                {view === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle size={40} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">{t('hireModal.success.title')}</h3>
                    <p className="text-gray-400 mb-6">
                      {t('hireModal.success.message')}
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                    >
                      {t('hireModal.success.close')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
