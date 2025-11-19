/**
 * Image Upload Utility
 * Handles profile and banner image uploads with preview
 */

export interface UploadOptions {
  maxSize?: number; // in MB
  allowedTypes?: string[];
  quality?: number;
}

const defaultOptions: UploadOptions = {
  maxSize: 5, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'],
  quality: 0.9,
};

/**
 * Convert image file to base64 data URL
 */
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Compress and resize image
 */
export const compressImage = async (
  file: File,
  maxWidth: number = 800,
  quality: number = 0.9
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to data URL
        const dataUrl = canvas.toDataURL(file.type, quality);
        resolve(dataUrl);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Validate image file
 */
export const validateImage = (file: File, options: UploadOptions = defaultOptions): { valid: boolean; error?: string } => {
  // Check file type
  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${options.allowedTypes.join(', ')}`
    };
  }
  
  // Check file size
  const maxSizeBytes = (options.maxSize || 5) * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `File size exceeds ${options.maxSize}MB limit`
    };
  }
  
  return { valid: true };
};

/**
 * Handle image upload with validation and compression
 */
export const handleImageUpload = async (
  file: File,
  options: UploadOptions = defaultOptions
): Promise<{ success: boolean; dataUrl?: string; error?: string }> => {
  try {
    // Validate
    const validation = validateImage(file, options);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }
    
    // Compress and convert
    const maxWidth = file.name.includes('banner') || file.name.includes('cover') ? 1200 : 800;
    const dataUrl = await compressImage(file, maxWidth, options.quality || 0.9);
    
    return { success: true, dataUrl };
  } catch (error) {
    console.error('Image upload error:', error);
    return { success: false, error: 'Failed to process image' };
  }
};

/**
 * Upload image to server/storage (placeholder for actual implementation)
 * In production, this would upload to Cloudinary, AWS S3, or your backend
 */
export const uploadImageToStorage = async (dataUrl: string, filename: string): Promise<string> => {
  // For now, return the data URL
  // In production, implement actual upload to storage service
  
  // TODO: Implement actual upload to Cloudinary or S3
  // Example:
  // const formData = new FormData();
  // formData.append('file', dataUrlToBlob(dataUrl));
  // const response = await fetch('/api/upload', { method: 'POST', body: formData });
  // const { url } = await response.json();
  // return url;
  
  return dataUrl;
};

/**
 * Convert data URL to Blob
 */
export const dataURLtoBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new Blob([u8arr], { type: mime });
};

/**
 * Create avatar from initials
 */
export const createAvatarFromInitials = (name: string, size: number = 200): string => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#D4AF37');
  gradient.addColorStop(1, '#B8941E');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Get initials
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Draw text
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${size / 2.5}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, size / 2, size / 2);
  
  return canvas.toDataURL('image/png');
};
