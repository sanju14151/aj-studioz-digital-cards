/**
 * QR Codes Page - Generate and manage QR codes
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { QrCode, Plus, Download, Share2, Eye } from 'lucide-react';

const QRCodesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QrCode className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-gold">QR Codes</span>
              </h1>
            </div>
            
            <Button onClick={() => navigate('/builder?tab=qrcode')}>
              <Plus className="w-4 h-4 mr-2" />
              Create QR Code
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
              <QrCode className="w-16 h-16 text-primary" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">QR Code Manager</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Create customized QR codes for your digital cards. Share them anywhere - print on business cards, flyers, or display digitally.
            </p>

            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/builder?tab=qrcode')}>
                <Plus className="w-5 h-5 mr-2" />
                Create Your First QR Code
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QRCodesPage;
