import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionAvatarProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  goldRing?: boolean;
}

const MotionAvatar = ({ 
  children, 
  className,
  size = "lg",
  goldRing = true
}: MotionAvatarProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40"
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="relative inline-block"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "rounded-full flex items-center justify-center overflow-hidden",
          goldRing && "ring-4 ring-primary/30 ring-offset-4 ring-offset-background shadow-gold-glow",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </motion.div>
      
      {goldRing && (
        <>
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-primary/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -inset-4 rounded-full border border-primary/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}
    </motion.div>
  );
};

export default MotionAvatar;
