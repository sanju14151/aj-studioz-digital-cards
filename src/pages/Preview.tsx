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

const Preview = () => {
  const navigate = useNavigate();

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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="border-primary/30 hover:bg-primary/5 font-medium"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => navigate("/builder")} 
                className="bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-gold-glow font-medium"
              >
                Edit Card
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Premium Card Preview */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Card className="p-12 md:p-16 bg-gradient-to-br from-card via-card to-secondary/50 border-2 border-primary/20 shadow-2xl hover:shadow-gold-glow transition-all duration-500 rounded-3xl backdrop-blur-sm">
                <div className="text-center space-y-8">
                  {/* Profile Image with Animated Gold Ring */}
                  <motion.div 
                    className="relative inline-block"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary via-primary to-primary/60 flex items-center justify-center ring-4 ring-primary/20 ring-offset-8 ring-offset-card shadow-gold-glow">
                      <span className="text-5xl font-bold text-primary-foreground">JD</span>
                    </div>
                    
                    {/* Rotating Ring Effect */}
                    <motion.div
                      className="absolute -inset-4 rounded-full border-2 border-primary/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute -inset-6 rounded-full border border-primary/20"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Sparkle Badge */}
                    <motion.div 
                      className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center border-4 border-card shadow-gold-glow"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sparkles className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                  </motion.div>

                  {/* Name & Role */}
                  <motion.div 
                    className="space-y-3"
                    variants={itemVariants}
                  >
                    <h1 className="text-5xl font-bold tracking-tight">John Doe</h1>
                    <p className="text-2xl text-primary font-semibold">Creative Director</p>
                    <p className="text-muted-foreground flex items-center justify-center gap-2 text-lg">
                      <Building className="w-5 h-5" />
                      AJ STUDIOZ
                    </p>
                  </motion.div>

                  {/* Bio */}
                  <motion.p 
                    className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
                    variants={itemVariants}
                  >
                    Passionate about design and innovation. Building beautiful digital experiences 
                    that connect people and ideas.
                  </motion.p>

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
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className="w-full h-14 border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 justify-start rounded-xl font-medium text-base group"
                        variant="outline"
                      >
                        <Mail className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                        john@ajstudioz.com
                      </Button>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className="w-full h-14 border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 justify-start rounded-xl font-medium text-base group"
                        variant="outline"
                      >
                        <Phone className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                        +1 234 567 8900
                      </Button>
                    </motion.div>
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
                    className="pt-12 border-t border-border/50 space-y-6"
                    variants={itemVariants}
                  >
                    <p className="text-sm text-muted-foreground font-medium">Scan to save contact</p>
                    
                    <motion.div 
                      className="w-56 h-56 mx-auto bg-gradient-to-br from-secondary/50 to-background rounded-2xl border-2 border-primary/20 flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-muted-foreground font-medium">QR Code Preview</span>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        variant="outline"
                        className="border-2 border-primary/30 hover:bg-primary/10 font-medium rounded-xl"
                        onClick={handleDownloadQR}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download QR Code
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </Card>
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
                  <Card className={`p-6 bg-gradient-to-br ${stat.color} border-2 border-border/50 hover:border-primary/30 transition-all hover:shadow-gold-glow rounded-2xl text-center group`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    </motion.div>
                    <p className="text-4xl font-bold text-gradient-gold mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  </Card>
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
