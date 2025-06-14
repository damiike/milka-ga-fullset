import { useEffect, useState } from 'react';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function Confetti({ trigger, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
  }>>([]);

  const colors = ['#fb7185', '#f43f5e', '#fda4af', '#fbbf24', '#a78bfa', '#34d399'];

  useEffect(() => {
    if (!trigger) return;

    // Create confetti particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: Math.random() * -15 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 6 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10
    }));

    setParticles(newParticles);

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.5, // gravity
          rotation: particle.rotation + particle.rotationSpeed
        })).filter(particle => particle.y < window.innerHeight + 50)
      );
    };

    const interval = setInterval(animateParticles, 16);

    // Clean up after 3 seconds
    const cleanup = setTimeout(() => {
      setParticles([]);
      onComplete?.();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(cleanup);
    };
  }, [trigger, onComplete]);

  if (!trigger || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
}

// Hook for easy confetti triggering
export function useConfetti() {
  const [isTriggered, setIsTriggered] = useState(false);

  const triggerConfetti = () => {
    setIsTriggered(true);
    setTimeout(() => setIsTriggered(false), 100);
  };

  return { isTriggered, triggerConfetti };
}