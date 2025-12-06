import React from 'react';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <footer className="bg-[#020010] py-12 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="text-center md:text-left">
                        <span className="text-2xl font-bold text-white tracking-wide">
                            M2<span className="text-purple-500">Dev</span>
                        </span>
                        <p className="text-gray-500 mt-2 text-sm max-w-xs">
                            {t('footer.tagline')}
                        </p>
                    </div>

                    <div className="flex gap-8 text-sm">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white font-semibold mb-2">{t('footer.quickLinks')}</h4>
                            <a href="#home" className="text-gray-500 hover:text-purple-400 transition-colors">{t('nav.home')}</a>
                            <a href="#about" className="text-gray-500 hover:text-purple-400 transition-colors">{t('nav.about')}</a>
                            <a href="#projects" className="text-gray-500 hover:text-purple-400 transition-colors">{t('nav.projects')}</a>
                            <a href="#contact" className="text-gray-500 hover:text-purple-400 transition-colors">{t('nav.contact')}</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-900 text-center text-gray-600 text-xs">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};
