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
          <div className="space-y-24">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-8">
                <Radio className="w-16 h-16 text-emerald-500" />
              </div>
              
              <h2 className="text-5xl font-bold mb-4">NFC Smart Cards</h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                Transform your digital card into a physical experience. Share your profile instantly with a simple tap.
              </p>
            </motion.div>

            {/* Card Designs Showcase */}
            <div>
              <h3 className="text-3xl font-bold text-center mb-12">Choose Your Design</h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    name: 'Premium Black',
                    gradient: 'from-gray-900 to-gray-800',
                    accentColor: 'text-emerald-400',
                    price: '$29'
                  },
                  {
                    name: 'Gold Luxury',
                    gradient: 'from-amber-600 to-yellow-600',
                    accentColor: 'text-white',
                    price: '$39'
                  },
                  {
                    name: 'Ocean Blue',
                    gradient: 'from-blue-600 to-cyan-600',
                    accentColor: 'text-white',
                    price: '$29'
                  },
                  {
                    name: 'Mint Fresh',
                    gradient: 'from-emerald-600 to-teal-600',
                    accentColor: 'text-white',
                    price: '$29'
                  },
                  {
                    name: 'Royal Purple',
                    gradient: 'from-purple-600 to-pink-600',
                    accentColor: 'text-white',
                    price: '$29'
                  },
                  {
                    name: 'Pure White',
                    gradient: 'from-white to-gray-100',
                    accentColor: 'text-gray-900',
                    price: '$29',
                    border: 'border-2 border-gray-200'
                  },
                ].map((design, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="cursor-pointer"
                  >
                    <Card className={`p-8 h-full ${design.border || ''} hover:border-emerald-500 transition-all`}>
                      {/* Card Preview */}
                      <div className={`w-full aspect-[1.6] bg-gradient-to-br ${design.gradient} rounded-xl p-6 flex flex-col justify-between shadow-2xl mb-4`}>
                        <div className="flex items-start justify-between">
                          <img src="/AJ.svg" alt="Logo" className="w-10 h-10 bg-white rounded-lg p-2" />
                          <Radio className={`w-6 h-6 ${design.accentColor}`} />
                        </div>
                        <div className={design.accentColor}>
                          <h4 className="text-xl font-bold mb-1">Your Name</h4>
                          <p className="text-sm opacity-90">Your Title</p>
                        </div>
                      </div>
                      
                      <h4 className="font-bold text-lg mb-2">{design.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-emerald-500">{design.price}</span>
                        <Button size="sm">Select</Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

            {/* CTA */}
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/demo')}>
                <Smartphone className="w-5 h-5 mr-2" />
                See Demo
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFCCards;
