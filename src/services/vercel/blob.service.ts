import { put, del } from '@vercel/blob';

/**
 * Upload an image file to Vercel Blob Storage
 * @param file - The file to upload
 * @param folder - The folder path (e.g., 'projects', 'profile')
 * @returns Promise with the download URL
 */
export const uploadImageToBlob = async (file: File, folder: string): Promise<string> => {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const filename = `${folder}/${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
    });
    
    return blob.url;
  } catch (error) {
    console.error('Error uploading image to Vercel Blob:', error);
    throw new Error('Failed to upload image');
  }
};

/**
 * Delete an image from Vercel Blob Storage
 * @param imageUrl - The full URL of the image
 */
export const deleteImageFromBlob = async (imageUrl: string): Promise<void> => {
  try {
    if (!imageUrl || !imageUrl.includes('blob.vercel-storage.com')) {
      return; // Not a Vercel Blob URL, skip
    }
    
    await del(imageUrl, {
      token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
    });
  } catch (error) {
    console.error('Error deleting image from Vercel Blob:', error);
    // Don't throw - deletion errors shouldn't block other operations
  }
};
