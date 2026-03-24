import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function DigitalSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.current = (e.clientX - rect.left - rect.width / 2) / rect.width;
      mouseY.current = (e.clientY - rect.top - rect.height / 2) / rect.height;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 flex items-center justify-center perspective"
    >
      {/* Outer glow */}
      <motion.div
        animate={{
          boxShadow: [
            '0 0 60px rgba(0, 217, 255, 0.3)',
            '0 0 80px rgba(0, 217, 255, 0.5)',
            '0 0 60px rgba(0, 217, 255, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0, 217, 255, 0.1), transparent)',
        }}
      />

      {/* Main sphere */}
      <motion.div
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="relative w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.4), rgba(0, 217, 255, 0.1))',
          border: '2px solid rgba(0, 217, 255, 0.3)',
          boxShadow: 'inset -20px -20px 60px rgba(0, 0, 0, 0.5), inset 20px 20px 60px rgba(0, 217, 255, 0.1)',
        }}
      >
        {/* Inner rotating rings */}
        <motion.div
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(0, 217, 255, 0.2)',
            transform: 'rotateX(60deg)',
          }}
        />

        <motion.div
          animate={{ rotateZ: [360, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full"
          style={{
            border: '1px solid rgba(124, 58, 237, 0.2)',
            transform: 'rotateY(60deg)',
          }}
        />

        {/* Pulsing core */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-1/4 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 217, 255, 0.8), transparent)',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>

      {/* Orbiting particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? 'rgba(0, 217, 255, 0.8)' : 'rgba(124, 58, 237, 0.8)',
              top: '50%',
              left: `${50 + 40 * Math.cos((i * Math.PI) / 2)}%`,
              transform: 'translate(-50%, -50%)',
              boxShadow: i % 2 === 0 ? '0 0 10px rgba(0, 217, 255, 0.8)' : '0 0 10px rgba(124, 58, 237, 0.8)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
