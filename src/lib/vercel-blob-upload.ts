/**
 * Image Upload with Vercel Blob Storage
 * Replaces base64 with real cloud storage
 */

import { put } from '@vercel/blob';

export interface UploadResult {
  url: string;
  pathname: string;
  contentType: string;
}

/**
 * Upload image to Vercel Blob Storage
 */
export async function uploadToVercelBlob(
  file: File,
  folder: 'profiles' | 'covers' | 'id-cards'
): Promise<UploadResult> {
  try {
    const blob = await put(`${folder}/${Date.now()}-${file.name}`, file, {
      access: 'public',
      token: import.meta.env.VITE_BLOB_READ_WRITE_TOKEN,
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
    };
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Validate image file
 */
export function validateImageFile(
  file: File,
  maxSizeMB: number = 5
): { valid: boolean; error?: string } {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: 'File must be an image' };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `Image must be less than ${maxSizeMB}MB` };
  }

  return { valid: true };
}

/**
 * Compress image before upload
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1200
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      
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
        
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        
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
          0.9
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
}

/**
 * Handle complete image upload process
 */
export async function handleImageUpload(
  file: File,
  type: 'profile' | 'cover' | 'id-card',
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    // Validate
    const validation = validateImageFile(file, type === 'profile' ? 5 : 10);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    
    if (onProgress) onProgress(20);
    
    // Compress
    const maxWidth = type === 'profile' ? 800 : type === 'cover' ? 1200 : 1000;
    const compressedFile = await compressImage(file, maxWidth);
    
    if (onProgress) onProgress(50);
    
    // Upload to Vercel Blob
    const folder = type === 'profile' ? 'profiles' : type === 'cover' ? 'covers' : 'id-cards';
    const result = await uploadToVercelBlob(compressedFile, folder);
    
    if (onProgress) onProgress(100);
    
    return result.url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

/**
 * Create avatar from initials (fallback)
 */
export function createAvatarFromInitials(name: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d')!;

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 200, 200);
  gradient.addColorStop(0, '#D4AF37');
  gradient.addColorStop(1, '#B8960F');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 200, 200);

  // Initials
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  ctx.fillText(initials, 100, 100);

  return canvas.toDataURL('image/png');
}

export default {
  uploadToVercelBlob,
  validateImageFile,
  compressImage,
  handleImageUpload,
  createAvatarFromInitials,
};
