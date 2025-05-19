
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import TypeWriter from '../components/TypeWriter';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
}

const fetchRepositories = async () => {
  // Replace with your GitHub username
  const username = 'yourusername';
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};

const Projects = () => {
  const [titleComplete, setTitleComplete] = useState(false);
  const [descComplete, setDescComplete] = useState(false);

  const { data: repositories, isLoading, error } = useQuery({
    queryKey: ['repositories'],
    queryFn: fetchRepositories,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fallback repositories in case GitHub API fails or for development
  const fallbackRepos = [
    {
      id: 1,
      name: "secure-auth-system",
      description: "A zero-knowledge authentication system with biometric verification and encrypted session management.",
      html_url: "#",
      homepage: "",
      stargazers_count: 42,
      forks_count: 15,
      language: "TypeScript",
      topics: ["security", "authentication", "encryption"]
    },
    {
      id: 2,
      name: "neural-pattern-detector",
      description: "ML-powered anomaly detection system for identifying suspicious network patterns and potential intrusions.",
      html_url: "#",
      homepage: "",
      stargazers_count: 28,
      forks_count: 7,
      language: "Python",
      topics: ["machine-learning", "security", "network"]
    },
    {
      id: 3,
      name: "quantum-key-exchange",
      description: "Experimental implementation of quantum key distribution protocols for truly secure communication.",
      html_url: "#",
      homepage: "",
      stargazers_count: 53,
      forks_count: 12,
      language: "Rust",
      topics: ["cryptography", "quantum", "security"]
    },
  ];

  // Use fallback repos for development/demo or if the GitHub API call fails
  const projectData = repositories || fallbackRepos;

  return (
    <div className="terminal-content">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6">
        <TypeWriter 
          text="Explore Operations" 
          speed={50}
          onComplete={() => setTitleComplete(true)}
        />
      </h1>

      {titleComplete && (
        <div className="mb-10 opacity-0 animate-fade-in">
          <TypeWriter 
            text="Accessing mission database... Decrypting operation files..." 
            delay={500}
            speed={30}
            onComplete={() => setDescComplete(true)}
          />
        </div>
      )}

      {descComplete && (
        <>
          {isLoading ? (
            <div className="terminal-window p-6">
              <p className="terminal-prompt animate-pulse">Establishing secure connection to repositories...</p>
            </div>
          ) : error ? (
            <div className="terminal-window p-6 border-destructive">
              <p className="text-destructive terminal-prompt">Connection failed. Using cached data instead.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
              {projectData.map((repo, index) => (
                <div 
                  key={repo.id} 
                  className="terminal-window p-6"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h2 className="text-xl font-bold mb-2 md:mb-0">
                      <span className="opacity-50 mr-2">#{(index + 1).toString().padStart(2, '0')}</span>
                      {repo.name.replace(/-/g, '_')}
                    </h2>
                    <div className="flex items-center space-x-3 text-xs">
                      {repo.language && (
                        <span className="py-1 px-2 rounded border border-terminal-green">
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center">
                        <span className="mr-1">★</span> {repo.stargazers_count}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⑂</span> {repo.forks_count}
                      </span>
                    </div>
                  </div>
                  
                  <p className="mb-4 opacity-80">{repo.description}</p>
                  
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {repo.topics.map(topic => (
                          <span key={topic} className="text-xs py-1 px-2 bg-muted rounded">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Github className="mr-2 h-4 w-4" /> View Source
                      </a>
                    </Button>
                    
                    {repo.homepage && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;
