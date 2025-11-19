/**
 * Templates Page - Browse and select card templates
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {  ArrowLeft, Check, Sparkles } from 'lucide-react';
import { cardTemplates, templateCategories } from '@/lib/card-templates';
import { toast } from 'sonner';

export default function Templates() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredTemplates =
    selectedCategory === 'All'
      ? cardTemplates
      : cardTemplates.filter((t) => t.category === selectedCategory);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    toast.success('Template selected!');
  };

  const handleUseTemplate = () => {
    if (!selectedTemplate) {
      toast.error('Please select a template');
      return;
    }
    
    navigate(`/builder?template=${selectedTemplate}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Choose Your Template</h1>
                <p className="text-sm text-muted-foreground">
                  Select a professional design to get started
                </p>
              </div>
            </div>
            <Button onClick={handleUseTemplate} disabled={!selectedTemplate}>
              <Sparkles className="w-4 h-4 mr-2" />
              Use Template
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {templateCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`group cursor-pointer overflow-hidden border-2 transition-all hover:shadow-xl ${
                  selectedTemplate === template.id
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {/* Template Preview */}
                <div
                  className="h-64 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${template.colors.primary}20, ${template.colors.secondary}20)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-2 p-6">
                      <div
                        className="w-20 h-20 rounded-full mx-auto"
                        style={{ backgroundColor: template.colors.primary }}
                      />
                      <div
                        className="h-4 w-32 mx-auto rounded"
                        style={{ backgroundColor: template.colors.secondary }}
                      />
                      <div className="flex gap-2 justify-center">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-lg"
                            style={{
                              backgroundColor: template.colors.primary,
                              opacity: 0.3,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Selected Badge */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-2">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Color Palette */}
                  <div className="flex gap-2 pt-2 border-t">
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: template.colors.primary }}
                      title="Primary"
                    />
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: template.colors.secondary }}
                      title="Secondary"
                    />
                    <div
                      className="w-8 h-8 rounded-full border-2"
                      style={{ backgroundColor: template.colors.background }}
                      title="Background"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
