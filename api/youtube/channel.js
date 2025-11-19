/**
 * Vercel Serverless API - YouTube Channel Data Fetcher
 * Endpoint: POST /api/youtube/channel
 * Fetches channel details from YouTube Data API v3
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { channelId } = req.body;

  if (!channelId) {
    return res.status(400).json({ error: 'Channel ID is required' });
  }

  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    
    if (!YOUTUBE_API_KEY) {
      // Return mock data if API key not configured
      return res.status(200).json({
        channel: {
          id: channelId,
          name: 'Sample YouTube Channel',
          customUrl: '@' + channelId,
          description: 'This is a sample channel',
          thumbnailUrl: '',
          bannerUrl: '',
          subscriberCount: '1.2M',
          videoCount: '532',
          viewCount: '125M',
        }
      });
    }

    // Fetch channel data from YouTube API
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from YouTube API');
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const channelInfo = data.items[0];
    const snippet = channelInfo.snippet;
    const statistics = channelInfo.statistics;
    const branding = channelInfo.brandingSettings;

    // Format subscriber count
    const formatCount = (count) => {
      const num = parseInt(count);
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    };

    const channelData = {
      id: channelInfo.id,
      name: snippet.title,
      customUrl: snippet.customUrl || '@' + snippet.title.toLowerCase().replace(/\s+/g, ''),
      description: snippet.description,
      thumbnailUrl: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
      bannerUrl: branding?.image?.bannerExternalUrl || '',
      subscriberCount: formatCount(statistics.subscriberCount),
      videoCount: parseInt(statistics.videoCount).toLocaleString(),
      viewCount: formatCount(statistics.viewCount),
    };

    res.status(200).json({ channel: channelData });
  } catch (error) {
    console.error('Error fetching YouTube channel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
