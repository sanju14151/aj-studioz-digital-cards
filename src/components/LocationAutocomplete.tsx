/**
 * Location Autocomplete - Smart location suggestions
 */

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Popular cities and locations
const popularLocations = [
  'New York, USA',
  'Los Angeles, USA',
  'Chicago, USA',
  'San Francisco, USA',
  'Miami, USA',
  'London, UK',
  'Paris, France',
  'Berlin, Germany',
  'Tokyo, Japan',
  'Singapore',
  'Dubai, UAE',
  'Sydney, Australia',
  'Toronto, Canada',
  'Mumbai, India',
  'Bangalore, India',
  'Delhi, India',
  'Hong Kong',
  'Shanghai, China',
  'Amsterdam, Netherlands',
  'Barcelona, Spain',
];

export default function LocationAutocomplete({
  value,
  onChange,
  placeholder = 'Enter your location',
}: LocationAutocompleteProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value.length >= 2) {
      const filtered = popularLocations.filter((location) =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: string) => {
    onChange(location);
    setShowSuggestions(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
          className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
          placeholder={placeholder}
        />
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto">
              {suggestions.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors flex items-center gap-3 border-b border-border/50 last:border-b-0"
                >
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{location}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
