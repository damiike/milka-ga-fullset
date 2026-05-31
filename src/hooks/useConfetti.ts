import { useCallback } from 'react';

// Hook for realistic confetti animation
export function useConfetti() {
  const triggerConfetti = useCallback(async () => {
    // Dynamically import canvas-confetti to avoid SSR issues
    const confetti = (await import('canvas-confetti')).default;
    
    // Create realistic confetti effect similar to kirilv.com example
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#0a0a0a', '#dcccb8', '#e3dad0', '#6e6862']
      });
    }

    // Multiple bursts for realistic effect
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return { triggerConfetti };
}