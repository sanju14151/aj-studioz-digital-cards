/**
 * ID Cards Page - Business ID Card Generator
 * Create horizontal business ID cards with QR codes for social channels
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Download,
  Trash2,
  QrCode as QrCodeIcon,
  Youtube,
  Instagram,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import QRCode from 'qrcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface IDCard {
  id: string;
  name: string;
  title: string;
  platform: 'youtube' | 'instagram' | 'linkedin' | 'twitter' | 'facebook';
  channelUrl: string;
  qrCodeUrl: string;
  createdAt: string;
}

const IDCards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [idCards, setIdCards] = useState<IDCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    title: '',
    platform: 'youtube' as const,
    channelUrl: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadIDCards();
  }, [user]);

  const loadIDCards = () => {
    try {
      setLoading(true);
      const saved = localStorage.getItem(`idCards_${user?.id}`);
      if (saved) {
        const cards = JSON.parse(saved);
        setIdCards(cards);
      }
    } catch (error) {
      console.error('Error loading ID cards:', error);
      toast.error('Failed to load ID cards');
    } finally {
      setLoading(false);
    }
  };

  const saveIDCards = (cards: IDCard[]) => {
    try {
      localStorage.setItem(`idCards_${user?.id}`, JSON.stringify(cards));
      setIdCards(cards);
    } catch (error) {
      console.error('Error saving ID cards:', error);
      toast.error('Failed to save ID cards');
    }
  };

  const handleCreateCard = async () => {
    if (!newCard.name || !newCard.channelUrl) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      // Generate QR code
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, newCard.channelUrl, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });

      const qrCodeUrl = qrCanvas.toDataURL('image/png');

      const newIDCard: IDCard = {
        id: Date.now().toString(),
        ...newCard,
        qrCodeUrl,
        createdAt: new Date().toISOString(),
      };

      const updatedCards = [...idCards, newIDCard];
      saveIDCards(updatedCards);
      
      setCreateModalOpen(false);
      setNewCard({
        name: '',
        title: '',
        platform: 'youtube',
        channelUrl: '',
      });
      
      toast.success('ID Card created successfully!');
    } catch (error) {
      console.error('Error creating ID card:', error);
      toast.error('Failed to create ID card');
    }
  };

  const handleDeleteCard = (id: string) => {
    const updatedCards = idCards.filter(card => card.id !== id);
    saveIDCards(updatedCards);
    toast.success('ID Card deleted');
  };

  const handleDownloadCard = async (card: IDCard) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Platform colors
      const platformColors = {
        youtube: { bg: '#FF0000', accent: '#CC0000' },
        instagram: { bg: '#E4405F', accent: '#C13584' },
        linkedin: { bg: '#0A66C2', accent: '#004182' },
        twitter: { bg: '#1DA1F2', accent: '#0C85D0' },
        facebook: { bg: '#1877F2', accent: '#0C5EC7' },
      };

      const colors = platformColors[card.platform];

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1e293b');
      gradient.addColorStop(1, '#334155');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Platform accent strip
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, 20, canvas.height);

      // Logo area
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      
      logoImg.onload = () => {
        // Draw logo
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 40px Arial';
        ctx.fillText('AJ', 60, 80);
        ctx.font = '20px Arial';
        ctx.fillText('STUDIOZ', 60, 110);

        // Name and Title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 48px Arial';
        ctx.fillText(card.name, 60, 300);
        ctx.font = '32px Arial';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(card.title, 60, 350);

        // Platform
        ctx.font = '24px Arial';
        ctx.fillStyle = colors.bg;
        ctx.fillText(card.platform.toUpperCase(), 60, 420);

        // QR Code
        const qrImg = new Image();
        qrImg.onload = () => {
          // QR background
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(760, 360, 200, 200);
          ctx.drawImage(qrImg, 770, 370, 180, 180);
          
          // QR Label
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('SCAN ME', 860, 340);
          
          // Download
          const link = document.createElement('a');
          link.download = `${card.name.replace(/\s+/g, '-')}-id-card.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          toast.success('ID Card downloaded!');
        };
        qrImg.src = card.qrCodeUrl;
      };
      
      logoImg.src = '/AJ.svg';
    } catch (error) {
      console.error('Error downloading ID card:', error);
      toast.error('Failed to download ID card');
    }
  };

  const platformIcons = {
    youtube: Youtube,
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter,
    facebook: Facebook,
  };

  const platformColors = {
    youtube: 'bg-red-500',
    instagram: 'bg-pink-500',
    linkedin: 'bg-blue-600',
    twitter: 'bg-sky-500',
    facebook: 'bg-blue-600',
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Business ID Cards</h1>
              <p className="text-muted-foreground">
                Create professional ID cards with QR codes for your social channels
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={() => setCreateModalOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create ID Card
            </Button>
          </div>

          {/* ID Cards Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : idCards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
                <QrCodeIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No ID Cards yet</h2>
              <p className="text-muted-foreground mb-6">
                Create your first business ID card with QR code
              </p>
              <Button onClick={() => setCreateModalOpen(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Create First ID Card
              </Button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {idCards.map((card, index) => {
                const Icon = platformIcons[card.platform];
                const colorClass = platformColors[card.platform];
                
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                      {/* Horizontal ID Card Preview */}
                      <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 aspect-[16/10] relative">
                        {/* Platform Accent */}
                        <div className={`absolute left-0 top-0 bottom-0 w-2 ${colorClass}`} />
                        
                        <div className="flex items-center justify-between h-full">
                          {/* Left Side - Info */}
                          <div className="flex-1 text-white">
                            <div className="mb-4">
                              <img src="/AJ.svg" alt="AJ" className="w-12 h-12 mb-2" />
                              <p className="text-xs font-semibold">AJ STUDIOZ</p>
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-2">{card.name}</h3>
                            <p className="text-gray-300 mb-3">{card.title}</p>
                            
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5" />
                              <span className="text-sm font-medium uppercase">{card.platform}</span>
                            </div>
                          </div>

                          {/* Right Side - QR Code */}
                          <div className="flex flex-col items-center">
                            {card.qrCodeUrl && (
                              <div className="bg-white p-3 rounded-lg mb-2">
                                <img 
                                  src={card.qrCodeUrl} 
                                  alt="QR Code" 
                                  className="w-32 h-32"
                                />
                              </div>
                            )}
                            <p className="text-white text-xs font-bold">SCAN ME</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-4 bg-card flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadCard(card)}
                          className="flex-1"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create ID Card Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Business ID Card</DialogTitle>
            <DialogDescription>
              Add your details and social channel URL to generate an ID card
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="title">Title / Position *</Label>
              <Input
                id="title"
                placeholder="Content Creator"
                value={newCard.title}
                onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="platform">Platform *</Label>
              <select
                id="platform"
                value={newCard.platform}
                onChange={(e) => setNewCard({ ...newCard, platform: e.target.value as any })}
                className="w-full px-3 py-2 rounded-md border border-input bg-background"
              >
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
              </select>
            </div>

            <div>
              <Label htmlFor="channelUrl">Channel/Profile URL *</Label>
              <Input
                id="channelUrl"
                placeholder="https://youtube.com/@yourchannel"
                value={newCard.channelUrl}
                onChange={(e) => setNewCard({ ...newCard, channelUrl: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setCreateModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCard}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              >
                Create ID Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IDCards;
