export interface ABTest {
  name: string;
  variants: string[];
  weights?: number[]; // Optional weights for variant distribution
}

export function getVariant(testName: string, variants: string[] = ['A', 'B'], weights?: number[]): string {
  if (typeof window === 'undefined') {
    return variants[0]; // SSR fallback
  }
  
  const storageKey = `ab-${testName}`;
  const stored = localStorage.getItem(storageKey);
  
  if (stored && variants.includes(stored)) {
    return stored;
  }
  
  // Weighted random selection
  let variant: string;
  if (weights && weights.length === variants.length) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const random = Math.random() * totalWeight;
    let currentWeight = 0;
    
    for (let i = 0; i < variants.length; i++) {
      currentWeight += weights[i];
      if (random <= currentWeight) {
        variant = variants[i];
        break;
      }
    }
    variant = variant! || variants[0];
  } else {
    // Equal distribution
    variant = variants[Math.floor(Math.random() * variants.length)];
  }
  
  localStorage.setItem(storageKey, variant);
  return variant;
}

export function getActiveTests(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const tests: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('ab-')) {
      const testName = key.replace('ab-', '');
      tests[testName] = localStorage.getItem(key) || '';
    }
  }
  return tests;
}

export function clearTest(testName: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`ab-${testName}`);
  }
}

export function clearAllTests(): void {
  if (typeof window === 'undefined') return;
  
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('ab-')) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
}