/**
 * Industry Selector Modal - Beautiful selection dialog
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Industry {
  value: string;
  label: string;
  emoji: string;
  description: string;
}

const industries: Industry[] = [
  { value: 'Technology', label: 'Technology', emoji: '💻', description: 'Software, IT, Tech Startups' },
  { value: 'Healthcare', label: 'Healthcare', emoji: '🏥', description: 'Medical, Health Services' },
  { value: 'Finance', label: 'Finance', emoji: '💰', description: 'Banking, Investment, Fintech' },
  { value: 'Education', label: 'Education', emoji: '📚', description: 'Schools, Training, E-learning' },
  { value: 'Marketing', label: 'Marketing', emoji: '📢', description: 'Advertising, Digital Marketing' },
  { value: 'Real Estate', label: 'Real Estate', emoji: '🏠', description: 'Property, Construction' },
  { value: 'Retail', label: 'Retail', emoji: '🛍️', description: 'Shopping, E-commerce' },
  { value: 'Hospitality', label: 'Hospitality', emoji: '🏨', description: 'Hotels, Tourism, Travel' },
  { value: 'Entertainment', label: 'Entertainment', emoji: '🎬', description: 'Media, Film, Music' },
  { value: 'Food & Beverage', label: 'Food & Beverage', emoji: '🍽️', description: 'Restaurants, Catering' },
  { value: 'Consulting', label: 'Consulting', emoji: '💼', description: 'Business Advisory' },
  { value: 'Creative', label: 'Creative', emoji: '🎨', description: 'Design, Art, Photography' },
  { value: 'Legal', label: 'Legal', emoji: '⚖️', description: 'Law Firms, Legal Services' },
  { value: 'Construction', label: 'Construction', emoji: '🏗️', description: 'Building, Engineering' },
  { value: 'Manufacturing', label: 'Manufacturing', emoji: '🏭', description: 'Production, Industrial' },
  { value: 'Transportation', label: 'Transportation', emoji: '🚗', description: 'Logistics, Delivery' },
  { value: 'Telecommunications', label: 'Telecommunications', emoji: '📱', description: 'Telecom, Networks' },
  { value: 'Media', label: 'Media', emoji: '📺', description: 'Broadcasting, Publishing' },
  { value: 'Non-Profit', label: 'Non-Profit', emoji: '❤️', description: 'Charity, NGO, Social' },
  { value: 'Other', label: 'Other', emoji: '🔧', description: 'Other Industries' },
];

interface IndustrySelectorModalProps {
  open: boolean;
  onClose: () => void;
  selectedIndustry: string;
  onSelect: (industry: string) => void;
}

export default function IndustrySelectorModal({
  open,
  onClose,
  selectedIndustry,
  onSelect,
}: IndustrySelectorModalProps) {
  const [search, setSearch] = useState('');

  const filteredIndustries = industries.filter(
    (industry) =>
      industry.label.toLowerCase().includes(search.toLowerCase()) ||
      industry.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value: string) => {
    onSelect(value);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">Select Your Industry</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1">
            Choose the industry that best describes your business
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search industries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[50vh] px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredIndustries.map((industry, index) => (
              <motion.div
                key={industry.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <button
                  onClick={() => handleSelect(industry.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:border-primary hover:bg-primary/5 ${
                    selectedIndustry === industry.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{industry.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{industry.label}</h4>
                        {selectedIndustry === industry.value && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          {filteredIndustries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No industries found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
