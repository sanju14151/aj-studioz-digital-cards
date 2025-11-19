/**
 * NFC Cards Page - Manage NFC-enabled physical cards
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { 
  Radio, 
  Plus, 
  Smartphone,
  Zap,
  Shield,
  CheckCircle
} from 'lucide-react';

const NFCCards = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Smartphone,
      title: 'Tap to Share',
      description: 'Simply tap your NFC card on any smartphone to share your profile'
    },
    {
      icon: Zap,
      title: 'Instant Connection',
      description: 'No app required - works with all NFC-enabled devices'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and only you control what to share'
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Radio className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-gold">NFC Cards</span>
              </h1>
            </div>
            
            <Button onClick={() => navigate('/order-nfc')}>
              <Plus className="w-4 h-4 mr-2" />
              Order NFC Card
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-8">
              <Radio className="w-16 h-16 text-emerald-500" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">NFC Smart Cards</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Transform your digital card into a physical experience. Share your profile instantly with a simple tap.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 h-full">
                    <feature.icon className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/order-nfc')}>
                <Plus className="w-5 h-5 mr-2" />
                Order Your NFC Card
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NFCCards;
