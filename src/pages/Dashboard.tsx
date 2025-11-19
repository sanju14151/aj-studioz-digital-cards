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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<UserCard | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [qrStyle, setQrStyle] = useState<'burgundy' | 'purple' | 'dark'>('burgundy');

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

  const handleDeleteCard = (card: UserCard) => {
    setCardToDelete(card);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!cardToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/cards/delete/${cardToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete card');
      }

      toast.success('Card deleted successfully', {
        description: `${cardToDelete.full_name}'s card has been removed`
      });
      setDeleteModalOpen(false);
      setCardToDelete(null);
      loadUserCards();
    } catch (error) {
      console.error('Error deleting card:', error);
      toast.error('Failed to delete card', {
        description: 'Please try again later'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const generateQRCode = async (style: 'burgundy' | 'purple' | 'dark') => {
    if (!qrCanvasRef.current || !selectedCardForQR) return;
    
    const url = `${window.location.origin}/${selectedCardForQR.username}`;
    const colors = {
      burgundy: { dark: '#6B2C49', light: '#FFFFFF' },
      purple: { dark: '#8B2C8B', light: '#FFFFFF' },
      dark: { dark: '#2C2C2C', light: '#FFFFFF' },
    };

    try {
      // Generate more compact QR with less margin
      await QRCode.toCanvas(qrCanvasRef.current, url, {
        width: 350,
        margin: 1,
        color: colors[style],
        errorCorrectionLevel: 'H',
      });

      // Add logo perfectly centered
      const canvas = qrCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const logoSize = 70;
        const bgSize = logoSize + 16;
        
        // Create white rounded square background
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(centerX - bgSize / 2, centerY - bgSize / 2, bgSize, bgSize, 8);
        ctx.fill();

        // Load and draw logo centered
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.onload = () => {
          ctx.drawImage(logo, centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
        };
        logo.src = '/AJ.svg';
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code');
    }
  };  const handleShowQRCode = async (card: UserCard) => {
    setSelectedCardForQR(card);
    setQrModalOpen(true);
    setTimeout(() => generateQRCode(qrStyle), 100);
  };

  const handleQRStyleChange = (style: 'burgundy' | 'purple' | 'dark') => {
    setQrStyle(style);
    generateQRCode(style);
  };

  const handleDownloadQR = () => {
    if (qrCanvasRef.current && selectedCardForQR) {
      // Create a new canvas with styling text
      const originalCanvas = qrCanvasRef.current;
      const styledCanvas = document.createElement('canvas');
      const padding = 40;
      const textHeight = 60;
      
      styledCanvas.width = originalCanvas.width + (padding * 2);
      styledCanvas.height = originalCanvas.height + (padding * 2) + textHeight;
      
      const ctx = styledCanvas.getContext('2d');
      if (ctx) {
        // White background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, styledCanvas.width, styledCanvas.height);
        
        // Draw QR code
        ctx.drawImage(originalCanvas, padding, padding);
        
        // Add "QR CODE STYLING" text at bottom
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR CODE', styledCanvas.width / 2, originalCanvas.height + padding + 25);
        ctx.fillText('STYLING', styledCanvas.width / 2, originalCanvas.height + padding + 50);
        
        // Download
        const url = styledCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${selectedCardForQR.username}-qr-code.png`;
        link.href = url;
        link.click();
        toast.success('QR code downloaded!');
      }
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
                          onClick={() => handleDeleteCard(card)}
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
            {/* QR Style Selector */}
            <div className="w-full">
              <p className="text-sm font-semibold mb-2 text-center">Choose QR Style</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleQRStyleChange('burgundy')}
                  className={`p-3 rounded-lg border-2 transition-all ${qrStyle === 'burgundy' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                >
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-md mb-1"></div>
                  <p className="text-xs font-medium">Burgundy</p>
                </button>
                <button
                  onClick={() => handleQRStyleChange('purple')}
                  className={`p-3 rounded-lg border-2 transition-all ${qrStyle === 'purple' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                >
                  <div className="w-full aspect-square bg-gradient-to-br from-purple-500 to-purple-700 rounded-md mb-1"></div>
                  <p className="text-xs font-medium">Purple</p>
                </button>
                <button
                  onClick={() => handleQRStyleChange('dark')}
                  className={`p-3 rounded-lg border-2 transition-all ${qrStyle === 'dark' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}`}
                >
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-md mb-1"></div>
                  <p className="text-xs font-medium">Dark</p>
                </button>
              </div>
            </div>

            {/* QR Code Canvas with Styling */}
            <div className="bg-white p-6 rounded-2xl shadow-2xl border-4 border-gray-100">
              <canvas ref={qrCanvasRef} className="rounded-lg" />
              <div className="mt-3 text-center">
                <p className="text-xs font-bold text-gray-800 tracking-wider">QR CODE</p>
                <p className="text-xs font-bold text-gray-800 tracking-wider">STYLING</p>
              </div>
            </div>

            {/* Card URL */}
            <div className="w-full p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-center border border-purple-200">
              <p className="text-xs text-purple-700 font-semibold mb-1">Scan to visit</p>
              <p className="text-sm font-mono font-bold text-purple-900">
                {window.location.origin.replace('https://', '')}/{selectedCardForQR?.username}
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

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <AlertCircle className="w-5 h-5" />
              Delete Card?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the card and all associated data.
            </DialogDescription>
          </DialogHeader>
          
          {cardToDelete && (
            <div className="py-4">
              {/* Card Preview */}
              <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                  {cardToDelete.profile_image ? (
                    <img 
                      src={cardToDelete.profile_image} 
                      alt={cardToDelete.full_name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-primary-foreground">
                      {cardToDelete.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{cardToDelete.full_name}</h4>
                  {cardToDelete.role && (
                    <p className="text-sm text-muted-foreground truncate">{cardToDelete.role}</p>
                  )}
                  <p className="text-xs text-muted-foreground">@{cardToDelete.username}</p>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-600 dark:text-red-400">
                  <strong>Warning:</strong> You will lose all analytics data, social links, and card views associated with this card.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => setDeleteModalOpen(false)} 
                  variant="outline"
                  className="flex-1"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmDelete}
                  variant="destructive"
                  className="flex-1"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Card
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
