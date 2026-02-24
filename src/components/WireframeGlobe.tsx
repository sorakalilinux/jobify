import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function WireframeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Generate particles on globe surface
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
    }> = [];

    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 100;

      particles.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let rotation = 0;
    let time = 0;

    const animate = () => {
      const centerX = canvas.width / 2 / window.devicePixelRatio;
      const centerY = canvas.height / 2 / window.devicePixelRatio;

      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      rotation += 0.0005;
      time += 0.01;

      // Draw wireframe grid
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.15)';
      ctx.lineWidth = 0.5;

      // Latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const latRad = (lat * Math.PI) / 180;
        const points: Array<[number, number]> = [];

        for (let lon = -180; lon <= 180; lon += 10) {
          const lonRad = (lon * Math.PI) / 180;
          let x = 100 * Math.cos(latRad) * Math.cos(lonRad + rotation);
          let y = 100 * Math.sin(latRad);
          let z = 100 * Math.cos(latRad) * Math.sin(lonRad + rotation);

          const screenX = centerX + (x * 0.8) / (1 + z / 150);
          const screenY = centerY + (y * 0.8) / (1 + z / 150);
          points.push([screenX, screenY]);
        }

        if (points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
          }
          ctx.stroke();
        }
      }

      // Longitude lines
      for (let lon = -180; lon <= 180; lon += 20) {
        const lonRad = (lon * Math.PI) / 180;
        const points: Array<[number, number]> = [];

        for (let lat = -90; lat <= 90; lat += 10) {
          const latRad = (lat * Math.PI) / 180;
          let x = 100 * Math.cos(latRad) * Math.cos(lonRad + rotation);
          let y = 100 * Math.sin(latRad);
          let z = 100 * Math.cos(latRad) * Math.sin(lonRad + rotation);

          const screenX = centerX + (x * 0.8) / (1 + z / 150);
          const screenY = centerY + (y * 0.8) / (1 + z / 150);
          points.push([screenX, screenY]);
        }

        if (points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(points[0][0], points[0][1]);
          for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
          }
          ctx.stroke();
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        // Rotate particle
        const cosRot = Math.cos(rotation);
        const sinRot = Math.sin(rotation);
        const newX = particle.x * cosRot - particle.z * sinRot;
        const newZ = particle.x * sinRot + particle.z * cosRot;

        // Project to 2D
        const screenX = centerX + (newX * 0.8) / (1 + newZ / 150);
        const screenY = centerY + (particle.y * 0.8) / (1 + newZ / 150);

        // Calculate brightness based on z-depth
        const brightness = Math.max(0.3, (newZ + 150) / 300);

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, particle.size * 3);
        gradient.addColorStop(0, `rgba(0, 217, 255, ${brightness * 0.8})`);
        gradient.addColorStop(0.7, `rgba(0, 217, 255, ${brightness * 0.3})`);
        gradient.addColorStop(1, `rgba(0, 217, 255, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(screenX - particle.size * 3, screenY - particle.size * 3, particle.size * 6, particle.size * 6);

        // Draw particle core
        ctx.fillStyle = `rgba(0, 217, 255, ${brightness})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 30px rgba(0, 217, 255, 0.3))' }}
      />
    </div>
  );
}
