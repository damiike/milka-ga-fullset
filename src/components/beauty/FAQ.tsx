import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FAQProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

const LashTypeCard = ({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) => (
  <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 h-full">
    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-48 object-cover"
      />
    </div>
    <CardHeader>
      <CardTitle className="text-xl font-serif">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="prose prose-sm">
        {description.split('\n').map((line, i) => (
          <p key={i} className="mb-2">{line}</p>
        ))}
      </div>
    </CardContent>
  </Card>
);

const formatNumberedList = (answer: string, introText: string, additionalInfoStartsWith: string) => {
  const instructions = answer
    .split('\n')
    .filter(line => line.match(/^\d+\./)) // Only get numbered list items
    .map(line => line.replace(/^\d+\.\s*/, '').trim());
  
  const additionalInfo = answer
    .split('\n')
    .find(line => line.includes(additionalInfoStartsWith));
  
  return (
    <div className="space-y-6">
      <p className="text-gray-700">
        {introText}
      </p>
      <ul className="space-y-3 pl-5 list-decimal">
        {instructions.map((instruction, index) => (
          <li key={index} className="text-gray-700">
            {instruction}
          </li>
        ))}
      </ul>
      {additionalInfo && (
        <p className="text-gray-700 mt-6">
          {additionalInfo}
        </p>
      )}
    </div>
  );
};

export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const renderAnswer = (answer: string) => {
    // Special handling for lash types FAQ
    if (answer.includes('### 1. Classic Lashes')) {
      const lashTypes = answer.split('### ').slice(1);
      
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lashTypes.map((type, index) => {
              const [title, ...rest] = type.split('\n').filter(Boolean);
              const description = rest.filter(line => !line.startsWith('**') && !line.includes('![')).join('\n');
              const imageMatch = rest.find(line => line.includes('!['));
              const imageUrl = imageMatch ? imageMatch.match(/\]\((.*?)\)/)?.[1] : '';
              
              return (
                <LashTypeCard
                  key={index}
                  title={title.replace(/^\d+\.\s*/, '')}
                  description={description}
                  imageUrl={imageUrl || '/images/placeholder-lash.jpg'}
                />
              );
            })}
          </div>
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-100">
            <p className="text-pink-800 font-medium">Not sure which style to choose?</p>
            <p className="text-pink-700">Book a consultation and our lash artists will help you select the perfect look for your eye shape and lifestyle!</p>
          </div>
        </div>
      );
    }
    
    // Special handling for care instructions FAQ
    if (answer.includes('1. Keep them dry for the first 24 hours')) {
      return formatNumberedList(
        answer,
        'For beautiful, long-lasting lash extensions, please follow these care instructions:',
        'If you have any questions'
      );
    }
    
    // Special handling for pre-appointment instructions
    if (answer.includes('1. Arrive with clean, makeup-free eyes')) {
      return formatNumberedList(
        answer,
        'To ensure the best results from your lash extensions, please follow these pre-appointment guidelines:',
        'If you have any questions or need to reschedule'
      );
    }
    
    // Default rendering for other FAQs
    return <div className="prose max-w-none">{answer}</div>;
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-0"
                >
                <AccordionTrigger className="px-6 py-4 text-lg font-medium text-left hover:no-underline hover:bg-gray-50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-600">
                  {renderAnswer(faq.answer)}
                </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
