import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: boolean;
}

const MotionSection = ({ 
  children, 
  className,
  delay = 0,
  staggerChildren = false
}: MotionSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay,
        ...(staggerChildren && {
          staggerChildren: 0.08,
          delayChildren: 0.1
        })
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.section>
  );
};

export default MotionSection;
