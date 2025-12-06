import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
    profileName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ profileName }) => {
    const { t, i18n } = useTranslation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const currentLang = i18n.language;

    const toggleLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setIsLangMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('nav.home'), href: '#home' },
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.skills'), href: '#skills' },
        { name: t('nav.experience'), href: '#experience' },
        { name: t('nav.projects'), href: '#projects' },
        { name: t('nav.contact'), href: '#contact' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#030014]/80 backdrop-blur-md shadow-lg shadow-purple-500/10' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 cursor-pointer">
                        <a href="#home" className="flex items-center">
                            <img 
                                src="/logo-Photoroom.png" 
                                alt={profileName || "Logo"} 
                                className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain max-w-[180px] sm:max-w-[220px] md:max-w-[260px]"
                            />
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social Icons & Language Switcher (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Github size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors"><Twitter size={20} /></a>
                        
                        {/* Language Switcher */}
                        <div className="relative ml-2">
                            <button
                                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                            >
                                <Globe size={16} className="text-purple-400" />
                                <span className="text-sm font-medium text-gray-300 uppercase">
                                    {currentLang.substring(0, 2)}
                                </span>
                            </button>
                            
                            <AnimatePresence>
                                {isLangMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-32 rounded-xl bg-[#0a0a1a] border border-white/10 shadow-xl shadow-purple-500/10 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => toggleLanguage('en')}
                                            className={`w-full px-4 py-2.5 text-left text-sm flex items-center space-x-2 transition-colors ${
                                                currentLang.startsWith('en') 
                                                    ? 'bg-purple-500/20 text-purple-400' 
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            <span className="text-lg">🇬🇧</span>
                                            <span>English</span>
                                        </button>
                                        <button
                                            onClick={() => toggleLanguage('fr')}
                                            className={`w-full px-4 py-2.5 text-left text-sm flex items-center space-x-2 transition-colors ${
                                                currentLang.startsWith('fr') 
                                                    ? 'bg-purple-500/20 text-purple-400' 
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            <span className="text-lg">🇫🇷</span>
                                            <span>Français</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#030014]/95 backdrop-blur-xl border-b border-gray-800"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                            
                            {/* Mobile Language Switcher */}
                            <div className="border-t border-gray-800 mt-4 pt-4 px-3">
                                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                                    <Globe size={14} />
                                    <span>Language</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => { toggleLanguage('en'); setIsMobileMenuOpen(false); }}
                                        className={`flex-1 py-2 px-3 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors ${
                                            currentLang.startsWith('en')
                                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                                : 'bg-white/5 text-gray-400 border border-white/10'
                                        }`}
                                    >
                                        <span>🇬🇧</span>
                                        <span>EN</span>
                                    </button>
                                    <button
                                        onClick={() => { toggleLanguage('fr'); setIsMobileMenuOpen(false); }}
                                        className={`flex-1 py-2 px-3 rounded-lg text-sm flex items-center justify-center space-x-2 transition-colors ${
                                            currentLang.startsWith('fr')
                                                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                                : 'bg-white/5 text-gray-400 border border-white/10'
                                        }`}
                                    >
                                        <span>🇫🇷</span>
                                        <span>FR</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
