/**
 * Integrations Page - Connect with third-party apps
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Zap, Check, ExternalLink } from 'lucide-react';

const Integrations = () => {
  const navigate = useNavigate();

  const integrations = [
    {
      name: 'Salesforce',
      description: 'Sync contacts and leads automatically',
      icon: '☁️',
      color: 'from-blue-500 to-blue-600',
      connected: false
    },
    {
      name: 'HubSpot',
      description: 'Integrate with your CRM workflow',
      icon: '🎯',
      color: 'from-orange-500 to-red-500',
      connected: false
    },
    {
      name: 'Mailchimp',
      description: 'Add contacts to email campaigns',
      icon: '📧',
      color: 'from-yellow-400 to-yellow-500',
      connected: false
    },
    {
      name: 'Google Sheets',
      description: 'Export contacts to spreadsheets',
      icon: '📊',
      color: 'from-green-500 to-green-600',
      connected: false
    },
    {
      name: 'Zapier',
      description: 'Connect with 3000+ apps',
      icon: '/logos/zapier.svg',
      color: 'from-orange-400 to-orange-500',
      connected: false,
      isImage: true
    },
    {
      name: 'Slack',
      description: 'Get notifications for new contacts',
      icon: '💬',
      color: 'from-purple-500 to-pink-500',
      connected: false
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-gold">Integrations</span>
              </h1>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Connect Your Favorite Apps</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Seamlessly integrate your digital cards with the tools you already use.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 hover:border-primary/50 transition-all h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-3xl`}>
                        {integration.isImage ? (
                          <img src={integration.icon} alt={integration.name} className="w-12 h-12" />
                        ) : (
                          integration.icon
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>

                    <div className="mt-auto">
                      {integration.connected ? (
                        <Button variant="outline" className="w-full" disabled>
                          <Check className="w-4 h-4 mr-2 text-emerald-500" />
                          Connected
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Custom Integration CTA */}
            <Card className="p-8 mt-12 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 text-center">
              <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Need a Custom Integration?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We offer API access and webhooks for custom integrations with your existing systems.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View API Docs
                </Button>
                <Button size="lg" variant="outline">
                  Contact Support
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
