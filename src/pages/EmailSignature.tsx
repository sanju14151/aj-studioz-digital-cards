/**
 * Email Signature Page - Generate branded email signatures
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Copy, Eye, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const EmailSignature = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // TODO: Copy signature HTML to clipboard
    navigator.clipboard.writeText('Email signature HTML');
    setCopied(true);
    toast.success('Signature copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
          <div className="container mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-gold">Email Signature</span>
              </h1>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                {copied ? 'Copied!' : 'Copy HTML'}
              </Button>
              <Button onClick={() => navigate('/builder')}>
                <Sparkles className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">Preview</h2>
              <Card className="p-6 bg-white text-gray-900">
                <div className="border-l-4 border-emerald-500 pl-4">
                  <h3 className="font-bold text-lg mb-1">{user?.fullName}</h3>
                  <p className="text-sm text-gray-600 mb-3">Creative Director</p>
                  
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-500" />
                      {user?.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-500">🌐</span>
                      ajstudioz.com
                    </p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                      View Digital Card
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-4 italic">
                    Powered by wCard.io
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">How to Install</h2>
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">1</span>
                    Gmail
                  </h3>
                  <ol className="text-sm text-muted-foreground space-y-1 ml-8">
                    <li>• Open Gmail Settings</li>
                    <li>• Scroll to "Signature" section</li>
                    <li>• Click "Create new"</li>
                    <li>• Paste the copied HTML</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">2</span>
                    Outlook
                  </h3>
                  <ol className="text-sm text-muted-foreground space-y-1 ml-8">
                    <li>• Go to File → Options → Mail</li>
                    <li>• Click "Signatures"</li>
                    <li>• Create new signature</li>
                    <li>• Paste the HTML code</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">3</span>
                    Apple Mail
                  </h3>
                  <ol className="text-sm text-muted-foreground space-y-1 ml-8">
                    <li>• Open Mail → Preferences</li>
                    <li>• Go to "Signatures" tab</li>
                    <li>• Create new signature</li>
                    <li>• Paste the code</li>
                  </ol>
                </div>

                <Button className="w-full" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Signature HTML
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSignature;
