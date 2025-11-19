/**
 * Contacts Page - Manage saved contacts
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Users, Search, Download, Mail, Phone, Building } from 'lucide-react';

const Contacts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-gold">Contacts</span>
              </h1>
            </div>
            
            <div className="flex gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
              <Users className="w-16 h-16 text-emerald-500" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">Your Contacts</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              All contacts who saved your digital card will appear here. Build your network effortlessly.
            </p>

            <div className="text-center">
              <p className="text-muted-foreground">No contacts yet. Share your card to start building your network!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
