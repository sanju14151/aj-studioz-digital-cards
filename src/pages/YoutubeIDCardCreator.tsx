/**
 * YouTube Channel ID Card Creator
 * Auto-fetches channel details from YouTube API
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Youtube,
  Loader2,
  CheckCircle,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { toast } from 'sonner';

interface YouTubeChannelData {
  id: string;
  name: string;
  customUrl: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl: string;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

const YoutubeIDCardCreator = () => {
  const [channelInput, setChannelInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [channelData, setChannelData] = useState<YouTubeChannelData | null>(null);

  const fetchYouTubeChannel = async () => {
    if (!channelInput.trim()) {
      toast.error('Please enter a YouTube channel URL or ID');
      return;
    }

    setLoading(true);

    try {
      // Extract channel ID from various YouTube URL formats
      let channelId = channelInput;
      
      if (channelInput.includes('youtube.com/channel/')) {
        channelId = channelInput.split('youtube.com/channel/')[1].split('/')[0].split('?')[0];
      } else if (channelInput.includes('youtube.com/@')) {
        // Handle @username format
        const username = channelInput.split('youtube.com/@')[1].split('/')[0].split('?')[0];
        // In production, convert username to channel ID via API
        channelId = username;
      } else if (channelInput.includes('youtube.com/c/')) {
        channelId = channelInput.split('youtube.com/c/')[1].split('/')[0].split('?')[0];
      }

      // Call our API endpoint to fetch YouTube data
      const response = await fetch('/api/youtube/channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch channel data');
      }

      const data = await response.json();
      setChannelData(data.channel);
      toast.success('Channel data fetched successfully!');
    } catch (error) {
      console.error('Error fetching YouTube channel:', error);
      toast.error('Failed to fetch channel data. Please check the URL/ID and try again.');
      
      // Mock data for demo purposes
      setChannelData({
        id: 'UCxxxxxx',
        name: 'Sample YouTube Channel',
        customUrl: '@samplechannel',
        description: 'This is a sample YouTube channel description',
        thumbnailUrl: '',
        bannerUrl: '',
        subscriberCount: '1.2M',
        videoCount: '532',
        viewCount: '125M',
      });
    } finally {
      setLoading(false);
    }
  };

  const createIDCard = async () => {
    if (!channelData) return;

    try {
      const response = await fetch('/api/id-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          type: 'youtube',
          full_name: channelData.name,
          title: 'YouTube Content Creator',
          youtube_channel_id: channelData.id,
          youtube_channel_name: channelData.name,
          youtube_subscribers: channelData.subscriberCount,
          youtube_thumbnail: channelData.thumbnailUrl,
          qr_data: `https://youtube.com/channel/${channelData.id}`,
          card_color: '#FF0000', // YouTube red
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create ID card');
      }

      toast.success('YouTube ID Card created!');
      // Redirect to ID cards page
      window.location.href = '/dashboard/id-cards';
    } catch (error) {
      console.error('Error creating ID card:', error);
      toast.error('Failed to create ID card');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Youtube className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold mb-2">YouTube Channel ID Card</h1>
          <p className="text-muted-foreground">
            Enter a YouTube channel URL or ID to auto-fetch details and create an ID card
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="channelInput">YouTube Channel URL or ID</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="channelInput"
                  value={channelInput}
                  onChange={(e) => setChannelInput(e.target.value)}
                  placeholder="https://youtube.com/@channel or channel ID"
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && fetchYouTubeChannel()}
                />
                <Button 
                  onClick={fetchYouTubeChannel}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Fetching...
                    </>
                  ) : (
                    'Fetch Channel'
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: youtube.com/@username, youtube.com/channel/ID, or just the channel ID
              </p>
            </div>
          </div>
        </Card>

        {/* Preview Section */}
        {channelData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              {/* Channel Info */}
              <div className="p-6 bg-gradient-to-r from-red-500/20 to-red-600/20">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl font-bold">
                    {channelData.thumbnailUrl ? (
                      <img 
                        src={channelData.thumbnailUrl} 
                        alt={channelData.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      channelData.name[0]
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold">{channelData.name}</h2>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <p className="text-muted-foreground mb-2">{channelData.customUrl}</p>
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="font-bold">{channelData.subscriberCount}</span>
                        <span className="text-muted-foreground"> subscribers</span>
                      </div>
                      <div>
                        <span className="font-bold">{channelData.videoCount}</span>
                        <span className="text-muted-foreground"> videos</span>
                      </div>
                      <div>
                        <span className="font-bold">{channelData.viewCount}</span>
                        <span className="text-muted-foreground"> views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ID Card Preview */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">ID Card Preview</h3>
                <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl overflow-hidden">
                  <div className="flex items-stretch h-64">
                    {/* Left - Channel Info */}
                    <div className="w-1/3 bg-white/10 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-white">
                      <Youtube className="w-12 h-12 mb-3" />
                      <h4 className="font-bold text-lg text-center mb-1">{channelData.name}</h4>
                      <p className="text-xs opacity-80">{channelData.customUrl}</p>
                      <div className="mt-4 text-center">
                        <div className="text-2xl font-bold">{channelData.subscriberCount}</div>
                        <div className="text-xs opacity-60">SUBSCRIBERS</div>
                      </div>
                    </div>

                    {/* Middle - Stats */}
                    <div className="flex-1 p-6 text-white flex flex-col justify-center space-y-3">
                      <div>
                        <div className="text-sm opacity-60">Total Videos</div>
                        <div className="text-xl font-bold">{channelData.videoCount}</div>
                      </div>
                      <div>
                        <div className="text-sm opacity-60">Total Views</div>
                        <div className="text-xl font-bold">{channelData.viewCount}</div>
                      </div>
                      <div className="mt-4">
                        <div className="text-xs opacity-60">YouTube Content Creator</div>
                      </div>
                    </div>

                    {/* Right - QR Code */}
                    <div className="w-48 bg-white p-4 flex flex-col items-center justify-center">
                      <QrCode className="w-32 h-32 text-gray-400 mb-2" />
                      <p className="text-xs text-center text-muted-foreground">
                        Scan to visit channel
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-border/50 p-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setChannelData(null)}>
                  Cancel
                </Button>
                <Button onClick={createIDCard}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create ID Card
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default YoutubeIDCardCreator;
