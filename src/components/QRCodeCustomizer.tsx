/**
 * QR Code Customization Component
 * Allows users to customize QR code styles similar to wcard.io
 */

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Download, RefreshCw } from 'lucide-react';
import { 
  generateCardQRCode, 
  generateCardQRCodeWithLogo,
  downloadQRCode,
  QRCodeStyle,
  QR_STYLE_PRESETS 
} from '@/lib/qr-generator';
import { motion } from 'framer-motion';

interface QRCodeCustomizerProps {
  username: string;
  onQRCodeGenerated?: (qrCode: string) => void;
}

export const QRCodeCustomizer = ({ username, onQRCodeGenerated }: QRCodeCustomizerProps) => {
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState<Partial<QRCodeStyle>>({
    size: 300,
    margin: 4,
    foreground: '#000000',
    background: '#ffffff',
    errorCorrectionLevel: 'H',
  });

  const generateQR = async () => {
    setLoading(true);
    try {
      const qr = style.logo 
        ? await generateCardQRCodeWithLogo(username, window.location.origin, style)
        : await generateCardQRCode(username, window.location.origin, style);
      
      setQrCode(qr);
      onQRCodeGenerated?.(qr);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateQR();
  }, [username, style]);

  const applyPreset = (presetName: keyof typeof QR_STYLE_PRESETS) => {
    setStyle(prev => ({
      ...prev,
      ...QR_STYLE_PRESETS[presetName],
    }));
  };

  const handleDownload = () => {
    if (qrCode) {
      downloadQRCode(qrCode, `${username}-qr-code`);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
        </TabsList>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          <Card className="p-8 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 rounded-2xl">
            <div className="flex flex-col items-center gap-6">
              <h3 className="text-2xl font-bold">Your QR Code</h3>
              
              {loading ? (
                <div className="w-[300px] h-[300px] flex items-center justify-center bg-secondary/20 rounded-xl">
                  <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : qrCode ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <img 
                    src={qrCode} 
                    alt="QR Code" 
                    className="rounded-xl shadow-2xl border-4 border-border/50"
                    style={{ 
                      width: style.size, 
                      height: style.size 
                    }}
                  />
                </motion.div>
              ) : null}

              <div className="flex gap-3">
                <Button onClick={generateQR} variant="outline" disabled={loading}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button onClick={handleDownload} variant="gold" disabled={!qrCode}>
                  <Download className="w-4 h-4 mr-2" />
                  Download QR Code
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Share this QR code to let people quickly access your digital card
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Customize Tab */}
        <TabsContent value="customize" className="space-y-4">
          <Card className="p-6 space-y-6">
            {/* Size */}
            <div className="space-y-3">
              <Label>Size: {style.size}px</Label>
              <Slider
                value={[style.size || 300]}
                onValueChange={([value]) => setStyle(prev => ({ ...prev, size: value }))}
                min={200}
                max={600}
                step={50}
                className="w-full"
              />
            </div>

            {/* Margin */}
            <div className="space-y-3">
              <Label>Margin: {style.margin}</Label>
              <Slider
                value={[style.margin || 4]}
                onValueChange={([value]) => setStyle(prev => ({ ...prev, margin: value }))}
                min={0}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            {/* Foreground Color */}
            <div className="space-y-3">
              <Label>Foreground Color</Label>
              <div className="flex gap-3">
                <Input
                  type="color"
                  value={style.foreground || '#000000'}
                  onChange={(e) => setStyle(prev => ({ ...prev, foreground: e.target.value }))}
                  className="w-20 h-12"
                />
                <Input
                  type="text"
                  value={style.foreground || '#000000'}
                  onChange={(e) => setStyle(prev => ({ ...prev, foreground: e.target.value }))}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Background Color */}
            <div className="space-y-3">
              <Label>Background Color</Label>
              <div className="flex gap-3">
                <Input
                  type="color"
                  value={style.background || '#ffffff'}
                  onChange={(e) => setStyle(prev => ({ ...prev, background: e.target.value }))}
                  className="w-20 h-12"
                />
                <Input
                  type="text"
                  value={style.background || '#ffffff'}
                  onChange={(e) => setStyle(prev => ({ ...prev, background: e.target.value }))}
                  placeholder="#ffffff"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Error Correction Level */}
            <div className="space-y-3">
              <Label>Error Correction Level</Label>
              <div className="grid grid-cols-4 gap-2">
                {(['L', 'M', 'Q', 'H'] as const).map((level) => (
                  <Button
                    key={level}
                    variant={style.errorCorrectionLevel === level ? 'default' : 'outline'}
                    onClick={() => setStyle(prev => ({ ...prev, errorCorrectionLevel: level }))}
                    className="w-full"
                  >
                    {level}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Higher levels = more error resistance but denser QR code
              </p>
            </div>

            {/* Logo URL */}
            <div className="space-y-3">
              <Label>Logo URL (optional)</Label>
              <Input
                type="url"
                value={style.logo || ''}
                onChange={(e) => setStyle(prev => ({ ...prev, logo: e.target.value }))}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-muted-foreground">
                Add your logo in the center of the QR code
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Presets Tab */}
        <TabsContent value="presets" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(QR_STYLE_PRESETS).map(([name, preset]) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:border-primary/50 transition-all"
                  onClick={() => applyPreset(name as keyof typeof QR_STYLE_PRESETS)}
                >
                  <div className="space-y-3">
                    <div 
                      className="w-full aspect-square rounded-lg border-2 flex items-center justify-center"
                      style={{
                        backgroundColor: preset.background,
                        borderColor: preset.foreground,
                      }}
                    >
                      <div 
                        className="w-3/4 h-3/4 grid grid-cols-3 gap-1"
                      >
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className={`${
                              preset.dotStyle === 'rounded' ? 'rounded-md' :
                              preset.dotStyle === 'dots' ? 'rounded-full' : ''
                            }`}
                            style={{ backgroundColor: preset.foreground }}
                          />
                        ))}
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-center capitalize">
                      {name}
                    </h4>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QRCodeCustomizer;
