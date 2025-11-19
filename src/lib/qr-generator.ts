/**
 * QR Code Generator with Customizable Styles
 * Similar to wcard.io QR code features
 */

import QRCodeLib from 'qrcode';

export interface QRCodeStyle {
  // Basic settings
  size: number;
  margin: number;
  
  // Color customization
  foreground: string;
  background: string;
  
  // Error correction level
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  
  // Style options
  dotStyle: 'square' | 'rounded' | 'dots' | 'classy';
  cornerSquareStyle: 'square' | 'rounded' | 'extra-rounded';
  cornerDotStyle: 'square' | 'rounded' | 'dot';
  
  // Logo/Image in center
  logo?: string;
  logoSize?: number;
  logoMargin?: number;
}

const defaultQRStyle: QRCodeStyle = {
  size: 300,
  margin: 4,
  foreground: '#000000',
  background: '#ffffff',
  errorCorrectionLevel: 'H',
  dotStyle: 'square',
  cornerSquareStyle: 'square',
  cornerDotStyle: 'square',
  logoSize: 60,
  logoMargin: 10,
};

export const generateQRCode = async (
  data: string,
  style: Partial<QRCodeStyle> = {}
): Promise<string> => {
  const finalStyle = { ...defaultQRStyle, ...style };
  
  try {
    const qrCode = await QRCodeLib.toDataURL(data, {
      width: finalStyle.size,
      margin: finalStyle.margin,
      color: {
        dark: finalStyle.foreground,
        light: finalStyle.background,
      },
      errorCorrectionLevel: finalStyle.errorCorrectionLevel,
    });
    
    return qrCode;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

export const generateQRCodeWithLogo = async (
  data: string,
  style: Partial<QRCodeStyle> = {}
): Promise<string> => {
  const finalStyle = { ...defaultQRStyle, ...style };
  
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }
    
    canvas.width = finalStyle.size;
    canvas.height = finalStyle.size;
    
    // Generate base QR code
    QRCodeLib.toCanvas(canvas, data, {
      width: finalStyle.size,
      margin: finalStyle.margin,
      color: {
        dark: finalStyle.foreground,
        light: finalStyle.background,
      },
      errorCorrectionLevel: finalStyle.errorCorrectionLevel,
    }, (error) => {
      if (error) {
        reject(error);
        return;
      }
      
      // Add logo if provided
      if (finalStyle.logo) {
        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        
        logo.onload = () => {
          const logoSize = finalStyle.logoSize || 60;
          const logoMargin = finalStyle.logoMargin || 10;
          const logoPos = (finalStyle.size - logoSize) / 2;
          
          // Draw white background for logo
          ctx.fillStyle = finalStyle.background;
          ctx.fillRect(
            logoPos - logoMargin,
            logoPos - logoMargin,
            logoSize + logoMargin * 2,
            logoSize + logoMargin * 2
          );
          
          // Draw logo
          ctx.drawImage(logo, logoPos, logoPos, logoSize, logoSize);
          
          resolve(canvas.toDataURL());
        };
        
        logo.onerror = () => {
          // If logo fails, return QR without logo
          resolve(canvas.toDataURL());
        };
        
        logo.src = finalStyle.logo;
      } else {
        resolve(canvas.toDataURL());
      }
    });
  });
};

export const downloadQRCode = (
  qrCodeDataUrl: string,
  filename: string = 'qr-code'
): void => {
  const link = document.createElement('a');
  link.href = qrCodeDataUrl;
  link.download = `${filename}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generateCardQRCode = async (
  username: string,
  baseUrl: string = window.location.origin,
  style: Partial<QRCodeStyle> = {}
): Promise<string> => {
  const cardUrl = `${baseUrl}/${username}`;
  return generateQRCode(cardUrl, style);
};

export const generateCardQRCodeWithLogo = async (
  username: string,
  baseUrl: string = window.location.origin,
  style: Partial<QRCodeStyle> = {}
): Promise<string> => {
  const cardUrl = `${baseUrl}/${username}`;
  return generateQRCodeWithLogo(cardUrl, style);
};

// Predefined QR styles similar to wcard.io
export const QR_STYLE_PRESETS = {
  classic: {
    dotStyle: 'square' as const,
    cornerSquareStyle: 'square' as const,
    cornerDotStyle: 'square' as const,
    foreground: '#000000',
    background: '#ffffff',
  },
  rounded: {
    dotStyle: 'rounded' as const,
    cornerSquareStyle: 'rounded' as const,
    cornerDotStyle: 'rounded' as const,
    foreground: '#000000',
    background: '#ffffff',
  },
  dots: {
    dotStyle: 'dots' as const,
    cornerSquareStyle: 'extra-rounded' as const,
    cornerDotStyle: 'dot' as const,
    foreground: '#000000',
    background: '#ffffff',
  },
  gradient: {
    dotStyle: 'classy' as const,
    cornerSquareStyle: 'extra-rounded' as const,
    cornerDotStyle: 'dot' as const,
    foreground: '#D4AF37',
    background: '#ffffff',
  },
  minimal: {
    dotStyle: 'square' as const,
    cornerSquareStyle: 'rounded' as const,
    cornerDotStyle: 'rounded' as const,
    foreground: '#333333',
    background: '#f5f5f5',
  },
};
