import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LeadFormProps {
  title?: string;
  description?: string;
  ctaText?: string;
  variant?: string;
  onSubmit?: (data: { email: string; variant: string }) => void;
}

export function LeadForm({ 
  title = "Get Early Access",
  description = "Join our waitlist and be the first to know when we launch.",
  ctaText = "Get Notified",
  variant = 'default',
  onSubmit
}: LeadFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    
    try {
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture('lead_capture', {
          email,
          variant,
          form_location: 'lead_form',
          timestamp: new Date().toISOString()
        });
      }
      
      // Call custom onSubmit if provided
      if (onSubmit) {
        await onSubmit({ email, variant });
      } else {
        // Default API call
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, variant })
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit');
        }
      }
      
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Lead submission error:', error);
      // Handle error (could show toast notification)
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Thanks for signing up!</h3>
            <p className="text-muted-foreground">
              We'll send you updates about our launch and exclusive early access.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading || !email}
            className="w-full"
            size="lg"
          >
            {loading ? 'Submitting...' : ctaText}
          </Button>
          
          <p className="text-xs text-muted-foreground text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}