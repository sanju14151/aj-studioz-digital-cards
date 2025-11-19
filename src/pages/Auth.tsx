import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { MotionCard, MotionButton } from "@/components/motion";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!", {
        description: "You've successfully logged in"
      });
      navigate("/builder");
    }, 1000);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!", {
        description: "Welcome to AJ STUDIOZ"
      });
      navigate("/builder");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <motion.div 
        className="w-full max-w-md space-y-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo & Header */}
        <div className="text-center space-y-6">
          <motion.div 
            className="flex items-center justify-center gap-3"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <Sparkles className="w-12 h-12 text-primary" />
              <motion.div
                className="absolute inset-0 blur-xl bg-primary/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <span className="text-3xl font-bold tracking-tight">
              <span className="text-gradient-gold">AJ</span>
              <span className="text-foreground"> STUDIOZ</span>
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="text-muted-foreground mt-2 text-lg">Create your digital business card</p>
          </motion.div>
        </div>

        {/* Auth Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-10 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50 shadow-2xl rounded-3xl backdrop-blur-sm">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/50 backdrop-blur-sm p-1.5 mb-10 rounded-xl">
                <TabsTrigger 
                  value="login"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="login-email" className="text-base font-semibold mb-3 block">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="login-password" className="text-base font-semibold mb-3 block">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        required
                        className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-border/50" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <a href="#" className="text-primary hover:underline font-medium">
                      Forgot password?
                    </a>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-gold-glow rounded-xl font-semibold text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </form>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <Label htmlFor="signup-name" className="text-base font-semibold mb-3 block">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        required
                        className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-email" className="text-base font-semibold mb-3 block">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="signup-password" className="text-base font-semibold mb-3 block">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        required
                        className="h-12 pl-12 bg-background/50 border-border/50 focus:border-primary rounded-xl"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-gold-glow rounded-xl font-semibold text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.p 
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Auth;
