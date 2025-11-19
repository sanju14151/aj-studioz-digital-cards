import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Phone, 
  Download, 
  Share2, 
  Sparkles,
  MapPin,
  Globe,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Building,
  TrendingUp,
  Eye,
  MousePointerClick
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { MotionCard, MotionButton, MotionIcon, MotionAvatar, MotionDivider } from "@/components/motion";

const Preview = () => {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState<any>(null);

  useEffect(() => {
    // Load card data from localStorage
    const storedData = localStorage.getItem('previewCardData');
    if (storedData) {
      try {
        setCardData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing preview data:', error);
        toast.error('Failed to load preview data');
      }
    }
  }, []);

  const handleShare = () => {
    toast.success("Link copied to clipboard!", {
      description: "Share your card with anyone"
    });
  };

  const handleDownloadQR = () => {
    toast.success("QR code downloaded!", {
      description: "Share your QR code anywhere"
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
              <Sparkles className="w-8 h-8 text-primary" />
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
          
          <div className="flex items-center gap-4">
            <MotionButton 
              variant="outline" 
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </MotionButton>
            <MotionButton 
              variant="gold"
              onClick={() => navigate("/builder")}
            >
              Edit Card
            </MotionButton>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Premium Card Preview with 3D Tilt */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <MotionCard
                tiltEnabled={true}
                glowEnabled={true}
                variant="premium"
                className="p-12 md:p-16 rounded-3xl"
              >
                <div className="text-center space-y-8">
                  {/* Profile Image with Animated Gold Ring */}
                  <MotionAvatar size="xl" goldRing={true}>
                    <div className="w-full h-full bg-gradient-to-br from-primary via-primary to-primary/60 flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary-foreground">JD</span>
                    </div>
                  </MotionAvatar>
                  
                  <motion.div 
                    className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center border-4 border-card shadow-gold-glow-strong"
                    style={{ position: "absolute", marginTop: "-60px", marginLeft: "120px" }}
                    whileHover={{ scale: 1.15, rotate: 15 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Sparkles className="w-7 h-7 text-primary-foreground" />
                  </motion.div>

                  {/* Name & Role */}
                  <motion.div 
                    className="space-y-3"
                    variants={itemVariants}
                  >
                    <h1 className="text-5xl font-bold tracking-tight">{cardData?.name || 'John Doe'}</h1>
                    <p className="text-2xl text-primary font-semibold">{cardData?.role || 'Creative Director'}</p>
                    {cardData?.company && (
                      <p className="text-muted-foreground flex items-center justify-center gap-2 text-lg">
                        <Building className="w-5 h-5" />
                        {cardData.company}
                      </p>
                    )}
                  </motion.div>

                  {/* Bio */}
                  {cardData?.bio && (
                    <motion.p 
                      className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
                      variants={itemVariants}
                    >
                      {cardData.bio}
                    </motion.p>
                  )}

                  {/* Location & Website */}
                  <motion.div 
                    className="flex items-center justify-center gap-6 text-muted-foreground"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm">New York, USA</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm">ajstudioz.com</span>
                    </div>
                  </motion.div>

                  {/* Contact Buttons */}
                  <motion.div 
                    className="space-y-4 pt-4"
                    variants={itemVariants}
                  >
                    <MotionButton 
                      variant="outline"
                      className="w-full h-14 justify-start text-base group"
                    >
                      <MotionIcon hoverEffect="scale" className="mr-3">
                        <Mail className="w-5 h-5 text-primary" />
                      </MotionIcon>
                      john@ajstudioz.com
                    </MotionButton>
                    
                    <MotionButton 
                      variant="outline"
                      className="w-full h-14 justify-start text-base group"
                    >
                      <MotionIcon hoverEffect="scale" className="mr-3">
                        <Phone className="w-5 h-5 text-primary" />
                      </MotionIcon>
                      +1 234 567 8900
                    </MotionButton>
                  </motion.div>

                  {/* Social Links */}
                  <motion.div 
                    className="flex justify-center gap-4 pt-6"
                    variants={itemVariants}
                  >
                    {[
                      { icon: Instagram, label: "Instagram" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Twitter, label: "Twitter" },
                      { icon: Facebook, label: "Facebook" }
                    ].map((social, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ 
                          scale: 1.15,
                          boxShadow: "0 0 25px rgba(212, 175, 55, 0.5)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-secondary/50 border-2 border-primary/20 hover:border-primary/40 flex items-center justify-center transition-all group"
                      >
                        <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.button>
                    ))}
                  </motion.div>

                  {/* QR Code Section */}
                  <motion.div 
                    className="pt-12 space-y-6"
                    variants={itemVariants}
                  >
                    <MotionDivider goldAccent={true} />
                    
                    <p className="text-sm text-muted-foreground font-medium pt-6">Scan to save contact</p>
                    
                    <MotionCard 
                      className="w-56 h-56 mx-auto bg-gradient-to-br from-secondary/50 to-background flex items-center justify-center"
                      glowEnabled={true}
                    >
                      <span className="text-muted-foreground font-medium">QR Code Preview</span>
                    </MotionCard>

                    <MotionButton 
                      variant="outline"
                      onClick={handleDownloadQR}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download QR Code
                    </MotionButton>
                  </motion.div>
                </div>
              </MotionCard>
            </motion.div>

            {/* Analytics Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-6 mt-10"
              variants={containerVariants}
            >
              {[
                { icon: Eye, value: "1.2K", label: "Views", color: "from-blue-500/20 to-blue-500/5" },
                { icon: MousePointerClick, value: "342", label: "Clicks", color: "from-primary/20 to-primary/5" },
                { icon: TrendingUp, value: "89", label: "Saves", color: "from-green-500/20 to-green-500/5" },
              ].map((stat, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <MotionCard className={`p-6 bg-gradient-to-br ${stat.color} text-center group`} glowEnabled={true}>
                    <MotionIcon hoverEffect="rotate" size="lg" className="mx-auto mb-3">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </MotionIcon>
                    <p className="text-4xl font-bold gold-shine mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  </MotionCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
