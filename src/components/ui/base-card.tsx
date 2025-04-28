import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function BaseCard({ children, className, animate = true }: BaseCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={animate ? 'hidden' : false}
      animate={animate ? 'visible' : false}
      variants={cardVariants}
      transition={{ duration: 0.5 }}
      className={cn(
        'card',
        'hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
} 