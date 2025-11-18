import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  CreditCard, 
  QrCode, 
  BarChart3, 
  Zap, 
  Shield, 
  TrendingUp,
  Users,
  Globe,
  ArrowRight,
  Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

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
      {/* Premium Header with Glassmorphism */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-background/60"
      >
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Sparkles className="w-9 h-9 text-primary" />
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
          
          <nav className="hidden md:flex items-center gap-10">
            {["Features", "Pricing", "Demo"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-smooth relative text-sm font-medium"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/auth")}
              className="text-sm font-medium"
            >
              Login
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => navigate("/auth")} 
                className="bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-gold-glow transition-all duration-300 font-medium"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Premium Luxury */}
      <section className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
        <motion.div 
          className="max-w-5xl mx-auto text-center space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <div className="inline-block px-5 py-2.5 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 mb-6 backdrop-blur-sm">
              <span className="text-sm text-primary font-semibold tracking-wide">Premium Digital Business Cards</span>
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
          >
            Your Digital Identity,
            <br />
            <span className="text-gradient-gold inline-block mt-2">Elegantly Crafted</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Create stunning NFC-enabled digital business cards that leave a lasting impression. 
            Share your contact instantly with a tap or scan.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 justify-center pt-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-gold-glow text-lg px-10 py-6 rounded-xl font-semibold"
                onClick={() => navigate("/builder")}
              >
                <Zap className="w-5 h-5 mr-2" />
                Create Your Card
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 text-lg px-10 py-6 rounded-xl font-semibold backdrop-blur-sm"
              >
                <QrCode className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Premium Preview Card with Gold Ring */}
        <motion.div 
          className="max-w-lg mx-auto mt-24"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="p-10 bg-gradient-to-br from-card via-card to-secondary/50 border-2 border-primary/20 shadow-2xl hover:shadow-gold-glow transition-all duration-500 rounded-3xl backdrop-blur-sm">
            <div className="text-center space-y-6">
              <motion.div 
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-primary via-primary to-primary/60 flex items-center justify-center ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                  <span className="text-4xl font-bold text-primary-foreground">AJ</span>
                </div>
                <motion.div
                  className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 to-primary/0"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>

              <div>
                <h3 className="text-3xl font-bold mb-1">John Doe</h3>
                <p className="text-primary font-semibold text-lg">Creative Director</p>
                <p className="text-muted-foreground text-sm mt-1">AJ STUDIOZ</p>
              </div>

              <div className="flex justify-center gap-3 pt-6">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/50 border border-primary/20"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)"
                    }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Social Proof Bar */}
      <motion.section 
        className="border-y border-border/50 bg-secondary/30 backdrop-blur-sm py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: "50K+", label: "Active Users" },
              { icon: CreditCard, value: "1M+", label: "Cards Created" },
              { icon: Globe, value: "120+", label: "Countries" },
              { icon: TrendingUp, value: "99%", label: "Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="space-y-2"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto" />
                <p className="text-3xl font-bold text-gradient-gold">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section - Premium Grid */}
      <section id="features" className="container mx-auto px-6 py-24 md:py-32">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Powerful Features for
            <br />
            <span className="text-gradient-gold">Modern Professionals</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to create and manage your digital presence
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
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
            <motion.div key={index} variants={itemVariants}>
              <Card 
                className="group p-8 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-gold-glow rounded-2xl backdrop-blur-sm h-full"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Premium Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-24 md:py-32 border-t border-border/50">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Simple, <span className="text-gradient-gold">Transparent Pricing</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Free",
              price: "$0",
              period: "forever",
              features: [
                "1 Digital Card",
                "Basic Themes",
                "QR Code Generator",
                "Basic Analytics"
              ]
            },
            {
              name: "Pro",
              price: "$9",
              period: "per month",
              popular: true,
              features: [
                "Unlimited Cards",
                "Premium Themes",
                "Advanced Analytics",
                "Custom Domain",
                "Priority Support",
                "NFC Integration"
              ]
            }
          ].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className={`p-10 rounded-3xl relative overflow-hidden ${
                plan.popular 
                  ? 'bg-gradient-to-br from-primary/10 via-card to-secondary/30 border-2 border-primary shadow-gold-glow' 
                  : 'bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50'
              }`}>
                {plan.popular && (
                  <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    POPULAR
                  </div>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-gradient-gold">{plan.price}</span>
                      <span className="text-muted-foreground">/ {plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {plan.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full py-6 rounded-xl font-semibold text-lg ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-gold-glow'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                    }`}
                  >
                    Get Started
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="container mx-auto px-6 py-24 md:py-32 border-t border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-16 bg-gradient-to-br from-primary/10 via-card to-secondary/30 border-2 border-primary/30 text-center rounded-3xl shadow-gold-glow backdrop-blur-sm relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="relative z-10 space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
                Ready to Make Your Mark?
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who have elevated their networking game
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-gold-glow text-lg px-12 py-7 rounded-xl font-semibold"
                  onClick={() => navigate("/builder")}
                >
                  Start Building Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Premium Footer */}
      <footer className="border-t border-border/50 bg-secondary/20 backdrop-blur-sm mt-24">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-primary" />
                <span className="text-xl font-bold">
                  <span className="text-gradient-gold">AJ</span>
                  <span className="text-foreground"> STUDIOZ</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Premium digital business cards for the modern professional
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Templates", "NFC Cards"]
              },
              {
                title: "Company",
                links: ["About", "Contact", "Support", "Blog"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Cookies"]
              }
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-bold mb-6 text-foreground">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, li) => (
                    <li key={li}>
                      <a href="#" className="text-muted-foreground hover:text-primary transition-smooth text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 AJ STUDIOZ. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
