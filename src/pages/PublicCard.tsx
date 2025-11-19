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
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { downloadVCard, shareVCard, VCardData } from '@/lib/vcard-generator';

interface CardData {
  username: string;
  fullName: string;
  role: string;
  company: string;
  industry?: string;
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
          industry: card.industry || undefined,
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

  const handleSaveContact = async () => {
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

    // Track click
    try {
      const { getCardByUsername } = await import('@/lib/api-client');
      const card = await getCardByUsername(cardData.username);
      if (card) {
        await fetch('/api/analytics/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cardId: card.id,
            clickType: 'save_contact',
            clickTarget: 'vcard_download'
          })
        });
      }
    } catch (error) {
      console.error('Error tracking click:', error);
    }

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
    { icon: '/logos/instagram.svg', link: cardData.socialLinks?.instagram, label: 'Instagram', color: '#E4405F', isImage: true },
    { icon: '/logos/linkedin.svg', link: cardData.socialLinks?.linkedin, label: 'LinkedIn', color: '#0A66C2', isImage: true },
    { icon: '/logos/twitter.svg', link: cardData.socialLinks?.twitter, label: 'Twitter', color: '#1DA1F2', isImage: true },
    { icon: '/logos/facebook.svg', link: cardData.socialLinks?.facebook, label: 'Facebook', color: '#1877F2', isImage: true },
    { icon: Youtube, link: cardData.socialLinks?.youtube, label: 'YouTube', color: '#FF0000', isImage: false },
  ].filter(social => social.link);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Card Container */}
      <div className="max-w-2xl mx-auto min-h-screen flex flex-col">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-b-3xl shadow-2xl p-8 text-center"
        >
          {/* Logo/Profile Image */}
          <div className="flex justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold shadow-2xl overflow-hidden bg-gradient-to-br"
                style={{ 
                  background: cardData.profileImageUrl ? 'transparent' : `linear-gradient(135deg, ${primaryColor}, #ff6b9d)`,
                  border: '4px solid rgba(255,255,255,0.1)'
                }}
              >
                {cardData.profileImageUrl ? (
                  <img
                    src={cardData.profileImageUrl}
                    alt={cardData.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img src="/AJ.svg" alt="Logo" className="w-20 h-20" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Name & Title */}
          <h1 className="text-3xl font-bold text-white mb-2">{cardData.fullName.toUpperCase()}</h1>
          <p className="text-lg text-gray-300 mb-4">{cardData.role} - {cardData.company}</p>
          
          {/* WhatsApp Button */}
          {cardData.phone && (
            <a
              href={`https://wa.me/${cardData.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-all shadow-lg mb-4"
            >
              <MessageCircle className="w-5 h-5" />
              Ask me about
            </a>
          )}
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="home" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 backdrop-blur-sm sticky top-0 z-10">
            <TabsTrigger value="home" className="text-white data-[state=active]:bg-slate-700">Home</TabsTrigger>
            <TabsTrigger value="contact" className="text-white data-[state=active]:bg-slate-700">Contact Us</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="flex-1 p-6 space-y-6">

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              {cardData.bio && (
                <p className="text-gray-300 leading-relaxed">
                  {cardData.bio}
                </p>
              )}
            </motion.div>

            {/* Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Links</h3>
              {cardData.email && (
                <a
                  href={`mailto:${cardData.email}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-white font-medium truncate">{cardData.email}</p>
                      <p className="text-xs text-gray-400">Email</p>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors">→</span>
                </a>
              )}

              {socialIcons.map(({ icon, link, label, isImage }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                      {isImage ? (
                        <img src={icon as string} alt={label} className="w-7 h-7" />
                      ) : (
                        React.createElement(icon as any, { className: "w-6 h-6 text-white" })
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">@{label.replace(' ', '')}</p>
                      <p className="text-xs text-gray-400">{label}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors">→</span>
                </a>
              ))}
            </motion.div>
          </TabsContent>

          {/* Contact Us Tab */}
          <TabsContent value="contact" className="flex-1 p-6 space-y-4">
            <div className="space-y-4">
              {cardData.email && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <a href={`mailto:${cardData.email}`} className="text-white font-medium hover:text-amber-500 transition-colors">
                    {cardData.email}
                  </a>
                </div>
              )}
              {cardData.phone && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Phone</p>
                  <a href={`tel:${cardData.phone}`} className="text-white font-medium hover:text-amber-500 transition-colors">
                    {cardData.phone}
                  </a>
                </div>
              )}
              {cardData.website && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Website</p>
                  <a href={`https://${cardData.website}`} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-amber-500 transition-colors">
                    {cardData.website}
                  </a>
                </div>
              )}
              {cardData.location && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p className="text-white font-medium">{cardData.location}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-slate-800/95 backdrop-blur-sm p-4 flex gap-3 border-t border-slate-700">
          <Button
            onClick={handleShare}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-6"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Send
          </Button>
          <Button
            onClick={handleSaveContact}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6"
          >
            <Download className="w-5 h-5 mr-2" />
            Save Contact
          </Button>
        </div>

        {/* Footer */}
        <div className="bg-slate-900 py-6 text-center">
          <p className="text-gray-400 text-sm mb-2">© 2025 {cardData.company || 'AJ STUDIOZ'}. All Rights Reserved.</p>
          <div className="flex items-center justify-center gap-2">
            <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-6 h-6" />
            <a href="/" className="text-amber-500 font-bold hover:text-amber-400 transition-colors">
              AJ STUDIOZ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCard;
