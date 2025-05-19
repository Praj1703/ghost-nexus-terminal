
import { useEffect, useState } from 'react';
import TypeWriter from '../components/TypeWriter';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [systemCheckComplete, setSystemCheckComplete] = useState(false);
  const [identityComplete, setIdentityComplete] = useState(false);
  const [navigationComplete, setNavigationComplete] = useState(false);

  return (
    <div className="terminal-content">
      <h1 className="text-xl sm:text-2xl md:text-3xl mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <TypeWriter 
          text="Welcome, Operator.undefined_" 
          speed={70} 
          onComplete={() => setWelcomeComplete(true)}
        />
      </h1>

      {welcomeComplete && (
        <div className="mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <TypeWriter 
            text="System: KernelGhost Nexus Online.undefined_" 
            delay={500} 
            speed={60}
            onComplete={() => setSystemCheckComplete(true)}
          />
        </div>
      )}

      {systemCheckComplete && (
        <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <TypeWriter 
            text="Identity: Prajwal · thekernelghost_" 
            delay={500} 
            speed={60}
            onComplete={() => setIdentityComplete(true)}
          />
        </div>
      )}

      {identityComplete && (
        <div className="mb-16 opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h2 className="mb-6 text-lg md:text-xl">
            <TypeWriter 
              text="Navigate the Core:" 
              delay={500} 
              speed={60}
              onComplete={() => setNavigationComplete(true)}
            />
          </h2>
          
          {navigationComplete && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Link to="/about" className="terminal-window p-6 hover:bg-muted/10 transition-colors group">
                <h3 className="flex items-center text-lg mb-2 group-hover:text-terminal-blue">
                  01_About <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="opacity-70">Access the encrypted profile of KernelGhost</p>
              </Link>
              
              <Link to="/projects" className="terminal-window p-6 hover:bg-muted/10 transition-colors group">
                <h3 className="flex items-center text-lg mb-2 group-hover:text-terminal-blue">
                  02_Operations <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="opacity-70">Explore past and active operations</p>
              </Link>
              
              <Link to="/blog" className="terminal-window p-6 hover:bg-muted/10 transition-colors group">
                <h3 className="flex items-center text-lg mb-2 group-hover:text-terminal-blue">
                  03_Mission_Logs <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="opacity-70">Browse intercepted transmissions and discoveries</p>
              </Link>
              
              <Link to="/contact" className="terminal-window p-6 hover:bg-muted/10 transition-colors group">
                <h3 className="flex items-center text-lg mb-2 group-hover:text-terminal-blue">
                  04_Connect_Securely <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="opacity-70">Establish a secure communication line</p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
