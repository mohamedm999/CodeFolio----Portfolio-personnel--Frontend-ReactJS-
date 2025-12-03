import { uploadImageToBlob, deleteImageFromBlob } from '../vercel/blob.service';

/**
 * Upload an image file to Vercel Blob Storage
 * This replaces Firebase Storage to avoid billing requirements
 * @param file - The file to upload
 * @param folder - The folder path (e.g., 'projects', 'profile')
 * @returns Promise with the download URL
 */
export const uploadImage = async (file: File, folder: string): Promise<string> => {
  return uploadImageToBlob(file, folder);
};

/**
 * Delete an image from Vercel Blob Storage
 * @param imageUrl - The full URL of the image
 */
export const deleteImage = async (imageUrl: string): Promise<void> => {
  return deleteImageFromBlob(imageUrl);
};

/**
 * Get the download URL - for Vercel Blob, URLs are already public
 * @param url - The storage URL
 * @returns The same URL (Vercel Blob URLs are public)
 */
export const getImageUrl = async (url: string): Promise<string> => {
  return url;
};
