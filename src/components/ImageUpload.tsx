/**
 * Image Upload Component
 * Handles profile and banner image uploads with preview
 */

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Upload, X, Camera, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { handleImageUpload, createAvatarFromInitials } from '@/lib/vercel-blob-upload';

interface ImageUploadProps {
  label: string;
  type: 'profile' | 'banner';
  currentImage?: string;
  userName?: string;
  onImageChange: (imageUrl: string) => void;
  aspectRatio?: string;
}

export const ImageUploadComponent = ({
  label,
  type,
  currentImage,
  userName = 'User',
  onImageChange,
  aspectRatio = type === 'banner' ? '16/9' : '1/1'
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const uploadType = type === 'banner' ? 'cover' : 'profile';
      const imageUrl = await handleImageUpload(file, uploadType, (progress) => {
        console.log(`Upload progress: ${progress}%`);
      });

      setPreview(imageUrl);
      onImageChange(imageUrl);
      toast.success('Image uploaded successfully!', {
        description: `Your ${type} image has been updated`
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed', {
        description: error instanceof Error ? error.message : 'An error occurred while uploading'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Image removed');
  };

  const handleGenerateAvatar = () => {
    const avatarUrl = createAvatarFromInitials(userName);
    setPreview(avatarUrl);
    onImageChange(avatarUrl);
    toast.success('Avatar generated!');
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{label}</Label>
        {type === 'profile' && !preview && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleGenerateAvatar}
            className="text-xs"
          >
            <Camera className="w-3 h-3 mr-1" />
            Generate Avatar
          </Button>
        )}
      </div>

      <Card className="relative overflow-hidden border-2 border-dashed border-border/50 hover:border-primary/50 transition-all">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative group"
              style={{ aspectRatio }}
            >
              <img
                src={preview}
                alt={`${type} preview`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleClick}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClick}
              className="cursor-pointer p-6 flex flex-col items-center justify-center text-center hover:bg-secondary/50 transition-colors"
              style={{ aspectRatio: type === 'banner' ? '16/9' : '1/1', minHeight: type === 'banner' ? '150px' : '120px' }}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                {type === 'banner' ? (
                  <ImageIcon className="w-6 h-6 text-primary" />
                ) : (
                  <Upload className="w-6 h-6 text-primary" />
                )}
              </div>
              
              <p className="text-sm font-medium mb-1">
                {uploading ? 'Uploading...' : `Upload ${type} image`}
              </p>
              <p className="text-xs text-muted-foreground">
                {type === 'banner' 
                  ? '1200x675px • Max 10MB'
                  : '400x400px • Max 5MB'
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {uploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium">Uploading...</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ImageUploadComponent;
