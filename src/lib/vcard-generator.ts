/**
 * vCard Generator Utility
 * Creates vCard files for digital business cards - wcard.io style
 */

export interface VCardData {
  fullName: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  photo?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    github?: string;
  };
}

export const generateVCard = (data: VCardData): string => {
  const {
    fullName,
    firstName = '',
    lastName = '',
    organization = '',
    title = '',
    email = '',
    phone = '',
    website = '',
    address = '',
    photo = '',
    socialLinks = {}
  } = data;

  const nameParts = fullName.split(' ');
  const fName = firstName || nameParts[0] || '';
  const lName = lastName || nameParts.slice(1).join(' ') || '';

  // Build vCard 3.0 format
  let vcard = 'BEGIN:VCARD\n';
  vcard += 'VERSION:3.0\n';
  vcard += `FN:${fullName}\n`;
  vcard += `N:${lName};${fName};;;\n`;
  
  if (organization) {
    vcard += `ORG:${organization}\n`;
  }
  
  if (title) {
    vcard += `TITLE:${title}\n`;
  }
  
  if (email) {
    vcard += `EMAIL;TYPE=WORK:${email}\n`;
  }
  
  if (phone) {
    vcard += `TEL;TYPE=WORK,VOICE:${phone}\n`;
  }
  
  if (website) {
    vcard += `URL:${website}\n`;
  }
  
  if (address) {
    vcard += `ADR;TYPE=WORK:;;${address};;;;\n`;
  }
  
  if (photo) {
    vcard += `PHOTO;VALUE=URL:${photo}\n`;
  }
  
  // Add social links as custom fields
  if (socialLinks.linkedin) {
    vcard += `X-SOCIALPROFILE;TYPE=linkedin:${socialLinks.linkedin}\n`;
  }
  
  if (socialLinks.twitter) {
    vcard += `X-SOCIALPROFILE;TYPE=twitter:${socialLinks.twitter}\n`;
  }
  
  if (socialLinks.instagram) {
    vcard += `X-SOCIALPROFILE;TYPE=instagram:${socialLinks.instagram}\n`;
  }
  
  if (socialLinks.facebook) {
    vcard += `X-SOCIALPROFILE;TYPE=facebook:${socialLinks.facebook}\n`;
  }
  
  if (socialLinks.youtube) {
    vcard += `X-SOCIALPROFILE;TYPE=youtube:${socialLinks.youtube}\n`;
  }
  
  if (socialLinks.github) {
    vcard += `X-SOCIALPROFILE;TYPE=github:${socialLinks.github}\n`;
  }
  
  // Add revision date
  vcard += `REV:${new Date().toISOString()}\n`;
  
  vcard += 'END:VCARD';
  
  return vcard;
};

export const downloadVCard = (data: VCardData, filename?: string): void => {
  const vcard = generateVCard(data);
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const fname = filename || data.fullName.replace(/\s+/g, '_');
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fname}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

export const shareVCard = async (data: VCardData): Promise<void> => {
  const vcard = generateVCard(data);
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const filename = data.fullName.replace(/\s+/g, '_');
  const file = new File([blob], `${filename}.vcf`, {
    type: 'text/vcard'
  });
  
  if (navigator.share && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${data.fullName} - Digital Card`,
        text: `Contact information for ${data.fullName}`
      });
    } catch (error) {
      console.error('Error sharing vCard:', error);
      // Fallback to download
      downloadVCard(data);
    }
  } else {
    // Fallback to download
    downloadVCard(data);
  }
};

export const copyToClipboard = async (data: VCardData): Promise<boolean> => {
  const vcard = generateVCard(data);
  
  try {
    await navigator.clipboard.writeText(vcard);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

export const shareCardLink = async (username: string, baseUrl: string = window.location.origin): Promise<void> => {
  const cardUrl = `${baseUrl}/${username}`;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Digital Business Card',
        text: 'Check out my digital business card!',
        url: cardUrl
      });
    } catch (error) {
      console.error('Error sharing link:', error);
      // Fallback to copying link
      await navigator.clipboard.writeText(cardUrl);
    }
  } else {
    // Fallback to copying link
    await navigator.clipboard.writeText(cardUrl);
  }
};
