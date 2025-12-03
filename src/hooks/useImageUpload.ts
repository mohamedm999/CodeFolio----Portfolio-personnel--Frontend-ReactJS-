import { useState } from 'react';
import { uploadImage, deleteImage } from '../services/firebase/storage.service';

interface UseImageUploadResult {
  upload: (file: File, folder: string) => Promise<string>;
  remove: (url: string) => Promise<void>;
  uploading: boolean;
  error: string | null;
  progress: number;
}

export const useImageUpload = (): UseImageUploadResult => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File, folder: string): Promise<string> => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);
      
      // Basic validation
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Image size must be less than 5MB');
      }

      // Simulate progress since Firebase SDK uploadBytes doesn't provide it easily
      // (uploadBytesResumable does, but for simplicity we use uploadBytes)
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const url = await uploadImage(file, folder);
      
      clearInterval(interval);
      setProgress(100);
      
      return url;
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Failed to upload image');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const remove = async (url: string): Promise<void> => {
    try {
      setUploading(true);
      await deleteImage(url);
    } catch (err: any) {
      console.error('Delete failed:', err);
      setError(err.message || 'Failed to delete image');
    } finally {
      setUploading(false);
    }
  };

  return { upload, remove, uploading, error, progress };
};
