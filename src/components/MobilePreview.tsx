/**
 * Mobile Live Preview Component
 * Shows real-time preview of card in mobile frame (wcard.io style)
 */

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Youtube,
  Download,
  Share2,
  ExternalLink
} from 'lucide-react';

interface CardData {
  name: string;
  role: string;
  company: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  profileImage?: string;
  coverImage?: string;
  theme?: {
    name: string;
    colors: string[];
  };
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
}

interface MobilePreviewProps {
  cardData: CardData;
  username?: string;
}

export const MobilePreview = ({ cardData, username = 'preview' }: MobilePreviewProps) => {
  const primaryColor = cardData.theme?.colors?.[0] || '#D4AF37';
  const bgColor = cardData.theme?.colors?.[1] || '#000000';

  const socialIcons = [
    { icon: Instagram, link: cardData.socialLinks?.instagram, label: 'Instagram' },
    { icon: Linkedin, link: cardData.socialLinks?.linkedin, label: 'LinkedIn' },
    { icon: Twitter, link: cardData.socialLinks?.twitter, label: 'Twitter' },
    { icon: Facebook, link: cardData.socialLinks?.facebook, label: 'Facebook' },
    { icon: Youtube, link: cardData.socialLinks?.youtube, label: 'YouTube' },
  ].filter(social => social.link);

  return (
    <div className="relative">
      {/* Label */}
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground font-medium">Card Live Preview</p>
      </div>

      {/* Mobile Frame */}
      <div className="relative mx-auto" style={{ width: '375px', height: '667px' }}>
        {/* Phone Frame */}
        <div className="absolute inset-0 rounded-[3rem] border-[14px] border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-10"></div>
          
          {/* Screen Content */}
          <div className="w-full h-full bg-background overflow-y-auto rounded-[2.2rem] custom-scrollbar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="min-h-full"
            >
              {/* Cover/Banner Image */}
              {cardData.coverImage && (
                <div className="relative h-48 w-full">
                  <img
                    src={cardData.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
                </div>
              )}

              {/* Card Content */}
              <div className={`p-6 ${cardData.coverImage ? '-mt-16 relative' : 'pt-12'}`}>
                {/* Profile Image */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <div 
                      className="w-28 h-28 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-background overflow-hidden"
                      style={{ 
                        background: cardData.profileImage ? 'transparent' : `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                        color: cardData.profileImage ? 'inherit' : '#000'
                      }}
                    >
                      {cardData.profileImage ? (
                        <img
                          src={cardData.profileImage}
                          alt={cardData.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        cardData.name.split(' ').map(n => n[0]).join('').toUpperCase()
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Name & Title */}
                <div className="text-center space-y-2 mb-4">
                  <h2 className="text-2xl font-bold">{cardData.name}</h2>
                  <p className="font-semibold text-lg" style={{ color: primaryColor }}>
                    {cardData.role}
                  </p>
                  {cardData.company && (
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      {cardData.company}
                    </p>
                  )}
                </div>

                {/* Bio */}
                {cardData.bio && (
                  <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                    {cardData.bio}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 mb-6">
                  <Button
                    className="w-full justify-start h-12 font-medium"
                    style={{
                      backgroundColor: primaryColor,
                      color: '#000'
                    }}
                  >
                    <Download className="w-4 h-4 mr-3" />
                    Save Contact
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12"
                  >
                    <Share2 className="w-4 h-4 mr-3" />
                    Share Card
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  {cardData.email && (
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <Mail className="w-5 h-5" style={{ color: primaryColor }} />
                      </div>
                      <span className="text-sm font-medium truncate flex-1">{cardData.email}</span>
                    </motion.div>
                  )}

                  {cardData.phone && (
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <Phone className="w-5 h-5" style={{ color: primaryColor }} />
                      </div>
                      <span className="text-sm font-medium">{cardData.phone}</span>
                    </motion.div>
                  )}

                  {cardData.website && (
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <Globe className="w-5 h-5" style={{ color: primaryColor }} />
                      </div>
                      <span className="text-sm font-medium truncate flex-1">{cardData.website}</span>
                    </motion.div>
                  )}

                  {cardData.location && (
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <MapPin className="w-5 h-5" style={{ color: primaryColor }} />
                      </div>
                      <span className="text-sm font-medium">{cardData.location}</span>
                    </motion.div>
                  )}
                </div>

                {/* Social Links */}
                {socialIcons.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Social Media
                    </h3>
                    <div className="grid grid-cols-5 gap-3">
                      {socialIcons.map(({ icon: Icon, link, label }) => (
                        <motion.button
                          key={label}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: `${primaryColor}15`,
                            border: `1px solid ${primaryColor}30`
                          }}
                        >
                          <Icon className="w-5 h-5" style={{ color: primaryColor }} />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Phone shine effect */}
        <div className="absolute inset-0 rounded-[3rem] pointer-events-none">
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      </div>

      {/* Card URL Display */}
      <div className="mt-4 text-center">
        <a
          href={`https://aj-studioz-digital-cards.vercel.app/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Globe className="w-4 h-4" />
          <span className="font-mono">aj-studioz-digital-cards.vercel.app/{username}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${primaryColor}40;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default MobilePreview;
