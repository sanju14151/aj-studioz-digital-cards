import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gold" | "outline" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const MotionButton = ({ 
  children, 
  className, 
  variant = "default",
  onClick,
  disabled = false,
  type = "button"
}: MotionButtonProps) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    gold: "bg-gradient-to-r from-gold via-gold-light to-gold text-background font-semibold shadow-gold-glow",
    outline: "border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 text-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: variant === "gold" 
          ? "0 8px 30px rgba(212, 175, 55, 0.4)" 
          : "0 4px 20px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ scale: 0.97 }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
