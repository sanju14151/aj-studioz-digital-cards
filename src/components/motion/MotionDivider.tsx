import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MotionDividerProps {
  className?: string;
  goldAccent?: boolean;
}

const MotionDivider = ({ 
  className,
  goldAccent = false
}: MotionDividerProps) => {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn(
        "h-px w-full origin-center",
        goldAccent 
          ? "bg-gradient-to-r from-transparent via-primary to-transparent" 
          : "bg-border",
        className
      )}
    />
  );
};

export default MotionDivider;
