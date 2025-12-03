/**
 * Upload an image file to Vercel Blob Storage
 * Note: For client-side uploads, we need to use a different approach
 * Since Vercel Blob requires server-side token, we'll use a public image hosting alternative
 * 
 * For now, we'll convert the image to base64 and store in Firestore directly
 * This works for small images (< 1MB) which is fine for portfolio thumbnails
 */

/**
 * Convert file to base64 data URL
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Compress image before converting to base64
 */
const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.7): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            reject(new Error('Failed to compress image'));
          }
        },
        'image/jpeg',
        quality
      );
      
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
  });
};

/**
 * Upload an image file - compresses and converts to base64
 * @param file - The file to upload
 * @param folder - The folder path (unused, kept for API compatibility)
 * @returns Promise with the base64 data URL
 */
export const uploadImageToBlob = async (file: File, _folder: string): Promise<string> => {
  try {
    // Compress the image first
    const compressedFile = await compressImage(file, 800, 0.7);
    
    // Convert to base64
    const base64Url = await fileToBase64(compressedFile);
    
    return base64Url;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Delete an image - no-op for base64 images stored in Firestore
 * @param imageUrl - The image URL (base64 or external)
 */
export const deleteImageFromBlob = async (_imageUrl: string): Promise<void> => {
  // Base64 images are stored directly in Firestore, 
  // they get deleted when the document is deleted
  return;
};
