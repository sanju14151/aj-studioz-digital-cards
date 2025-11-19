import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Briefcase, 
  Link2, 
  Palette, 
  Eye, 
  Save, 
  Sparkles,
  Mail,
  Phone,
  Upload,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  MapPin,
  Building,
  QrCode,
  Download,
  Share2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import QRCodeCustomizer from "@/components/QRCodeCustomizer";
import ImageUpload from "@/components/ImageUpload";
import MobilePreview from "@/components/MobilePreview";
import { downloadVCard, shareVCard, shareCardLink, VCardData } from "@/lib/vcard-generator";
import IndustrySelectorModal from "@/components/IndustrySelectorModal";
import LocationAutocomplete from "@/components/LocationAutocomplete";

const Builder = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showIndustryModal, setShowIndustryModal] = useState(false);
  const [isLoadingCard, setIsLoadingCard] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [cardData, setCardData] = useState({
    name: "John Doe",
    role: "Creative Director",
    bio: "Passionate about design and innovation. Creating beautiful experiences that connect people.",
    company: "AJ STUDIOZ",
    industry: "Technology",
    email: "john@ajstudioz.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
    website: "ajstudioz.com",
    coverImage: "",
    profileImage: "",
    socialLinks: {
      instagram: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      youtube: "",
    },
    youtubeChannel: "",
    qrCode: "",
    theme: {
      name: "Gold",
      colors: ["#D4AF37", "#000000"]
    },
  });

  // Load existing card data if editing
  useEffect(() => {
    const loadCardData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const cardId = urlParams.get('cardId');
      
      if (!cardId) return;

      try {
        setIsLoadingCard(true);
        setEditingCardId(cardId);
        
        const response = await fetch(`/api/cards/by-id/${cardId}`);
        if (!response.ok) throw new Error('Failed to load card');
        
        const data = await response.json();
        const card = data.card;
        const socialLinks = data.socialLinks || [];

        // Map API data to component state
        const socialLinksMap: any = {};
        socialLinks.forEach((link: any) => {
          const platform = link.platform.toLowerCase();
          if (['instagram', 'linkedin', 'twitter', 'facebook', 'youtube'].includes(platform)) {
            socialLinksMap[platform] = link.url;
          }
        });

        setCardData({
          name: card.full_name || '',
          role: card.role || '',
          bio: card.bio || '',
          company: card.company || '',
          industry: card.industry || '',
          email: card.email || '',
          phone: card.phone || '',
          location: card.location || '',
          website: card.website || '',
          coverImage: card.cover_image || '',
          profileImage: card.profile_image || '',
          socialLinks: {
            instagram: socialLinksMap.instagram || '',
            linkedin: socialLinksMap.linkedin || '',
            twitter: socialLinksMap.twitter || '',
            facebook: socialLinksMap.facebook || '',
            youtube: socialLinksMap.youtube || '',
          },
          youtubeChannel: '',
          qrCode: '',
          theme: cardData.theme, // Keep default theme
        });

        toast.success('Card loaded', {
          description: 'Editing existing card'
        });
      } catch (error) {
        console.error('Error loading card:', error);
        toast.error('Failed to load card', {
          description: 'Starting with new card instead'
        });
      } finally {
        setIsLoadingCard(false);
      }
    };

    loadCardData();
  }, []);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please login to save your card");
      navigate('/auth');
      return;
    }

    if (!cardData.name || cardData.name.trim().length < 2) {
      toast.error("Please enter your name", {
        description: "Name is required to save your card"
      });
      return;
    }

    try {
      const { createCard, updateCard, generateUsername } = await import('@/lib/api-client');
      
      // Generate username from name if not exists
      const username = await generateUsername(cardData.name);
      
      // Prepare social links
      const socialLinksArray = Object.entries(cardData.socialLinks)
        .filter(([_, url]) => url)
        .map(([platform, url], index) => ({
          platform,
          url: url as string,
          order: index
        }));

      // Create or update card
      const cardDataForAPI = {
        username,
        fullName: cardData.name,
        role: cardData.role || '',
        company: cardData.company || '',
        bio: cardData.bio || '',
        profileImage: cardData.profileImage || '',
        coverImage: cardData.coverImage || '',
        email: cardData.email || '',
        phone: cardData.phone || '',
        website: cardData.website || '',
        location: cardData.location || '',
        industry: cardData.industry || '',
      };

      if (editingCardId) {
        // Update existing card
        await updateCard(editingCardId, cardDataForAPI, socialLinksArray);
      } else {
        // Create new card
        await createCard(user.id, cardDataForAPI, socialLinksArray);
      }
      
      toast.success("Card saved successfully!", {
        description: "Your card has been published"
      });
      
      // Redirect to dashboard
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      console.error('Error saving card:', error);
      toast.error("Failed to save card", {
        description: "Please try again"
      });
    }
  };

  const handlePreview = () => {
    // Store card data in localStorage for preview
    localStorage.setItem('previewCardData', JSON.stringify(cardData));
    // Open preview in new tab
    window.open('/preview', '_blank');
  };

  const handleSaveContact = () => {
    const vCardData: VCardData = {
      fullName: cardData.name,
      organization: cardData.company,
      title: cardData.role,
      email: cardData.email,
      phone: cardData.phone,
      website: cardData.website,
      address: cardData.location,
    };
    downloadVCard(vCardData);
    toast.success("Contact saved!", {
      description: "Contact card downloaded successfully"
    });
  };

  const handleShare = async () => {
    try {
      await shareCardLink("johndoe");
      toast.success("Link copied!", {
        description: "Card link copied to clipboard"
      });
    } catch (error) {
      toast.error("Failed to share", {
        description: "Could not share card link"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-background/80"
      >
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-8 h-8" />
              <motion.div
                className="absolute inset-0 blur-xl bg-primary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-gradient-gold">AJ</span>
              <span className="text-foreground"> STUDIOZ</span>
            </span>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handlePreview}
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSaveContact}
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Save Contact
            </Button>
            <Button 
              variant="outline" 
              onClick={handleShare}
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="gold"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Card
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-10">
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-3 tracking-tight">
            Card <span className="text-gradient-gold">Builder</span>
          </h1>
          <p className="text-muted-foreground text-lg">Create your perfect digital business card</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_500px] gap-10">
          {/* Editor Panel with Premium Styling */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-secondary/50 backdrop-blur-sm p-1.5 rounded-xl border border-border/50">
                <TabsTrigger 
                  value="profile"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger 
                  value="contact"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Contact
                </TabsTrigger>
                <TabsTrigger 
                  value="links"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Socials
                </TabsTrigger>
                <TabsTrigger 
                  value="qrcode"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </TabsTrigger>
                <TabsTrigger 
                  value="theme"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Theme
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6 mt-8">
                <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 rounded-2xl backdrop-blur-sm">
                  <div className="space-y-6">
                    {/* Cover Image Upload */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Cover Image</Label>
                      <ImageUpload
                        type="banner"
                        currentImage={cardData.coverImage}
                        userName={cardData.name}
                        onImageChange={(imageUrl) => setCardData({ ...cardData, coverImage: imageUrl })}
                      />
                    </div>

                    {/* Profile Image Upload */}
                    <div>
                      <Label className="text-base font-semibold mb-3 block">Profile Image</Label>
                      <ImageUpload
                        type="profile"
                        currentImage={cardData.profileImage}
                        userName={cardData.name}
                        onImageChange={(imageUrl) => setCardData({ ...cardData, profileImage: imageUrl })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="name" className="text-base font-semibold mb-3 block">Full Name</Label>
                      <Input
                        id="name"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="h-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-base font-semibold mb-3 block">Role / Title</Label>
                      <Input
                        id="role"
                        value={cardData.role}
                        onChange={(e) => setCardData({ ...cardData, role: e.target.value })}
                        className="h-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                        placeholder="Your professional title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company" className="text-base font-semibold mb-3 block">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="company"
                          value={cardData.company}
                          onChange={(e) => setCardData({ ...cardData, company: e.target.value })}
                          className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                          placeholder="Company name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-3 block">Industry</Label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowIndustryModal(true)}
                        className="w-full h-12 justify-start text-left font-normal bg-background/50 border-border/50 hover:border-primary rounded-xl"
                      >
                        <span className="mr-2">
                          {cardData.industry === 'Technology' && '💻'}
                          {cardData.industry === 'Healthcare' && '🏥'}
                          {cardData.industry === 'Finance' && '💰'}
                          {cardData.industry === 'Education' && '📚'}
                          {cardData.industry === 'Marketing' && '📢'}
                          {cardData.industry === 'Real Estate' && '🏠'}
                          {cardData.industry === 'Retail' && '🛍️'}
                          {cardData.industry === 'Hospitality' && '🏨'}
                          {cardData.industry === 'Entertainment' && '🎬'}
                          {cardData.industry === 'Food & Beverage' && '🍽️'}
                          {cardData.industry === 'Consulting' && '💼'}
                          {cardData.industry === 'Creative' && '🎨'}
                          {cardData.industry === 'Legal' && '⚖️'}
                          {cardData.industry === 'Construction' && '🏗️'}
                          {cardData.industry === 'Manufacturing' && '🏭'}
                          {cardData.industry === 'Transportation' && '🚗'}
                          {cardData.industry === 'Telecommunications' && '📱'}
                          {cardData.industry === 'Media' && '📺'}
                          {cardData.industry === 'Non-Profit' && '❤️'}
                          {cardData.industry === 'Other' && '🔧'}
                        </span>
                        {cardData.industry || 'Select your industry'}
                      </Button>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-base font-semibold mb-3 block">Bio</Label>
                      <Textarea
                        id="bio"
                        value={cardData.bio}
                        onChange={(e) => setCardData({ ...cardData, bio: e.target.value })}
                        className="bg-background/50 border-border/50 focus:border-primary rounded-xl min-h-32"
                        rows={4}
                        placeholder="Tell people about yourself..."
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6 mt-8">
                <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 rounded-2xl backdrop-blur-sm">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold mb-3 block">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={cardData.email}
                          onChange={(e) => setCardData({ ...cardData, email: e.target.value })}
                          className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-base font-semibold mb-3 block">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={cardData.phone}
                          onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
                          className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-3 block">Location</Label>
                      <LocationAutocomplete
                        value={cardData.location}
                        onChange={(value) => setCardData({ ...cardData, location: value })}
                        placeholder="City, Country"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website" className="text-base font-semibold mb-3 block">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="website"
                          value={cardData.website}
                          onChange={(e) => setCardData({ ...cardData, website: e.target.value })}
                          className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                          placeholder="yourwebsite.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="youtubeChannel" className="text-base font-semibold mb-3 block">YouTube Channel</Label>
                      <div className="relative">
                        <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="youtubeChannel"
                          value={cardData.youtubeChannel}
                          onChange={(e) => setCardData({ ...cardData, youtubeChannel: e.target.value })}
                          className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                          placeholder="@yourchannel or Channel ID"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Socials Tab */}
              <TabsContent value="links" className="space-y-6 mt-8">
                <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 rounded-2xl backdrop-blur-sm">
                  <div className="space-y-6">
                    {[
                      { icon: Instagram, label: "Instagram", placeholder: "instagram.com/username", key: "instagram" },
                      { icon: Linkedin, label: "LinkedIn", placeholder: "linkedin.com/in/username", key: "linkedin" },
                      { icon: Twitter, label: "Twitter", placeholder: "twitter.com/username", key: "twitter" },
                      { icon: Facebook, label: "Facebook", placeholder: "facebook.com/username", key: "facebook" },
                      { icon: Youtube, label: "YouTube", placeholder: "youtube.com/@username", key: "youtube" },
                    ].map((social, i) => (
                      <div key={i}>
                        <Label className="text-base font-semibold mb-3 block">{social.label}</Label>
                        <div className="relative">
                          <social.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            value={cardData.socialLinks[social.key as keyof typeof cardData.socialLinks]}
                            onChange={(e) => setCardData({
                              ...cardData,
                              socialLinks: { ...cardData.socialLinks, [social.key]: e.target.value }
                            })}
                            className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                            placeholder={social.placeholder}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* QR Code Tab */}
              <TabsContent value="qrcode" className="space-y-6 mt-8">
                <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 rounded-2xl backdrop-blur-sm">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">QR Code Customization</h3>
                      <p className="text-muted-foreground">
                        Customize your QR code style, colors, and appearance
                      </p>
                    </div>
                    <QRCodeCustomizer 
                      username={cardData.name.toLowerCase().replace(/\s+/g, '')} 
                      onQRCodeGenerated={(qrCode) => setCardData(prev => ({ ...prev, qrCode }))}
                    />
                  </div>
                </Card>
              </TabsContent>

              {/* Theme Tab */}
              <TabsContent value="theme" className="space-y-6 mt-8">
                <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 rounded-2xl backdrop-blur-sm">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-base font-semibold mb-4 block">Color Scheme</Label>
                      <div className="grid grid-cols-4 gap-4">
                        {[
                          { name: "Gold", colors: ["#D4AF37", "#000000"] },
                          { name: "Blue", colors: ["#3B82F6", "#1E293B"] },
                          { name: "Purple", colors: ["#A855F7", "#1E1B4B"] },
                          { name: "Green", colors: ["#10B981", "#064E3B"] },
                        ].map((theme, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setCardData(prev => ({ ...prev, theme }));
                              toast.success(`${theme.name} theme applied!`);
                            }}
                            className={`relative h-20 rounded-xl border-2 ${
                              cardData.theme.name === theme.name 
                                ? 'border-primary shadow-lg shadow-primary/20' 
                                : 'border-border/50'
                            } hover:border-primary/50 transition-all overflow-hidden group`}
                            style={{
                              background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`
                            }}
                          >
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">{theme.name}</span>
                            </div>
                            {cardData.theme.name === theme.name && (
                              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                <Sparkles className="w-3 h-3" />
                              </div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-4 block">Card Layout</Label>
                      <div className="grid grid-cols-2 gap-4">
                        {["Minimal", "Classic", "Modern", "Bold"].map((layout, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="h-24 rounded-xl bg-secondary/50 border-2 border-border/50 hover:border-primary/50 transition-all flex items-center justify-center font-semibold"
                          >
                            {layout}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Live Preview Panel - Sticky */}
          <motion.div 
            className="lg:sticky lg:top-24 h-fit"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-muted-foreground">Live Preview</h3>
              </div>

              <MobilePreview cardData={cardData} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Industry Selector Modal */}
      <IndustrySelectorModal
        open={showIndustryModal}
        onClose={() => setShowIndustryModal(false)}
        selectedIndustry={cardData.industry}
        onSelect={(industry) => setCardData({ ...cardData, industry })}
      />
    </div>
  );
};

export default Builder;
