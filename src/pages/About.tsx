
import { useState } from 'react';
import TypeWriter from '../components/TypeWriter';

const About = () => {
  const [titleComplete, setTitleComplete] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [statsComplete, setStatsComplete] = useState(false);

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "TailwindCSS"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "Django"] },
    { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Kubernetes"] },
    { category: "Security", items: ["Penetration Testing", "OWASP", "Network Security", "Cryptography"] },
  ];

  return (
    <div className="terminal-content">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2">
          <TypeWriter 
            text="// CONFIDENTIAL PROFILE" 
            speed={50}
            onComplete={() => setTitleComplete(true)}
          />
        </h1>
        <p className="text-xs opacity-50">ACCESS LEVEL: TOP SECRET</p>
      </div>

      {titleComplete && (
        <div className="mb-12 opacity-0 animate-fade-in">
          <div className="terminal-window p-6 mb-8">
            <TypeWriter 
              text="Identity: KernelGhost - Security researcher, developer, and digital explorer operating in the shadows of the web. Specializing in system architecture, secure communications, and vulnerability assessment. Current mission: Building secure and elegant solutions for complex problems." 
              delay={500}
              speed={30}
              onComplete={() => setIntroComplete(true)}
            />
          </div>
        </div>
      )}

      {introComplete && (
        <div className="mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl mb-4 terminal-prompt">System Stats</h2>
          <TypeWriter 
            text="Initializing core skill assessment..." 
            delay={300}
            speed={30}
            onComplete={() => setStatsComplete(true)}
            className="block mb-6"
          />
          
          {statsComplete && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
              {skills.map((skillGroup, index) => (
                <div 
                  key={skillGroup.category} 
                  className="terminal-window p-4"
                  style={{ animationDelay: `${index * 200 + 200}ms` }}
                >
                  <h3 className="mb-2 text-terminal-blue font-bold">{skillGroup.category}/</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {skillGroup.items.map((skill, idx) => (
                      <div key={idx} className="flex items-center">
                        <span className="text-sm mr-2">$</span>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {statsComplete && (
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h2 className="text-xl mb-4 terminal-prompt">Mission Statement</h2>
          <div className="terminal-window p-6">
            <p className="mb-4">
              Operating in the digital realm since [REDACTED], KernelGhost has been dedicated to the pursuit of elegant, secure, and efficient technological solutions.
            </p>
            <p>
              Primary mission objectives include:
            </p>
            <ul className="ml-6 mt-2 space-y-2">
              <li className="terminal-prompt">Developing cutting-edge web applications</li>
              <li className="terminal-prompt">Researching security vulnerabilities</li>
              <li className="terminal-prompt">Sharing knowledge through encrypted communications</li>
              <li className="terminal-prompt">Exploring the uncharted territories of emerging tech</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
