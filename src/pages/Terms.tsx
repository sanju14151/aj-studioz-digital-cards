/**
 * Terms of Service Page
 */

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const Terms = () => {
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
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: November 19, 2025</p>

          <Card className="p-8 prose prose-lg dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using AJ STUDIOZ services, you accept and agree to be bound by these Terms of Service.</p>

            <h2>2. Description of Service</h2>
            <p>AJ STUDIOZ provides digital business card creation, NFC card services, and related networking tools ("the Service").</p>

            <h2>3. User Accounts</h2>
            <ul>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 13 years old to use the Service</li>
              <li>One person or entity may not maintain more than one free account</li>
            </ul>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute spam or malicious content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with other users' use of the Service</li>
            </ul>

            <h2>5. Content Ownership</h2>
            <ul>
              <li>You retain ownership of content you create</li>
              <li>You grant us license to display and distribute your public cards</li>
              <li>We reserve the right to remove content that violates our policies</li>
            </ul>

            <h2>6. Payment Terms</h2>
            <ul>
              <li>Paid plans are billed in advance on a monthly or annual basis</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>We may change our fees with 30 days notice</li>
              <li>You authorize us to charge your payment method</li>
            </ul>

            <h2>7. Cancellation and Termination</h2>
            <ul>
              <li>You may cancel your account at any time</li>
              <li>We may suspend or terminate accounts that violate these terms</li>
              <li>Upon termination, your right to use the Service ceases</li>
            </ul>

            <h2>8. Disclaimers</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE UNINTERRUPTED OR ERROR-FREE SERVICE.</p>

            <h2>9. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, AJ STUDIOZ SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.</p>

            <h2>10. Indemnification</h2>
            <p>You agree to indemnify and hold AJ STUDIOZ harmless from any claims arising from your use of the Service or violation of these terms.</p>

            <h2>11. Changes to Terms</h2>
            <p>We may modify these terms at any time. Continued use of the Service constitutes acceptance of modified terms.</p>

            <h2>12. Governing Law</h2>
            <p>These terms are governed by the laws of California, USA, without regard to conflict of law provisions.</p>

            <h2>13. Contact Information</h2>
            <p>
              For questions about these terms, contact us at:<br />
              Email: legal@ajstudioz.com<br />
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

export default Terms;
