/**
 * Upgrade to Pro Page
 * Pricing and upgrade options for premium features
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Sparkles, Zap, Crown, ArrowLeft } from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  annualPrice: number;
  icon: any;
  description: string;
  features: string[];
  highlighted: boolean;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Free',
    price: 0,
    annualPrice: 0,
    icon: Sparkles,
    description: 'Perfect for getting started',
    features: [
      '1 Digital Business Card',
      'Basic Templates',
      'QR Code Generation',
      'Contact Sharing',
      'Email Support',
      'Basic Analytics',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 12,
    annualPrice: 120,
    icon: Zap,
    description: 'Best for professionals',
    features: [
      '5 Digital Business Cards',
      'Premium Templates',
      'Custom Domain',
      '1 NFC Card',
      'Advanced Analytics',
      'Priority Support',
      'Remove Watermark',
      'Email Signatures',
      'Virtual Backgrounds',
    ],
    highlighted: true,
    popular: true,
  },
  {
    name: 'Business',
    price: 29,
    annualPrice: 290,
    icon: Crown,
    description: 'Perfect for teams',
    features: [
      'Unlimited Digital Cards',
      'All Premium Templates',
      'Custom Domain',
      '5 NFC Cards',
      'Team Management',
      'Advanced Analytics',
      'API Access',
      'White Label',
      'Dedicated Support',
      'Lead Generation',
      'CRM Integration',
    ],
    highlighted: false,
  },
];

export const Upgrade = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const handleUpgrade = (planName: string) => {
    // TODO: Implement payment integration
    console.log(`Upgrading to ${planName} - ${billingCycle}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <div className="border-b border-border/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-8 h-8" />
              <h1 className="text-xl font-bold">
                <span className="text-gradient-gold">AJ</span>
                <span> STUDIOZ</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">
            Upgrade to <span className="text-gradient-gold">Premium</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock powerful features and take your digital presence to the next level
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-border/50">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const displayPrice = billingCycle === 'monthly' ? plan.price : Math.round(plan.annualPrice / 12);
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative p-8 h-full flex flex-col ${
                    plan.highlighted
                      ? 'border-2 border-amber-500 shadow-2xl shadow-amber-500/20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20'
                      : 'border border-border/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`inline-flex p-3 rounded-2xl mb-4 ${
                      plan.highlighted
                        ? 'bg-gradient-to-br from-amber-500 to-orange-500'
                        : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800'
                    }`}>
                      <Icon className={`w-8 h-8 ${plan.highlighted ? 'text-white' : 'text-foreground'}`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">${displayPrice}</span>
                      {plan.price > 0 && (
                        <span className="text-muted-foreground">
                          /{billingCycle === 'monthly' ? 'mo' : 'mo'}
                        </span>
                      )}
                    </div>
                    {billingCycle === 'annual' && plan.price > 0 && (
                      <div className="text-sm text-muted-foreground mt-1">
                        Billed ${plan.annualPrice} annually
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-amber-600' : 'text-green-600'
                        }`} />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={() => handleUpgrade(plan.name)}
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-foreground border border-border/50'
                    }`}
                    size="lg"
                  >
                    {plan.price === 0 ? 'Current Plan' : `Upgrade to ${plan.name}`}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Features Comparison */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Upgrade to <span className="text-gradient-gold">Premium</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Custom Domain',
                description: 'Use your own domain for professional branding',
                icon: Zap,
              },
              {
                title: 'NFC Cards',
                description: 'Physical smart cards that sync with your digital profile',
                icon: Crown,
              },
              {
                title: 'Advanced Analytics',
                description: 'Track views, clicks, and engagement in real-time',
                icon: Sparkles,
              },
              {
                title: 'Team Management',
                description: 'Manage multiple team members and their cards',
                icon: Zap,
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 border border-border/50">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-500/20">
            <h3 className="text-2xl font-bold mb-3">30-Day Money-Back Guarantee</h3>
            <p className="text-muted-foreground">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Upgrade;
