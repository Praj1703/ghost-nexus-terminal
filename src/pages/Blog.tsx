
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TypeWriter from '../components/TypeWriter';
import { ArrowRight } from 'lucide-react';

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    slug: 'understanding-zero-day-vulnerabilities',
    title: 'Understanding Zero-Day Vulnerabilities',
    date: '2023-05-15',
    excerpt: 'An analysis of recent zero-day exploits and defensive strategies for modern systems.',
    tags: ['security', 'vulnerabilities', 'defense']
  },
  {
    id: 2,
    slug: 'quantum-computing-threat-model',
    title: 'Quantum Computing: A New Threat Model',
    date: '2023-04-22',
    excerpt: 'Exploring the implications of quantum computing on current cryptographic standards and preparing for a post-quantum world.',
    tags: ['quantum', 'cryptography', 'future-tech']
  },
  {
    id: 3,
    slug: 'secure-coding-practices-react',
    title: 'Secure Coding Practices in React',
    date: '2023-03-10',
    excerpt: 'Best practices for building secure React applications and avoiding common security pitfalls.',
    tags: ['react', 'web-security', 'development']
  },
  {
    id: 4,
    slug: 'linux-hardening-techniques',
    title: 'Advanced Linux Hardening Techniques',
    date: '2023-02-05',
    excerpt: 'Step-by-step guide to securing Linux servers in production environments against common attack vectors.',
    tags: ['linux', 'server-security', 'hardening']
  }
];

const Blog = () => {
  const [titleComplete, setTitleComplete] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="terminal-content">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6">
        <TypeWriter 
          text="Mission Logs" 
          speed={50}
          onComplete={() => setTitleComplete(true)}
        />
      </h1>

      {titleComplete && (
        <div className="mb-10 opacity-0 animate-fade-in">
          <TypeWriter 
            text="Accessing encrypted transmissions... Decoding content..." 
            delay={500}
            speed={30}
            onComplete={() => setIntroComplete(true)}
          />
        </div>
      )}

      {introComplete && (
        <div className="space-y-8 opacity-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
          {blogPosts.map((post, index) => (
            <Link 
              key={post.id}
              to={`/blog/${post.slug}`}
              className="terminal-window block p-6 hover:bg-muted/10 transition-colors group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <h2 className="text-xl font-bold group-hover:text-terminal-blue transition-colors flex items-center">
                  {post.title}
                  <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <span className="text-sm opacity-70">{post.date}</span>
              </div>
              <p className="mb-4 opacity-80">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs py-1 px-2 bg-muted rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
