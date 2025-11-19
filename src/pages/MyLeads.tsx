/**
 * My Leads Page - Track and manage leads
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { MessageSquare, TrendingUp, Users, Target, Crown } from 'lucide-react';

const MyLeads = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Lead Capture',
      description: 'Automatically capture leads when someone saves your card'
    },
    {
      icon: TrendingUp,
      title: 'Lead Scoring',
      description: 'Track engagement and prioritize hot leads'
    },
    {
      icon: Users,
      title: 'CRM Integration',
      description: 'Sync leads with your favorite CRM tools'
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-gold">My Leads</span>
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="w-16 h-16 text-amber-500" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Lead Management</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Capture, track, and convert leads from your digital business cards. Never miss an opportunity.
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
                    <feature.icon className="w-12 h-12 text-amber-500 mb-4 mx-auto" />
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30 max-w-2xl mx-auto">
              <Crown className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-muted-foreground mb-6">
                Lead management is a premium feature. Upgrade now to start tracking and converting leads.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade Now
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyLeads;
