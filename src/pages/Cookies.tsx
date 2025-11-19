/**
 * Cookie Policy Page
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

export const Cookies = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <header className="border-b border-border/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-8 h-8" />
              <h1 className="text-xl font-bold">
                <span className="text-gradient-gold">AJ</span>
                <span> STUDIOZ</span>
              </h1>
            </a>
            <Button asChild><a href="/auth">Sign In</a></Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <Cookie className="w-12 h-12 text-amber-500" />
            <h1 className="text-5xl font-bold">Cookie Policy</h1>
          </div>
          <p className="text-muted-foreground mb-8">Last updated: November 19, 2025</p>

          <Card className="p-8 prose prose-lg dark:prose-invert max-w-none">
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.
            </p>

            <h2>Types of Cookies We Use</h2>
            
            <h3>1. Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly. They enable core functionality such as:</p>
            <ul>
              <li>User authentication and security</li>
              <li>Session management</li>
              <li>Load balancing</li>
            </ul>
            <p><strong>Duration:</strong> Session or up to 30 days</p>

            <h3>2. Analytics Cookies</h3>
            <p>We use these cookies to understand how visitors interact with our website:</p>
            <ul>
              <li>Page views and navigation patterns</li>
              <li>Time spent on pages</li>
              <li>Error messages encountered</li>
            </ul>
            <p><strong>Duration:</strong> Up to 2 years</p>

            <h3>3. Functional Cookies</h3>
            <p>These cookies remember your choices and preferences:</p>
            <ul>
              <li>Language preferences</li>
              <li>Theme settings (dark/light mode)</li>
              <li>Display preferences</li>
            </ul>
            <p><strong>Duration:</strong> Up to 1 year</p>

            <h3>4. Marketing Cookies</h3>
            <p>Used to deliver relevant advertisements:</p>
            <ul>
              <li>Track ad campaign effectiveness</li>
              <li>Personalize ad content</li>
              <li>Limit ad frequency</li>
            </ul>
            <p><strong>Duration:</strong> Up to 1 year</p>

            <h2>Third-Party Cookies</h2>
            <p>We may use services from third-party providers that set their own cookies:</p>
            <ul>
              <li><strong>Google Analytics:</strong> Website analytics and reporting</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>Social Media:</strong> Social sharing features</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>You can control and manage cookies in several ways:</p>

            <h3>Browser Settings</h3>
            <p>Most browsers allow you to:</p>
            <ul>
              <li>View cookies stored on your device</li>
              <li>Delete specific or all cookies</li>
              <li>Block cookies from specific websites</li>
              <li>Block all third-party cookies</li>
              <li>Clear cookies when you close your browser</li>
            </ul>

            <h3>Opt-Out Tools</h3>
            <p>You can opt out of specific types of cookies:</p>
            <ul>
              <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Browser add-on</a></li>
              <li>Advertising cookies: <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener">DAA Consumer Choice</a></li>
            </ul>

            <h2>Impact of Disabling Cookies</h2>
            <p>If you disable cookies, some features may not work properly:</p>
            <ul>
              <li>You may need to log in each time you visit</li>
              <li>Your preferences won't be saved</li>
              <li>Some interactive features may be limited</li>
            </ul>

            <h2>Cookie Consent</h2>
            <p>
              When you first visit our website, we'll ask for your consent to use non-essential cookies. You can withdraw your consent at any time through our cookie preference center.
            </p>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this cookie policy from time to time. The "Last updated" date at the top of this page indicates when the policy was last revised.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions about our cookie policy, please contact us at:</p>
            <p>
              Email: privacy@ajstudioz.com<br />
              Address: San Francisco, CA 94102
            </p>
          </Card>

          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </motion.div>
      </div>

      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-xl mt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/privacy" className="hover:text-primary">Privacy</a></li>
                <li><a href="/terms" className="hover:text-primary">Terms</a></li>
                <li><a href="/security" className="hover:text-primary">Security</a></li>
                <li><a href="/cookies" className="hover:text-primary">Cookies</a></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <img src="/AJ.svg" alt="AJ STUDIOZ" className="w-10 h-10" />
                <h3 className="font-bold">AJ STUDIOZ</h3>
              </div>
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

export default Cookies;
