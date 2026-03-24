import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`
        relative overflow-hidden rounded-2xl p-8
        bg-gradient-to-br from-secondary-foreground/10 to-cyber-purple/10
        backdrop-blur-xl border border-secondary-foreground/20
        hover:border-secondary-foreground/50 transition-all duration-300
        hover:shadow-lg hover:shadow-secondary-foreground/20
        ${className}
      `}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 40px rgba(0, 217, 255, 0.2)',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(45deg, rgba(0, 217, 255, 0.1), rgba(124, 58, 237, 0.1))',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
