import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Download, Share2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Preview = () => {
  const navigate = useNavigate();

  const handleShare = () => {
    toast.success("Link copied to clipboard!");
  };

  const handleDownloadQR = () => {
    toast.success("QR code downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gradient-gold">AJ STUDIOZ</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button onClick={() => navigate("/builder")} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Edit Card
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Card Preview */}
          <Card className="p-12 bg-card border-border shadow-gold-glow animate-fade-in">
            <div className="text-center space-y-8">
              {/* Profile Image */}
              <div className="relative inline-block">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-gold-glow">
                  <span className="text-5xl font-bold text-primary-foreground">JD</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary flex items-center justify-center border-4 border-background">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>

              {/* Name & Role */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">John Doe</h1>
                <p className="text-xl text-primary font-medium">Creative Director</p>
                <p className="text-muted-foreground">AJ STUDIOZ</p>
              </div>

              {/* Bio */}
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Passionate about design and innovation. Building beautiful digital experiences 
                that connect people and ideas.
              </p>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-primary/20 hover:bg-primary/5 justify-start"
                  size="lg"
                >
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  john@ajstudioz.com
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-primary/20 hover:bg-primary/5 justify-start"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  +1 234 567 8900
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 pt-4">
                {['LinkedIn', 'Twitter', 'Instagram', 'GitHub'].map((social) => (
                  <button
                    key={social}
                    className="w-14 h-14 rounded-full bg-secondary hover:bg-primary/20 transition-smooth flex items-center justify-center group"
                  >
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-smooth">
                      {social[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* QR Code Section */}
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Scan to save contact</p>
                <div className="w-48 h-48 mx-auto bg-secondary rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">QR Code</span>
                </div>
                <Button 
                  variant="outline"
                  className="mt-4 border-primary/20 hover:bg-primary/5"
                  onClick={handleDownloadQR}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <Card className="p-4 bg-card border-border text-center">
              <p className="text-3xl font-bold text-primary">1.2K</p>
              <p className="text-sm text-muted-foreground mt-1">Views</p>
            </Card>
            <Card className="p-4 bg-card border-border text-center">
              <p className="text-3xl font-bold text-primary">342</p>
              <p className="text-sm text-muted-foreground mt-1">Clicks</p>
            </Card>
            <Card className="p-4 bg-card border-border text-center">
              <p className="text-3xl font-bold text-primary">89</p>
              <p className="text-sm text-muted-foreground mt-1">Saves</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
