/**
 * Public Card View Page
 * Displays user's digital card publicly at /{username}
 * Similar to wcard.io public profile pages
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Download,
  Share2,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { downloadVCard, shareVCard, VCardData } from '@/lib/vcard-generator';

interface CardData {
  username: string;
  fullName: string;
  role: string;
  company: string;
  bio: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  themeId?: string;
  primaryColor?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
  };
}

const PublicCard = () => {
  const { username } = useParams<{ username: string }>();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        setLoading(true);
        
        if (!username) {
          setError('Username not provided');
          setLoading(false);
          return;
        }
        
        // Import API client functions
        const { getCardByUsername, getSocialLinks, trackCardView } = await import('@/lib/api-client');
        
        // Fetch card from Neon database
        const card = await getCardByUsername(username);
        
        if (!card) {
          setError('Card not found');
          setLoading(false);
          return;
        }

        // Fetch social links
        const socialLinks = await getSocialLinks(card.id);
        
        // Map social links to format expected by component
        const socialLinksMap: CardData['socialLinks'] = {};
        socialLinks.forEach(link => {
          const platform = link.platform.toLowerCase();
          if (['instagram', 'linkedin', 'twitter', 'facebook', 'youtube'].includes(platform)) {
            socialLinksMap[platform as keyof CardData['socialLinks']] = link.url;
          }
        });

        const cardDataMapped: CardData = {
          username: card.username,
          fullName: card.full_name,
          role: card.role || '',
          company: card.company || '',
          bio: card.bio || '',
          email: card.email || '',
          phone: card.phone || '',
          website: card.website || '',
          location: card.location || '',
          profileImageUrl: card.profile_image || undefined,
          coverImageUrl: card.cover_image || undefined,
          themeId: card.theme_id || undefined,
          primaryColor: '#D4AF37', // Default gold color
          socialLinks: socialLinksMap,
        };
        
        setCardData(cardDataMapped);
        
        // Track card view
        await trackCardView(card.id);
        
      } catch (err) {
        console.error('Error fetching card:', err);
        setError('Failed to load card');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchCardData();
    }
  }, [username]);

  const handleSaveContact = () => {
    if (!cardData) return;

    const vCardData: VCardData = {
      fullName: cardData.fullName,
      organization: cardData.company,
      title: cardData.role,
      email: cardData.email,
      phone: cardData.phone,
      website: cardData.website,
      address: cardData.location,
      photo: cardData.profileImageUrl,
      socialLinks: cardData.socialLinks,
    };

    downloadVCard(vCardData, cardData.username);
    toast.success('Contact saved!', {
      description: 'Contact card downloaded successfully'
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData?.fullName} - Digital Card`,
          text: `Check out ${cardData?.fullName}'s digital business card`,
          url: url
        });
      } catch (error) {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied!', {
        description: 'Card link copied to clipboard'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading card...</p>
        </div>
      </div>
    );
  }

  if (error || !cardData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
          <h1 className="text-2xl font-bold">Card Not Found</h1>
          <p className="text-muted-foreground">
            The card you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => window.location.href = '/'}>
            Go to Homepage
          </Button>
        </div>
      </div>
    );
  }

  const primaryColor = cardData.primaryColor || '#D4AF37';

  const socialIcons = [
    { icon: Instagram, link: cardData.socialLinks?.instagram, label: 'Instagram', color: '#E4405F' },
    { icon: Linkedin, link: cardData.socialLinks?.linkedin, label: 'LinkedIn', color: '#0A66C2' },
    { icon: Twitter, link: cardData.socialLinks?.twitter, label: 'Twitter', color: '#1DA1F2' },
    { icon: Facebook, link: cardData.socialLinks?.facebook, label: 'Facebook', color: '#1877F2' },
    { icon: Youtube, link: cardData.socialLinks?.youtube, label: 'YouTube', color: '#FF0000' },
  ].filter(social => social.link);

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      {cardData.coverImageUrl && (
        <div className="relative h-64 w-full">
          <img
            src={cardData.coverImageUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
      )}

      {/* Card Content */}
      <div className={`max-w-2xl mx-auto px-6 ${cardData.coverImageUrl ? '-mt-24 relative' : 'pt-16'} pb-16`}>
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 mb-8"
        >
          {/* Profile Image */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold shadow-2xl border-4 border-background overflow-hidden"
                style={{ 
                  background: cardData.profileImageUrl ? 'transparent' : `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                  color: cardData.profileImageUrl ? 'inherit' : '#000'
                }}
              >
                {cardData.profileImageUrl ? (
                  <img
                    src={cardData.profileImageUrl}
                    alt={cardData.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  cardData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()
                )}
              </div>
            </motion.div>
          </div>

          {/* Name & Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{cardData.fullName}</h1>
            <p className="text-xl font-semibold" style={{ color: primaryColor }}>
              {cardData.role}
            </p>
            {cardData.company && (
              <p className="text-muted-foreground">{cardData.company}</p>
            )}
          </div>

          {/* Bio */}
          {cardData.bio && (
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {cardData.bio}
            </p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <Button
            size="lg"
            className="h-14 text-base font-semibold"
            style={{
              backgroundColor: primaryColor,
              color: '#000'
            }}
            onClick={handleSaveContact}
          >
            <Download className="w-5 h-5 mr-2" />
            Save Contact
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 text-base font-semibold"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3 mb-8"
        >
          {cardData.email && (
            <a
              href={`mailto:${cardData.email}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <Mail className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                <p className="font-medium truncate">{cardData.email}</p>
              </div>
            </a>
          )}

          {cardData.phone && (
            <a
              href={`tel:${cardData.phone}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <Phone className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                <p className="font-medium">{cardData.phone}</p>
              </div>
            </a>
          )}

          {cardData.website && (
            <a
              href={`https://${cardData.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <Globe className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">Website</p>
                <p className="font-medium truncate">{cardData.website}</p>
              </div>
            </a>
          )}

          {cardData.location && (
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <MapPin className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">Location</p>
                <p className="font-medium">{cardData.location}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Social Links */}
        {socialIcons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">
              Connect with me
            </h3>
            <div className="flex justify-center gap-4">
              {socialIcons.map(({ icon: Icon, link, label, color }) => (
                <motion.a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    border: `2px solid ${primaryColor}30`
                  }}
                  title={label}
                >
                  <Icon className="w-6 h-6" style={{ color: primaryColor }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Powered by */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Powered by <span className="font-bold text-gradient-gold">AJ STUDIOZ</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicCard;
