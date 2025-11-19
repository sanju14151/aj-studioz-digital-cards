/**
 * Demo Page - Interactive NFC card scanning demo with animation
 * Shows how NFC cards work with smartphone tap animation
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Smartphone, 
  Radio, 
  Zap,
  ArrowRight,
  Play,
  CheckCircle2
} from 'lucide-react';

const Demo = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);

  const startDemo = () => {
    setIsAnimating(true);
    setStep(1);

    // Step 1: Card approaches phone
    setTimeout(() => setStep(2), 1500);
    
    // Step 2: Card taps phone (NFC connection)
    setTimeout(() => setStep(3), 3000);
    
    // Step 3: Phone shows loading
    setTimeout(() => setStep(4), 4000);
    
    // Step 4: Digital card appears
    setTimeout(() => setStep(5), 5500);
    
    // Reset after demo
    setTimeout(() => {
      setIsAnimating(false);
      setStep(0);
    }, 8000);
  };

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
            <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
            <Button variant="outline" onClick={() => navigate('/auth')}>Sign In</Button>
            <Button onClick={() => navigate('/auth')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Demo Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-semibold mb-6">
              Interactive Demo
            </span>
            <h1 className="text-6xl font-bold mb-6">
              See NFC Cards in <span className="text-gradient-gold">Action</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Watch how easy it is to share your digital card with just a tap
            </p>
          </motion.div>
        </div>

        {/* Animation Container */}
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-12 border-2 border-emerald-500/20 min-h-[600px] flex items-center justify-center overflow-hidden">
            
            {/* Background Effects */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5"
              animate={{
                opacity: isAnimating ? [0.5, 1, 0.5] : 0.5,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* NFC Card */}
            <AnimatePresence>
              {(step === 0 || step >= 1) && (
                <motion.div
                  className="absolute"
                  initial={{ x: -300, y: 200, rotate: -15, opacity: 0 }}
                  animate={{
                    x: step >= 2 ? 0 : step >= 1 ? -100 : -300,
                    y: step >= 2 ? -50 : step >= 1 ? 50 : 200,
                    rotate: step >= 2 ? 0 : -15,
                    opacity: step >= 1 ? 1 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Card className="w-80 h-48 bg-gradient-to-br from-emerald-600 to-teal-700 p-6 flex flex-col justify-between shadow-2xl">
                    <div className="flex items-start justify-between">
                      <img src="/AJ.svg" alt="Logo" className="w-12 h-12 bg-white rounded-lg p-2" />
                      <Radio className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-1">John Doe</h3>
                      <p className="text-emerald-100">Creative Director</p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Smartphone */}
            <motion.div
              className="relative"
              animate={{
                scale: step >= 3 ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-72 h-[550px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-900">
                {/* Phone Screen */}
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
                  
                  {/* Screen Content */}
                  <div className="relative h-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                    <AnimatePresence mode="wait">
                      {/* Initial State */}
                      {step === 0 && (
                        <motion.div
                          key="initial"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center p-6"
                        >
                          <Smartphone className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">Ready to receive</p>
                        </motion.div>
                      )}

                      {/* NFC Detection */}
                      {(step === 2 || step === 3) && (
                        <motion.div
                          key="detecting"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          >
                            <Radio className="w-20 h-20 text-emerald-500 mx-auto" />
                          </motion.div>
                          <motion.p
                            className="text-emerald-600 font-semibold mt-4"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            Reading NFC...
                          </motion.p>
                        </motion.div>
                      )}

                      {/* Loading */}
                      {step === 4 && (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-16 h-16 text-blue-500 mx-auto" />
                          </motion.div>
                          <p className="text-gray-600 mt-4">Loading card...</p>
                        </motion.div>
                      )}

                      {/* Digital Card Loaded */}
                      {step === 5 && (
                        <motion.div
                          key="loaded"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="w-full h-full p-6 overflow-auto"
                        >
                          <div className="text-center space-y-4">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 mx-auto flex items-center justify-center text-white text-3xl font-bold">
                                JD
                              </div>
                            </motion.div>
                            
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                            >
                              <h3 className="text-2xl font-bold text-gray-900">John Doe</h3>
                              <p className="text-gray-600">Creative Director</p>
                              <p className="text-sm text-gray-500">AJ STUDIOZ</p>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                              className="space-y-2 pt-4"
                            >
                              <Button className="w-full bg-emerald-500 hover:bg-emerald-600" size="sm">
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Save Contact
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex-1">Email</Button>
                                <Button variant="outline" size="sm" className="flex-1">Call</Button>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* NFC Icon Pulse Effect */}
              {step === 2 && (
                <motion.div
                  className="absolute -top-10 left-1/2 -translate-x-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: 2
                  }}
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-emerald-500" />
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Control Button */}
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={startDemo}
              disabled={isAnimating}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              {isAnimating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Radio className="w-5 h-5 mr-2" />
                  </motion.div>
                  Demo in Progress...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Demo
                </>
              )}
            </Button>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Tap Your Card',
                description: 'Simply tap your NFC-enabled card on any smartphone',
                icon: Radio
              },
              {
                step: '2',
                title: 'Instant Connection',
                description: 'NFC technology instantly transfers your digital card',
                icon: Zap
              },
              {
                step: '3',
                title: 'Save & Connect',
                description: 'They can save your contact and connect immediately',
                icon: CheckCircle2
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 text-center h-full bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-emerald-500" />
                  </div>
                  <div className="text-4xl font-bold text-emerald-500 mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <Card className="p-12 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/20">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Your NFC Card?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals sharing their digital cards with NFC technology
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/nfc-cards')}>
                Learn More About NFC
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Demo;
