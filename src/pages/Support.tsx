/**
 * Support Page
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Book, MessageCircle, Video, FileText, HelpCircle } from 'lucide-react';

export const Support = () => {
  const faqs = [
    {
      question: 'How do I create my first digital business card?',
      answer: 'Simply sign up for a free account, click "Create Card" and fill in your details. You can customize colors, add social links, and share instantly.',
    },
    {
      question: 'What is an NFC business card?',
      answer: 'NFC cards are physical smart cards that transfer your digital profile to any smartphone with a simple tap. No app required!',
    },
    {
      question: 'Can I update my card after sharing it?',
      answer: 'Yes! Your card is always live. Any changes you make are instantly reflected for everyone who has your link.',
    },
    {
      question: 'How do I upgrade to Pro?',
      answer: 'Visit the Pricing page and select your plan. We support credit cards, PayPal, and other payment methods.',
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Our web app is fully responsive and works perfectly on mobile. A native app is coming soon!',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel anytime from your account settings. Your data will be preserved.',
    },
  ];

  const resources = [
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials',
      link: '#',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Learn with step-by-step videos',
      link: '#',
    },
    {
      icon: MessageCircle,
      title: 'Community Forum',
      description: 'Connect with other users',
      link: '#',
    },
    {
      icon: FileText,
      title: 'API Docs',
      description: 'Integrate with our API',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
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
              <Button variant="ghost" asChild><a href="/features">Features</a></Button>
              <Button variant="ghost" asChild><a href="/pricing">Pricing</a></Button>
              <Button asChild><a href="/auth">Sign In</a></Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            How can we <span className="text-gradient-gold">help</span>?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Search our knowledge base or browse popular topics
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search for help..." className="pl-12 h-14 text-lg" />
          </div>
        </motion.div>

        {/* Resources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card className="p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <Card className="p-6">
                  <div className="flex gap-4">
                    <HelpCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mt-16">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-500/20">
            <h3 className="text-2xl font-bold mb-3">Still need help?</h3>
            <p className="text-muted-foreground mb-6">Our support team is here to assist you</p>
            <Button size="lg" asChild className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <a href="/contact">Contact Support</a>
            </Button>
          </Card>
        </motion.div>
      </div>

      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/features" className="hover:text-primary">Features</a></li>
                <li><a href="/pricing" className="hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/about" className="hover:text-primary">About</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
                <li><a href="/terms" className="hover:text-primary">Terms</a></li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-10 h-10" />
                <h3 className="font-bold">AJ STUDIOZ</h3>
              </div>
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

export default Support;
