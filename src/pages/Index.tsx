import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, CreditCard, QrCode, BarChart3, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gradient-gold">AJ STUDIOZ</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-smooth">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-smooth">Pricing</a>
            <a href="#demo" className="text-muted-foreground hover:text-foreground transition-smooth">Demo</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/auth")}>Login</Button>
            <Button onClick={() => navigate("/auth")} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-4">
            <span className="text-sm text-primary font-medium">Premium Digital Business Cards</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Your Digital Identity,
            <br />
            <span className="text-gradient-gold">Elegantly Crafted</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create stunning NFC-enabled digital business cards that leave a lasting impression. 
            Share your contact instantly with a tap or scan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold-glow text-lg px-8"
              onClick={() => navigate("/builder")}
            >
              <Zap className="w-5 h-5 mr-2" />
              Create Your Card
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/20 hover:bg-primary/5 text-lg px-8"
            >
              <QrCode className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Preview Card */}
        <div className="max-w-md mx-auto mt-16 animate-slide-up">
          <Card className="p-8 bg-card border-border shadow-card hover:shadow-gold-glow transition-smooth">
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-foreground">AJ</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">John Doe</h3>
                <p className="text-muted-foreground">Creative Director</p>
              </div>
              <div className="flex justify-center gap-2 pt-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-secondary animate-glow-pulse" />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 border-t border-border">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for
            <span className="text-gradient-gold"> Modern Professionals</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to create and manage your digital presence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: CreditCard,
              title: "NFC Enabled",
              description: "Share your card instantly with a simple tap using NFC technology"
            },
            {
              icon: QrCode,
              title: "QR Code Generation",
              description: "Auto-generate beautiful QR codes for easy scanning and sharing"
            },
            {
              icon: BarChart3,
              title: "Real-time Analytics",
              description: "Track views, clicks, and engagement with detailed insights"
            },
            {
              icon: Sparkles,
              title: "Custom Themes",
              description: "Choose from premium themes or create your own unique design"
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Enterprise-grade security to keep your data safe"
            },
            {
              icon: Zap,
              title: "Instant Updates",
              description: "Update your card anytime and changes reflect immediately"
            }
          ].map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-card border-border hover:border-primary/30 transition-smooth hover:shadow-gold-glow group"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-smooth" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-border">
        <Card className="p-12 bg-gradient-to-br from-card to-secondary border-primary/20 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Make Your Mark?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have elevated their networking game
          </p>
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-gold-glow text-lg px-8"
            onClick={() => navigate("/builder")}
          >
            Start Building Now
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold text-gradient-gold">AJ STUDIOZ</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Premium digital business cards for the modern professional
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-smooth">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-smooth">About</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-smooth">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
            <p>© 2024 AJ STUDIOZ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
