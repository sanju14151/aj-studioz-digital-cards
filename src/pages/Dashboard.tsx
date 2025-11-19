/**
 * Dashboard Page - Web Cards Management
 * Shows all user's cards with real analytics
 */

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Edit, 
  Eye, 
  Share2, 
  TrendingUp, 
  MousePointerClick,
  Download,
  QrCode,
  Calendar,
  MoreVertical,
  Trash2,
  Copy,
  ExternalLink,
  Globe,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import QRCode from 'qrcode';

interface CardStats {
  views: number;
  clicks: number;
  saves: number;
}

interface UserCard {
  id: string;
  username: string;
  full_name: string;
  role?: string;
  profile_image?: string;
  is_active: boolean;
  created_at: string;
  stats: CardStats;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cards, setCards] = useState<UserCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasIncompleteCard, setHasIncompleteCard] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedCardForQR, setSelectedCardForQR] = useState<UserCard | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    loadUserCards();
  }, [user]);

  const loadUserCards = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      setLoading(true);
      
      // Fetch user's cards with analytics
      const response = await fetch(`/api/cards/user/${user.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }

      const data = await response.json();
      const userCards = data.cards || [];
      setCards(userCards);
      
      // Check if user has incomplete card (missing profile image, role, or bio)
      const incomplete = userCards.some((card: UserCard) => 
        !card.profile_image || !card.role || card.role.length < 3
      );
      setHasIncompleteCard(incomplete && userCards.length > 0);
    } catch (error) {
      console.error('Error loading cards:', error);
      toast.error('Failed to load cards');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCard = (username: string) => {
    window.open(`/${username}`, '_blank');
  };

  const handleEditCard = (cardId: string) => {
    navigate(`/builder?cardId=${cardId}`);
  };

  const handleShareCard = async (username: string) => {
    const url = `${window.location.origin}/${username}`;
    
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied!', {
        description: 'Card link copied to clipboard'
      });
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Are you sure you want to delete this card?')) {
      return;
    }

    try {
      const response = await fetch(`/api/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete card');
      }

      toast.success('Card deleted successfully');
      loadUserCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete card');
    }
  };

  const handleShowQRCode = async (card: UserCard) => {
    setSelectedCardForQR(card);
    setQrModalOpen(true);
    
    // Generate QR code after modal opens
    setTimeout(async () => {
      if (qrCanvasRef.current) {
        const url = `${window.location.origin}/${card.username}`;
        try {
          await QRCode.toCanvas(qrCanvasRef.current, url, {
            width: 300,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#ffffff',
            },
          });
        } catch (error) {
          console.error('Error generating QR code:', error);
          toast.error('Failed to generate QR code');
        }
      }
    }, 100);
  };

  const handleDownloadQR = () => {
    if (qrCanvasRef.current && selectedCardForQR) {
      const url = qrCanvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${selectedCardForQR.username}-qr-code.png`;
      link.href = url;
      link.click();
      toast.success('QR code downloaded!');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your cards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-40 bg-background/80">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">
              <span className="text-gradient-gold">Web Cards</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/dashboard/id-cards')}>
              <QrCode className="w-4 h-4 mr-2" />
              ID Cards
            </Button>
            <Button variant="outline" onClick={() => navigate('/templates')}>
              <Eye className="w-4 h-4 mr-2" />
              Templates
            </Button>
            <Button onClick={() => navigate('/builder')}>
              <Plus className="w-4 h-4 mr-2" />
              New Card
            </Button>
          </div>
        </div>
      </header>

        <div className="container mx-auto px-6 py-10">
          {/* Incomplete Card Alert */}
          {hasIncompleteCard && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Alert className="border-amber-500/50 bg-amber-500/10">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <AlertTitle className="text-amber-500">Complete Your First Card</AlertTitle>
                <AlertDescription className="text-muted-foreground">
                  Your card is incomplete! Add a profile picture, role, and bio to make it shine.
                  <Button 
                    variant="link" 
                    className="text-amber-500 pl-1 h-auto p-0"
                    onClick={() => cards.length > 0 && handleEditCard(cards[0].id)}
                  >
                    Complete now →
                  </Button>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {cards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-6">
              <Plus className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No cards yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first digital business card to get started
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="outline" onClick={() => navigate('/templates')}>
                <Eye className="w-5 h-5 mr-2" />
                Browse Templates
              </Button>
              <Button size="lg" onClick={() => navigate('/builder')}>
                <Plus className="w-5 h-5 mr-2" />
                Create From Scratch
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 hover:border-primary/50 transition-all">
                  {/* Card Preview */}
                  <div className="relative mb-6 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl p-6 aspect-[16/10]">
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                      {/* Profile Image */}
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center ring-2 ring-primary/20">
                        {card.profile_image ? (
                          <img 
                            src={card.profile_image} 
                            alt={card.full_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xl font-bold text-primary-foreground">
                            {card.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Name & Role */}
                      <div>
                        <h3 className="font-bold text-lg">{card.full_name}</h3>
                        {card.role && (
                          <p className="text-sm text-muted-foreground">{card.role}</p>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          card.is_active 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-gray-500/20 text-gray-500'
                        }`}>
                          {card.is_active ? '● Published' : '○ Draft'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                        <Eye className="w-3 h-3" />
                        Views
                      </div>
                      <div className="text-xl font-bold">{card.stats.views.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                        <MousePointerClick className="w-3 h-3" />
                        Clicks
                      </div>
                      <div className="text-xl font-bold">{card.stats.clicks.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
                        <Download className="w-3 h-3" />
                        Saves
                      </div>
                      <div className="text-xl font-bold">{card.stats.saves.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    {formatDate(card.created_at)}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditCard(card.id)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewCard(card.username)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShowQRCode(card)}
                    >
                      <QrCode className="w-4 h-4" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewCard(card.username)}>
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Card
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShareCard(card.username)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleShowQRCode(card)}>
                          <QrCode className="w-4 h-4 mr-2" />
                          QR Code
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/analytics/${card.id}`)}>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/settings/custom-domain/${card.id}`)}>
                          <Globe className="w-4 h-4 mr-2" />
                          Custom Domain
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* QR Code Modal */}
      <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Code for {selectedCardForQR?.full_name}
            </DialogTitle>
            <DialogDescription>
              Scan this QR code to view the card on any device
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4 py-4">
            {/* QR Code Canvas */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <canvas ref={qrCanvasRef} />
            </div>

            {/* Card URL */}
            <div className="w-full p-3 bg-secondary rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-1">Card URL</p>
              <p className="text-sm font-mono font-semibold">
                {window.location.origin}/{selectedCardForQR?.username}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 w-full">
              <Button 
                onClick={handleDownloadQR} 
                className="flex-1"
                variant="default"
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR
              </Button>
              <Button 
                onClick={() => selectedCardForQR && handleShareCard(selectedCardForQR.username)} 
                className="flex-1"
                variant="outline"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </div>

            {/* Instructions */}
            <div className="w-full p-3 bg-primary/10 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                Print this QR code on business cards, flyers, or anywhere you want to share your digital card
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
