import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionListItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

const MotionListItem = ({ 
  children, 
  className,
  index = 0
}: MotionListItemProps) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.06
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      whileHover={{ 
        x: 4,
        transition: { duration: 0.2 }
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default MotionListItem;
