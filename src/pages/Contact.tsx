
import { useState } from 'react';
import TypeWriter from '../components/TypeWriter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Github, Mail, ArrowRight } from 'lucide-react';

const Contact = () => {
  const [titleComplete, setTitleComplete] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Transmission Received",
      description: "Your message has been securely transmitted. Expect a response within 48 hours.",
    });
    
    setName('');
    setEmail('');
    setMessage('');
    setSubmitting(false);
  };

  return (
    <div className="terminal-content">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6">
        <TypeWriter 
          text="Connect Securely" 
          speed={50}
          onComplete={() => setTitleComplete(true)}
        />
      </h1>

      {titleComplete && (
        <div className="mb-10 opacity-0 animate-fade-in">
          <TypeWriter 
            text="Initializing secure communication channels..." 
            delay={500}
            speed={30}
            onComplete={() => setIntroComplete(true)}
          />
        </div>
      )}

      {introComplete && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="terminal-window p-6">
              <h2 className="text-xl mb-6">Transmission Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 terminal-prompt">Identifier</label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="bg-transparent border-terminal-green text-foreground"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 terminal-prompt">Contact Vector</label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="bg-transparent border-terminal-green text-foreground"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 terminal-prompt">Transmission Content</label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message here..."
                    required
                    className="bg-transparent border-terminal-green text-foreground min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full flex items-center justify-center"
                >
                  {submitting ? (
                    "Encrypting and sending..."
                  ) : (
                    <>
                      Send Secure Transmission <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="terminal-window p-6 mb-6">
              <h2 className="text-xl mb-4">Direct Channels</h2>
              <div className="space-y-4">
                <a 
                  href="mailto:contact@thekernelghost.com" 
                  className="flex items-center terminal-link"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  contact@thekernelghost.com
                </a>
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center terminal-link"
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Profile
                </a>
              </div>
            </div>
            
            <div className="terminal-window p-6">
              <h2 className="text-xl mb-4">Response Time</h2>
              <p className="opacity-80">
                All transmissions are processed within 48 hours. Emergency protocols available for urgent matters.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
