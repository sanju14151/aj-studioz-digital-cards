/**
 * About Page
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Target, Zap, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-8 h-8" />
              <h1 className="text-xl font-bold">
                <span className="text-gradient-gold">AJ</span>
                <span> STUDIOZ</span>
              </h1>
            </a>
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <a href="/features">Features</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/pricing">Pricing</a>
              </Button>
              <Button asChild>
                <a href="/auth">Sign In</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">
            About <span className="text-gradient-gold">AJ STUDIOZ</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Revolutionizing how professionals connect in the digital age
          </p>
        </motion.div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-500/20">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center leading-relaxed">
              To empower professionals and businesses with cutting-edge digital business card solutions that make networking seamless, sustainable, and memorable. We believe every connection should be instant, impactful, and eco-friendly.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Target,
              title: 'Innovation',
              description: 'Pioneering NFC and digital solutions',
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Building connections that matter',
            },
            {
              icon: Zap,
              title: 'Simplicity',
              description: 'Easy to use, powerful results',
            },
            {
              icon: Heart,
              title: 'Sustainability',
              description: 'Eco-friendly paperless networking',
            },
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2024, AJ STUDIOZ emerged from a simple observation: business cards were wasteful, easily lost, and couldn't keep up with our digital world. We set out to change that.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              What started as a small project has grown into a comprehensive platform serving thousands of professionals worldwide. Our NFC-enabled cards and digital profiles have facilitated millions of connections, helping businesses grow and professionals network more effectively.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we continue to innovate, adding new features and integrations that make professional networking smarter, faster, and more sustainable than ever before.
            </p>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-muted-foreground mb-6">
            Start creating your digital business card today
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <a href="/auth">Get Started Free</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl mt-24">
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

export default About;
