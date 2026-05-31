import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const formatNumberedList = (answer: string, introText: string, additionalInfoStartsWith: string) => {
  const instructions = answer
    .split('\n')
    .filter((line) => line.match(/^\d+\./))
    .map((line) => line.replace(/^\d+\.\s*/, '').trim());

  const additionalInfo = answer.split('\n').find((line) => line.includes(additionalInfoStartsWith));

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">{introText}</p>
      <ul className="space-y-3 pl-5 list-decimal">
        {instructions.map((instruction, index) => (
          <li key={index} className="text-muted-foreground">
            {instruction}
          </li>
        ))}
      </ul>
      {additionalInfo && <p className="text-muted-foreground mt-6">{additionalInfo}</p>}
    </div>
  );
};

export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const renderAnswer = (answer: string) => {
    if (answer.includes('### 1. Classic Lashes')) {
      const lashTypes = answer.split('### ').slice(1);

      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lashTypes.map((type, index) => {
              const [title, ...rest] = type.split('\n').filter(Boolean);
              const description = rest.filter((line) => !line.startsWith('**') && !line.includes('![')).join('\n');
              const imageMatch = rest.find((line) => line.includes('!['));
              const imageUrl = imageMatch ? imageMatch.match(/\]\((.*?)\)/)?.[1] : '';

              return (
                <div key={index} className="pro-card overflow-hidden h-full">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={title.replace(/^\d+\.\s*/, '')}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="text-xl font-medium text-foreground mb-2">
                      {title.replace(/^\d+\.\s*/, '')}
                    </h4>
                    {description.split('\n').map((line, i) => (
                      <p key={i} className="text-muted-foreground mb-2 text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-muted p-4 rounded-sm border border-border">
            <p className="text-foreground font-medium">Not sure which style to choose?</p>
            <p className="text-muted-foreground">
              Call us and our lash artists will help you select the perfect look for your eye shape and lifestyle.
            </p>
          </div>
        </div>
      );
    }

    if (answer.includes('1. Keep them dry for the first 24 hours')) {
      return formatNumberedList(
        answer,
        'For beautiful, long-lasting lash extensions, please follow these care instructions:',
        'If you have any questions'
      );
    }

    if (answer.includes('1. Arrive with clean, makeup-free eyes')) {
      return formatNumberedList(
        answer,
        'To ensure the best results from your lash extensions, please follow these pre-appointment guidelines:',
        'If you have any questions or need to reschedule'
      );
    }

    return <div className="text-muted-foreground whitespace-pre-line">{answer}</div>;
  };

  return (
    <section id="faq" className="py-16 section-base border-t border-border">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-10">Frequently Asked Questions</h2>
        <div className="max-w-5xl mx-auto">
          <div className="w-full space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="mb-3 border border-border rounded-sm overflow-hidden bg-card transition-colors hover:border-foreground/30"
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={`faq-trigger-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => toggle(index)}
                      className={cn(
                        'flex w-full items-start justify-between gap-4 px-6 py-4 text-left text-lg font-medium',
                        'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                      )}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={cn(
                          'text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200',
                          isOpen && 'rotate-180'
                        )}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    hidden={!isOpen}
                  >
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                      {renderAnswer(faq.answer)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-muted p-6 rounded-lg border border-border">
            <p className="text-foreground font-medium tracking-wide">Still not sure which lash style to book?</p>
            <p className="text-muted-foreground mt-2">
              Call us for free, personalised advice — we&apos;ll recommend the right full set for your eye shape and lifestyle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
