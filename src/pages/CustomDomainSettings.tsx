/**
 * Custom Domain Settings Page
 * Allows users to configure custom domains for their cards
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Globe,
  Check,
  X,
  AlertCircle,
  Copy,
  ExternalLink,
  ArrowLeft,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface CustomDomain {
  id: string;
  domain: string;
  verified: boolean;
  verification_token: string;
  dns_configured: boolean;
  ssl_enabled: boolean;
}

const CustomDomainSettings = () => {
  const navigate = useNavigate();
  const { cardId } = useParams<{ cardId: string }>();
  const { user } = useAuth();
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [customDomain, setCustomDomain] = useState<CustomDomain | null>(null);
  const [checkingDNS, setCheckingDNS] = useState(false);

  useEffect(() => {
    loadCustomDomain();
  }, [cardId]);

  const loadCustomDomain = async () => {
    if (!cardId) return;

    try {
      const response = await fetch(`/api/custom-domain/${cardId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.domain) {
          setCustomDomain(data.domain);
          setDomain(data.domain.domain);
        }
      }
    } catch (error) {
      console.error('Error loading custom domain:', error);
    }
  };

  const addCustomDomain = async () => {
    if (!domain.trim()) {
      toast.error('Please enter a domain name');
      return;
    }

    // Validate domain format
    const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;
    if (!domainRegex.test(domain)) {
      toast.error('Please enter a valid domain (e.g., mycard.example.com)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/custom-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          cardId,
          domain: domain.toLowerCase().trim()
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add custom domain');
      }

      const data = await response.json();
      setCustomDomain(data.domain);
      
      toast.success('Custom domain added!', {
        description: 'Follow the instructions below to verify your domain'
      });
    } catch (error: any) {
      console.error('Error adding custom domain:', error);
      toast.error(error.message || 'Failed to add custom domain');
    } finally {
      setLoading(false);
    }
  };

  const checkDNSConfiguration = async () => {
    if (!customDomain) return;

    setCheckingDNS(true);

    try {
      const response = await fetch(`/api/custom-domain/verify/${customDomain.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to verify DNS');
      }

      const data = await response.json();
      
      if (data.verified) {
        setCustomDomain({ ...customDomain, verified: true, dns_configured: true });
        toast.success('Domain verified!', {
          description: 'Your custom domain is now active'
        });
      } else {
        toast.warning('DNS not configured yet', {
          description: 'Please check your DNS settings and try again in a few minutes'
        });
      }
    } catch (error) {
      console.error('Error checking DNS:', error);
      toast.error('Failed to verify DNS configuration');
    } finally {
      setCheckingDNS(false);
    }
  };

  const removeCustomDomain = async () => {
    if (!customDomain || !confirm('Are you sure you want to remove this custom domain?')) {
      return;
    }

    try {
      const response = await fetch(`/api/custom-domain/${customDomain.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove custom domain');
      }

      setCustomDomain(null);
      setDomain('');
      toast.success('Custom domain removed');
    } catch (error) {
      console.error('Error removing custom domain:', error);
      toast.error('Failed to remove custom domain');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

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
              <span className="text-gradient-gold">Custom Domain</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Info Card */}
          <Alert>
            <Globe className="h-4 w-4" />
            <AlertTitle>Custom Domain for Your Card</AlertTitle>
            <AlertDescription>
              Use your own domain (e.g., card.yourdomain.com) instead of the default subdomain.
              This makes your digital card more professional and memorable.
            </AlertDescription>
          </Alert>

          {/* Add Domain Section */}
          {!customDomain && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add Your Custom Domain</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="domain">Domain Name</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="card.yourdomain.com"
                      className="flex-1"
                    />
                    <Button onClick={addCustomDomain} disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        'Add Domain'
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Enter a subdomain like card.yourdomain.com or www.yourdomain.com
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Domain Configuration */}
          {customDomain && (
            <>
              {/* Status Card */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{customDomain.domain}</h2>
                    <div className="flex items-center gap-2">
                      {customDomain.verified ? (
                        <span className="flex items-center gap-1 text-sm text-green-500">
                          <CheckCircle2 className="w-4 h-4" />
                          Verified & Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-yellow-500">
                          <AlertCircle className="w-4 h-4" />
                          Pending Verification
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={checkDNSConfiguration}
                      disabled={checkingDNS || customDomain.verified}
                    >
                      {checkingDNS ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        'Verify DNS'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={removeCustomDomain}
                      className="text-red-500"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                {!customDomain.verified && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>DNS Configuration Required</AlertTitle>
                    <AlertDescription>
                      Add the following DNS records to your domain provider to verify ownership
                    </AlertDescription>
                  </Alert>
                )}
              </Card>

              {/* DNS Instructions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">DNS Configuration</h3>
                <div className="space-y-4">
                  {/* CNAME Record */}
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">CNAME Record</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('cname.vercel-dns.com')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Type</div>
                        <div className="font-mono">CNAME</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Name</div>
                        <div className="font-mono">{customDomain.domain.split('.')[0]}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Value</div>
                        <div className="font-mono">cname.vercel-dns.com</div>
                      </div>
                    </div>
                  </div>

                  {/* TXT Record for Verification */}
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">TXT Record (Verification)</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(customDomain.verification_token)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Type</div>
                        <div className="font-mono">TXT</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Name</div>
                        <div className="font-mono">_vercel</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Value</div>
                        <div className="font-mono text-xs break-all">
                          {customDomain.verification_token}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Important Notes
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                    <li>DNS changes can take up to 48 hours to propagate</li>
                    <li>SSL certificate will be automatically provisioned after verification</li>
                    <li>Your card will be accessible at both the custom domain and default URL</li>
                  </ul>
                </div>
              </Card>

              {/* Preview Card */}
              {customDomain.verified && (
                <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Your Card is Live! 🎉</h3>
                      <p className="text-muted-foreground">
                        Visit your card at your custom domain
                      </p>
                    </div>
                    <Button
                      onClick={() => window.open(`https://${customDomain.domain}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Card
                    </Button>
                  </div>
                </Card>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomDomainSettings;
