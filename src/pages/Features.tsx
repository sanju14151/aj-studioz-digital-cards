/**
 * Features Page - Showcase all product features
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Sparkles, 
  Radio, 
  QrCode, 
  BarChart3, 
  Globe, 
  Zap,
  Shield,
  Smartphone,
  Palette,
  Users,
  Mail,
  Link2,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const Features = () => {
  const navigate = useNavigate();

  const mainFeatures = [
    {
      icon: Radio,
      title: 'NFC Smart Cards',
      description: 'Tap your card on any smartphone to instantly share your digital profile. No app required.',
      color: 'from-emerald-500 to-teal-500',
      features: ['Instant sharing', 'Works with all phones', 'Secure encryption']
    },
    {
      icon: QrCode,
      title: 'Custom QR Codes',
      description: 'Generate beautiful, branded QR codes with custom colors, logos, and styles.',
      color: 'from-blue-500 to-cyan-500',
      features: ['Customizable design', 'High resolution', 'Download & print']
    },
    {
      icon: Palette,
      title: 'Premium Templates',
      description: 'Choose from 6+ professionally designed templates. Customize colors, fonts, and layouts.',
      color: 'from-purple-500 to-pink-500',
      features: ['6+ templates', 'Full customization', 'Mobile optimized']
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track views, clicks, and engagement. See where your visitors are from and when they visit.',
      color: 'from-orange-500 to-red-500',
      features: ['Live stats', 'Geographic data', 'Click tracking']
    },
    {
      icon: Globe,
      title: 'Custom Domain',
      description: 'Use your own domain name for your digital card. Increase trust and brand recognition.',
      color: 'from-yellow-500 to-orange-500',
      features: ['your-name.com', 'SSL included', 'Easy setup']
    },
    {
      icon: Zap,
      title: 'Integrations',
      description: 'Connect with Salesforce, HubSpot, Zapier, and 3000+ apps. Automate your workflow.',
      color: 'from-indigo-500 to-purple-500',
      features: ['CRM sync', 'Email marketing', 'Webhooks & API']
    },
  ];

  const additionalFeatures = [
    { icon: Smartphone, text: 'Mobile-first design' },
    { icon: Shield, text: 'Enterprise-grade security' },
    { icon: Users, text: 'Team management' },
    { icon: Mail, text: 'Email signature generator' },
    { icon: Link2, text: 'Social media integration' },
    { icon: Globe, text: 'Virtual backgrounds' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-8 h-8" />
            <span className="text-xl font-bold">AJ STUDIOZ</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
            <Button variant="ghost" onClick={() => navigate('/templates')}>Templates</Button>
            <Button variant="outline" onClick={() => navigate('/auth')}>Sign In</Button>
            <Button onClick={() => navigate('/auth')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            All Features
          </span>
          <h1 className="text-6xl font-bold mb-6">
            Everything You Need to
            <span className="text-gradient-gold"> Stand Out</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Create stunning digital business cards with powerful features designed for modern professionals.
          </p>
        </motion.div>
      </section>

      {/* Main Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 hover:border-primary/50 transition-all">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">And Much More...</h2>
          <p className="text-muted-foreground text-lg">
            Packed with features to make your digital presence unforgettable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 flex items-center gap-4 bg-card border-2 border-border/50">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="font-semibold">{feature.text}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="p-12 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are already using AJ STUDIOZ digital cards
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth')}>
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/demo')}>
              View Demo
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/features" className="hover:text-primary">Features</a></li>
                <li><a href="/pricing" className="hover:text-primary">Pricing</a></li>
                <li><a href="/templates" className="hover:text-primary">Templates</a></li>
                <li><a href="/nfc-cards" className="hover:text-primary">NFC Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/about" className="hover:text-primary">About</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                <li><a href="/support" className="hover:text-primary">Support</a></li>
                <li><a href="/blog" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
                <li><a href="/terms" className="hover:text-primary">Terms</a></li>
                <li><a href="/security" className="hover:text-primary">Security</a></li>
                <li><a href="/cookies" className="hover:text-primary">Cookies</a></li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-10 h-10" />
                <h3 className="font-bold">AJ STUDIOZ</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Create stunning digital business cards that leave a lasting impression.
              </p>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground text-sm">
            © 2025 AJ STUDIOZ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
