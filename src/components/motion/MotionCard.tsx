import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  tiltEnabled?: boolean;
  glowEnabled?: boolean;
  variant?: "default" | "premium" | "glass";
}

const MotionCard = ({ 
  children, 
  className, 
  tiltEnabled = false,
  glowEnabled = false,
  variant = "default" 
}: MotionCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const variantClasses = {
    default: "bg-card border border-border/50",
    premium: "bg-gradient-to-br from-card via-card to-secondary/30 border-2 border-primary/20",
    glass: "bg-card/40 backdrop-blur-xl border border-border/30"
  };

  return (
    <motion.div
      ref={cardRef}
      style={tiltEnabled ? { rotateX, rotateY } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: glowEnabled 
          ? "0 12px 40px rgba(212, 175, 55, 0.25)" 
          : "0 12px 40px rgba(0, 0, 0, 0.35)"
      }}
      className={cn(
        "rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-shadow duration-300",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;
