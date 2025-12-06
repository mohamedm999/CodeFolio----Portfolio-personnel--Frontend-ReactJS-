import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
    onLoadingComplete: () => void;
}

// Critical images to preload during loader animation
const CRITICAL_IMAGES = ['/me.png', '/logo-Photoroom.png'];

export const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Preload critical images
    useEffect(() => {
        let loadedCount = 0;
        const totalImages = CRITICAL_IMAGES.length;

        CRITICAL_IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    setImagesLoaded(true);
                }
            };
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    // Only complete when both progress is 100% AND images are loaded
                    if (imagesLoaded) {
                        setTimeout(onLoadingComplete, 300);
                    }
                    return 100;
                }
                return prev + 2; // Speed of loading
            });
        }, 30);

        return () => clearInterval(timer);
    }, [onLoadingComplete, imagesLoaded]);

    // If progress hits 100 but images aren't loaded yet, wait for them
    useEffect(() => {
        if (progress >= 100 && imagesLoaded) {
            setTimeout(onLoadingComplete, 300);
        }
    }, [progress, imagesLoaded, onLoadingComplete]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030014]">
            {/* Background Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-center"
            >
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                    M2Dev
                </h1>
                <p className="text-gray-400 text-sm mb-8 tracking-wider">Loading Portfolio...</p>

                <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="mt-2 text-purple-400 text-xs font-mono">{progress}%</p>
            </motion.div>
        </div>
    );
};
