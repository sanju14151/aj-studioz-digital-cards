/**
 * Card Templates - Professional pre-designed templates
 */

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  layout: string;
  features: string[];
}

export const cardTemplates: CardTemplate[] = [
  {
    id: 'minimal-pro',
    name: 'Minimal Professional',
    description: 'Clean and modern design for professionals',
    category: 'Business',
    thumbnail: '/templates/minimal.jpg',
    colors: {
      primary: '#D4AF37',
      secondary: '#1a1a1a',
      background: '#ffffff',
    },
    layout: 'minimal',
    features: ['Clean Layout', 'Professional', 'Fast Loading'],
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Stand out with bold colors and creative layout',
    category: 'Creative',
    thumbnail: '/templates/creative.jpg',
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      background: '#1a1a2e',
    },
    layout: 'creative',
    features: ['Bold Colors', 'Eye-catching', 'Creative'],
  },
  {
    id: 'corporate-classic',
    name: 'Corporate Classic',
    description: 'Traditional corporate design',
    category: 'Business',
    thumbnail: '/templates/corporate.jpg',
    colors: {
      primary: '#2C3E50',
      secondary: '#3498DB',
      background: '#ECF0F1',
    },
    layout: 'classic',
    features: ['Professional', 'Trustworthy', 'Traditional'],
  },
  {
    id: 'tech-modern',
    name: 'Tech Modern',
    description: 'Modern tech-inspired design',
    category: 'Technology',
    thumbnail: '/templates/tech.jpg',
    colors: {
      primary: '#00D4FF',
      secondary: '#7B2CBF',
      background: '#0a0e27',
    },
    layout: 'modern',
    features: ['Futuristic', 'Tech-inspired', 'Animated'],
  },
  {
    id: 'elegant-luxury',
    name: 'Elegant Luxury',
    description: 'Sophisticated and elegant',
    category: 'Luxury',
    thumbnail: '/templates/luxury.jpg',
    colors: {
      primary: '#D4AF37',
      secondary: '#1C1C1C',
      background: '#FAFAFA',
    },
    layout: 'elegant',
    features: ['Luxury', 'Sophisticated', 'Premium'],
  },
  {
    id: 'startup-fresh',
    name: 'Startup Fresh',
    description: 'Fresh and energetic for startups',
    category: 'Startup',
    thumbnail: '/templates/startup.jpg',
    colors: {
      primary: '#10B981',
      secondary: '#6366F1',
      background: '#FFFFFF',
    },
    layout: 'fresh',
    features: ['Energetic', 'Modern', 'Startup-friendly'],
  },
];

export const templateCategories = [
  'All',
  'Business',
  'Creative',
  'Technology',
  'Luxury',
  'Startup',
];

export function getTemplateById(id: string): CardTemplate | undefined {
  return cardTemplates.find((template) => template.id === id);
}

export function getTemplatesByCategory(category: string): CardTemplate[] {
  if (category === 'All') {
    return cardTemplates;
  }
  return cardTemplates.filter((template) => template.template === category);
}
