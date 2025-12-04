import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#020010] py-12 border-t border-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="text-center md:text-left">
                        <span className="text-2xl font-bold text-white tracking-wide">
                            M2<span className="text-purple-500">Dev</span>
                        </span>
                        <p className="text-gray-500 mt-2 text-sm max-w-xs">
                            Building modern, high-performance web experiences through elegant design, clean code, and the latest technologies.
                        </p>
                    </div>

                    <div className="flex gap-8 text-sm">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
                            <a href="#home" className="text-gray-500 hover:text-purple-400 transition-colors">Home</a>
                            <a href="#about" className="text-gray-500 hover:text-purple-400 transition-colors">About</a>
                            <a href="#projects" className="text-gray-500 hover:text-purple-400 transition-colors">Projects</a>
                            <a href="#contact" className="text-gray-500 hover:text-purple-400 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-900 text-center text-gray-600 text-xs">
                    <p>© 2025 M2Dev. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
