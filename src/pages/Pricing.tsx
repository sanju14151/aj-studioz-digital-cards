/**
 * Pricing Page - Subscription plans and pricing
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Check, 
  X, 
  Crown, 
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for trying out',
      icon: Sparkles,
      color: 'from-gray-500 to-gray-600',
      features: [
        { text: '1 Digital Card', included: true },
        { text: 'Basic Templates', included: true },
        { text: 'QR Code Generation', included: true },
        { text: 'Basic Analytics', included: true },
        { text: 'AJ STUDIOZ Branding', included: true },
        { text: 'Custom Domain', included: false },
        { text: 'NFC Card', included: false },
        { text: 'Team Features', included: false },
        { text: 'Priority Support', included: false },
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 12, annual: 120 },
      description: 'For professionals',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      features: [
        { text: '5 Digital Cards', included: true },
        { text: 'All Premium Templates', included: true },
        { text: 'Custom QR Codes', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Remove Branding', included: true },
        { text: 'Custom Domain', included: true },
        { text: '1 NFC Card', included: true },
        { text: 'Lead Capture', included: true },
        { text: 'Email Support', included: true },
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Business',
      price: { monthly: 29, annual: 290 },
      description: 'For growing teams',
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      features: [
        { text: 'Unlimited Cards', included: true },
        { text: 'All Templates + Custom', included: true },
        { text: 'White Label QR Codes', included: true },
        { text: 'Full Analytics Suite', included: true },
        { text: 'Complete White Label', included: true },
        { text: 'Multiple Custom Domains', included: true },
        { text: '5 NFC Cards', included: true },
        { text: 'CRM Integrations', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Team Management', included: true },
        { text: 'API Access', included: true },
      ],
      cta: 'Contact Sales',
      popular: false
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-8 h-8" />
            <span className="text-xl font-bold">AJ STUDIOZ</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/features')}>Features</Button>
            <Button variant="ghost" onClick={() => navigate('/templates')}>Templates</Button>
            <Button variant="outline" onClick={() => navigate('/auth')}>Sign In</Button>
            <Button onClick={() => navigate('/auth')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
            Simple, Transparent Pricing
          </span>
          <h1 className="text-6xl font-bold mb-6">
            Choose Your <span className="text-gradient-gold">Perfect Plan</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free, upgrade as you grow. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-secondary/50 p-2 rounded-full mb-12">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                billingCycle === 'annual' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card className={`p-8 h-full bg-gradient-to-br from-card to-secondary/30 border-2 ${
                plan.popular ? 'border-primary shadow-2xl shadow-primary/20 scale-105' : 'border-border/50'
              }`}>
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold">
                    ${billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.annual / 12)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  {billingCycle === 'annual' && plan.price.annual > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Billed ${plan.price.annual} annually
                    </p>
                  )}
                </div>

                <Button 
                  className={`w-full mb-8 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' 
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => navigate('/auth')}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground/50'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: 'Can I change plans later?',
              a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes, Pro and Business plans come with a 14-day free trial. No credit card required.'
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
            },
            {
              q: 'Can I cancel anytime?',
              a: 'Absolutely! Cancel anytime with no questions asked. No cancellation fees.'
            },
          ].map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/features" className="hover:text-primary">Features</a></li>
                <li><a href="/pricing" className="hover:text-primary">Pricing</a></li>
                <li><a href="/templates" className="hover:text-primary">Templates</a></li>
                <li><a href="/nfc-cards" className="hover:text-primary">NFC Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/about" className="hover:text-primary">About</a></li>
                <li><a href="/contact" className="hover:text-primary">Contact</a></li>
                <li><a href="/support" className="hover:text-primary">Support</a></li>
                <li><a href="/blog" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
                <li><a href="/terms" className="hover:text-primary">Terms</a></li>
                <li><a href="/security" className="hover:text-primary">Security</a></li>
                <li><a href="/cookies" className="hover:text-primary">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">AJ STUDIOZ</h3>
              <p className="text-muted-foreground text-sm">
                Create stunning digital business cards that leave a lasting impression.
              </p>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground text-sm">
            © 2025 AJ STUDIOZ. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
