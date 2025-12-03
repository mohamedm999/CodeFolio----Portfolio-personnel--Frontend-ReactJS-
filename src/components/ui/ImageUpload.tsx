import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image } from 'lucide-react';

interface ImageUploadProps {
    currentImageUrl?: string;
    onImageSelected: (file: File) => void;
    onImageRemoved?: () => void;
    label?: string;
    className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    currentImageUrl,
    onImageSelected,
    onImageRemoved,
    label = 'Upload Image',
    className = '',
}) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageSelected(file);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        if (onImageRemoved) {
            onImageRemoved();
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label}
                </label>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`
                    relative border-2 border-dashed rounded-xl p-4 transition-all duration-300
                    ${dragActive 
                        ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20' 
                        : 'border-white/20 hover:border-purple-500/50 bg-white/5'
                    }
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {previewUrl ? (
                    <div className="relative group">
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 rounded-lg">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={triggerFileInput}
                                className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium flex items-center gap-2 transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                Change
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={handleRemove}
                                className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white font-medium flex items-center gap-2 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Remove
                            </motion.button>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex flex-col items-center justify-center h-48 cursor-pointer"
                        onClick={triggerFileInput}
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                            <Image className="w-8 h-8 text-purple-400" />
                        </div>
                        <p className="text-sm text-gray-300 font-medium mb-1">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                            SVG, PNG, JPG or GIF (max. 5MB)
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};
