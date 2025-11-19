/**
 * ID Cards Page - Compact Horizontal Digital ID Cards
 * Similar to wcard.io ID card format with QR codes
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
  Edit, 
  Eye, 
  Download,
  QrCode,
  ArrowLeft,
  Trash2,
  Copy
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import QRCode from 'qrcode';

interface IDCard {
  id: string;
  type: 'business' | 'youtube' | 'custom';
  full_name: string;
  title: string;
  company?: string;
  email?: string;
  phone?: string;
  website?: string;
  profile_image?: string;
  qr_data: string;
  youtube_channel_id?: string;
  youtube_channel_name?: string;
  youtube_subscribers?: string;
  youtube_thumbnail?: string;
  card_color: string;
  created_at: string;
}

const IDCards = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [idCards, setIdCards] = useState<IDCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [cardType, setCardType] = useState<'business' | 'youtube'>('business');

  useEffect(() => {
    loadIDCards();
  }, [user]);

  const loadIDCards = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/id-cards/user/${user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch ID cards');
      }

      const data = await response.json();
      setIdCards(data.cards || []);
    } catch (error) {
      console.error('Error loading ID cards:', error);
      toast.error('Failed to load ID cards');
    } finally {
      setLoading(false);
    }
  };

  const downloadIDCard = async (card: IDCard) => {
    try {
      // Generate ID card image
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 600;
      const ctx = canvas.getContext('2d')!;

      // Background
      const gradient = ctx.createLinearGradient(0, 0, 1000, 600);
      gradient.addColorStop(0, card.card_color);
      gradient.addColorStop(1, '#1a1a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1000, 600);

      // Left section - Profile
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, 400, 600);

      // Profile image placeholder
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(200, 200, 80, 0, Math.PI * 2);
      ctx.fill();

      // Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(card.full_name, 200, 320);

      // Title
      ctx.font = '24px Arial';
      ctx.fillStyle = '#D4AF37';
      ctx.fillText(card.title, 200, 360);

      // Right section - Details
      ctx.textAlign = 'left';
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Arial';
      let yPos = 150;

      if (card.company) {
        ctx.fillText(`Company: ${card.company}`, 450, yPos);
        yPos += 40;
      }
      if (card.email) {
        ctx.fillText(`Email: ${card.email}`, 450, yPos);
        yPos += 40;
      }
      if (card.phone) {
        ctx.fillText(`Phone: ${card.phone}`, 450, yPos);
        yPos += 40;
      }

      // QR Code
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, card.qr_data, {
        width: 150,
        margin: 0,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      ctx.drawImage(qrCanvas, 780, 380);

      // Download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `id-card-${card.full_name.replace(/\s+/g, '-').toLowerCase()}.png`;
          a.click();
          URL.revokeObjectURL(url);
          toast.success('ID Card downloaded!');
        }
      });
    } catch (error) {
      console.error('Error downloading ID card:', error);
      toast.error('Failed to download ID card');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading ID cards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">
              <span className="text-gradient-gold">ID Cards</span>
            </h1>
          </div>
          
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New ID Card
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10">
        {idCards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
              <QrCode className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No ID cards yet</h2>
            <p className="text-muted-foreground mb-6">
              Create compact digital ID cards with QR codes
            </p>
            <Button size="lg" onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Create Your First ID Card
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {idCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Horizontal ID Card Preview */}
                <Card className="overflow-hidden">
                  <div 
                    className="flex items-stretch h-64"
                    style={{
                      background: `linear-gradient(135deg, ${card.card_color}, #1a1a1a)`
                    }}
                  >
                    {/* Left Section - Profile */}
                    <div className="w-1/3 bg-white/10 backdrop-blur-sm p-8 flex flex-col items-center justify-center text-white">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center ring-4 ring-white/20 mb-4">
                        {card.profile_image ? (
                          <img 
                            src={card.profile_image} 
                            alt={card.full_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl font-bold">
                            {card.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-xl text-center mb-1">{card.full_name}</h3>
                      <p className="text-primary text-sm">{card.title}</p>
                      {card.company && (
                        <p className="text-white/60 text-xs mt-2">{card.company}</p>
                      )}
                    </div>

                    {/* Middle Section - Details */}
                    <div className="flex-1 p-8 text-white space-y-3">
                      <div className="space-y-2">
                        {card.email && (
                          <div className="text-sm">
                            <span className="text-white/60">Email:</span> {card.email}
                          </div>
                        )}
                        {card.phone && (
                          <div className="text-sm">
                            <span className="text-white/60">Phone:</span> {card.phone}
                          </div>
                        )}
                        {card.website && (
                          <div className="text-sm">
                            <span className="text-white/60">Website:</span> {card.website}
                          </div>
                        )}
                        
                        {/* YouTube Info */}
                        {card.type === 'youtube' && card.youtube_channel_name && (
                          <>
                            <div className="text-sm mt-4">
                              <span className="text-white/60">Channel:</span> {card.youtube_channel_name}
                            </div>
                            {card.youtube_subscribers && (
                              <div className="text-sm">
                                <span className="text-white/60">Subscribers:</span> {card.youtube_subscribers}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Right Section - QR Code */}
                    <div className="w-64 bg-white p-6 flex flex-col items-center justify-center">
                      <div className="bg-white p-3 rounded-lg">
                        <img 
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(card.qr_data)}`}
                          alt="QR Code"
                          className="w-36 h-36"
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        Scan to view card
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-border/50 p-4 bg-secondary/30 flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => downloadIDCard(card)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(card.qr_data);
                        toast.success('Link copied!');
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(card.qr_data, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <div className="flex-1" />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IDCards;
