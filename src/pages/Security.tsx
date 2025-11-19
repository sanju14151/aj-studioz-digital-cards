/**
 * Security Page
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Shield, Lock, Key, Eye, Server, FileCheck } from 'lucide-react';

export const Security = () => {
  const features = [
    {
      icon: Lock,
      title: 'SSL/TLS Encryption',
      description: 'All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols.',
    },
    {
      icon: Key,
      title: 'Secure Authentication',
      description: 'We use bcrypt hashing for passwords and secure token-based authentication to protect your account.',
    },
    {
      icon: Server,
      title: 'Data Protection',
      description: 'Your data is stored in secure, SOC 2 compliant data centers with regular backups and redundancy.',
    },
    {
      icon: Eye,
      title: 'Privacy Controls',
      description: 'You control what information is public and what remains private. Set visibility for each field.',
    },
    {
      icon: Shield,
      title: 'GDPR Compliant',
      description: 'We comply with GDPR, CCPA, and other privacy regulations to protect your personal information.',
    },
    {
      icon: FileCheck,
      title: 'Regular Audits',
      description: 'Our security practices are regularly audited and updated to meet the latest security standards.',
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
            <Button asChild><a href="/auth">Sign In</a></Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Security</span> First
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your data security and privacy are our top priorities. Learn how we protect your information.
          </p>
        </motion.div>

        {/* Security Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Best Practices */}
        <Card className="p-8 max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">Security Best Practices</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">Use Strong Passwords</h3>
              <p className="text-muted-foreground">Create passwords with at least 12 characters including uppercase, lowercase, numbers, and special characters.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Enable Two-Factor Authentication</h3>
              <p className="text-muted-foreground">Add an extra layer of security to your account with 2FA (coming soon).</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Review Access Regularly</h3>
              <p className="text-muted-foreground">Check your account activity and connected devices regularly.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Keep Software Updated</h3>
              <p className="text-muted-foreground">Always use the latest version of your browser for maximum security.</p>
            </div>
          </div>
        </Card>

        {/* Report Security Issue */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-2 border-red-500/20">
            <h3 className="text-2xl font-bold mb-3">Found a Security Issue?</h3>
            <p className="text-muted-foreground mb-6">
              We take security seriously. If you've discovered a security vulnerability, please report it to us immediately.
            </p>
            <Button size="lg" variant="destructive">
              Report Security Issue
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Email: security@ajstudioz.com
            </p>
          </Card>
        </motion.div>
      </div>

      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
                <li><a href="/terms" className="hover:text-primary">Terms</a></li>
                <li><a href="/security" className="hover:text-primary">Security</a></li>
                <li><a href="/cookies" className="hover:text-primary">Cookies</a></li>
              </ul>
            </div>
            <div className="md:col-span-3">
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

export default Security;
