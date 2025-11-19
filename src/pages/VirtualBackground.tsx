/**
 * Virtual Background Page - Download branded backgrounds for video calls
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Video, Download, Sparkles, Monitor } from 'lucide-react';

const VirtualBackground = () => {
  const navigate = useNavigate();

  const backgrounds = [
    {
      name: 'Professional Office',
      color: 'from-blue-500 to-blue-700',
      preview: 'Office'
    },
    {
      name: 'Modern Minimal',
      color: 'from-gray-800 to-gray-900',
      preview: 'Minimal'
    },
    {
      name: 'Brand Colors',
      color: 'from-emerald-500 to-teal-600',
      preview: 'Brand'
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-gold">Virtual Background</span>
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
              <div className="w-32 h-32 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-8">
                <Video className="w-16 h-16 text-blue-500" />
              </div>
              
              <h2 className="text-4xl font-bold mb-4">Branded Virtual Backgrounds</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Stand out in video calls with branded backgrounds featuring your digital card information.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {backgrounds.map((bg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all">
                    <div className={`h-48 bg-gradient-to-br ${bg.color} flex items-center justify-center text-white text-2xl font-bold`}>
                      {bg.preview}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-3">{bg.name}</h3>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 max-w-2xl mx-auto text-center">
              <Monitor className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">How to Use</h3>
              <div className="text-left space-y-3 text-muted-foreground">
                <p>1. Download your preferred background</p>
                <p>2. Open your video conferencing app (Zoom, Teams, Meet)</p>
                <p>3. Go to Settings → Background → Upload Image</p>
                <p>4. Select the downloaded background</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VirtualBackground;
