import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionIconProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: "rotate" | "scale" | "shine";
  size?: "sm" | "md" | "lg" | "xl";
}

const MotionIcon = ({ 
  children, 
  className,
  hoverEffect = "scale",
  size = "md"
}: MotionIconProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };

  const hoverVariants = {
    rotate: { rotate: 15 },
    scale: { scale: 1.15 },
    shine: { scale: 1.1, filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={hoverVariants[hoverEffect]}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn("inline-flex items-center justify-center", sizeClasses[size], className)}
    >
      {children}
    </motion.div>
  );
};

export default MotionIcon;
