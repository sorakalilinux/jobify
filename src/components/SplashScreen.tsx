import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a0a0a, 1);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create rotating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(2, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00d9ff,
      emissive: 0x0099cc,
      wireframe: false,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positionArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positionArray[i] = (Math.random() - 0.5) * 20;
      positionArray[i + 1] = (Math.random() - 0.5) * 20;
      positionArray[i + 2] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x7c3aed,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const light = new THREE.PointLight(0x00d9ff, 1, 100);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Animation loop
    let animationId: number;
    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.008;
      mesh.scale.set(1 + progress * 0.5, 1 + progress * 0.5, 1 + progress * 0.5);

      particles.rotation.x += 0.0002;
      particles.rotation.y += 0.0003;

      renderer.render(scene, camera);

      if (progress === 1) {
        setIsLoading(false);
        setTimeout(() => onComplete(), 500);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5, delay: isLoading ? 0 : 2.5 }}
      pointerEvents={isLoading ? 'auto' : 'none'}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h1 className="text-5xl font-heading font-bold text-secondary-foreground mb-4">
          TalentHub
        </h1>
        <p className="text-lg font-paragraph text-surface">
          Conectando talentos e oportunidades
        </p>
      </motion.div>
    </motion.div>
  );
}
