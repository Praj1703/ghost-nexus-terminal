
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TypeWriter from '../components/TypeWriter';
import { ArrowLeft } from 'lucide-react';

// Sample blog posts data (in a real app, this would come from an API or CMS)
const blogPostsData = {
  'understanding-zero-day-vulnerabilities': {
    title: 'Understanding Zero-Day Vulnerabilities',
    date: '2023-05-15',
    author: 'KernelGhost',
    content: `
# Understanding Zero-Day Vulnerabilities

In the realm of cybersecurity, few terms evoke as much concern as "zero-day vulnerability." These elusive security flaws represent one of the most significant challenges for security professionals and organizations alike.

## What Defines a Zero-Day?

A zero-day vulnerability refers to a security flaw in software or hardware that is unknown to the parties responsible for patching or otherwise fixing the issue. The term "zero-day" refers to the fact that developers have had zero days to address and patch the flaw.

\`\`\`
Vulnerability Lifecycle:
1. Discovery (by researchers or attackers)
2. Exploitation begins
3. Discovery by security community
4. Patch development
5. Patch deployment
\`\`\`

## The Danger Factor

What makes zero-days particularly dangerous is that they can be exploited before defenders have any knowledge of their existence. This gives attackers a significant advantage, as they can leverage these vulnerabilities without fear of immediate remediation.

## Recent Examples

The past few years have seen several high-profile zero-day vulnerabilities:

- Log4Shell (CVE-2021-44228)
- Microsoft Exchange Server vulnerabilities (ProxyLogon)
- Chrome V8 engine vulnerabilities

## Defensive Strategies

While zero-days are, by definition, unknown until exploited, organizations can take steps to minimize their impact:

1. **Defense in Depth**: Multiple layers of security controls
2. **Behavior-Based Detection**: Look for unusual system behavior
3. **Least Privilege Principle**: Limit what systems and users can do
4. **Regular Updates**: Keep all systems current
5. **Threat Intelligence**: Stay informed about emerging threats

Remember, in cybersecurity, the question isn't if you'll face a zero-day, but when. Preparation is key.
    `,
    tags: ['security', 'vulnerabilities', 'defense']
  },
  'quantum-computing-threat-model': {
    title: 'Quantum Computing: A New Threat Model',
    date: '2023-04-22',
    author: 'KernelGhost',
    content: `
# Quantum Computing: A New Threat Model

As quantum computing transitions from theoretical to practical, the cybersecurity landscape faces an unprecedented shift in threat models.

## The Quantum Revolution

Quantum computers leverage quantum mechanical phenomena to perform operations that would be impossible for classical computers within reasonable timeframes. While still in development, quantum systems with sufficient qubits could break many of today's encryption algorithms.

\`\`\`
Vulnerable Algorithms:
- RSA
- ECC
- DSA
- Diffie-Hellman
\`\`\`

## Shor's Algorithm: The Cryptographic Breaker

Peter Shor's algorithm, when implemented on a sufficient quantum computer, can factor large numbers exponentially faster than the best known classical algorithms. This threatens the foundation of public key cryptography.

## Post-Quantum Cryptography

NIST is currently evaluating algorithms resistant to quantum attacks:

1. **Lattice-based cryptography**
2. **Hash-based signatures**
3. **Code-based cryptography**
4. **Multivariate cryptography**

## Preparing for Q-Day

Organizations should begin quantum readiness planning:

- Inventory cryptographic dependencies
- Implement crypto-agility frameworks
- Monitor quantum computing developments
- Plan migration timelines to PQC
- Consider hybrid approaches in transition

The quantum threat is real, but with proper preparation, organizations can ensure their security posture remains robust in the post-quantum era.
    `,
    tags: ['quantum', 'cryptography', 'future-tech']
  }
  // Additional posts would be added here
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [titleComplete, setTitleComplete] = useState(false);

  useEffect(() => {
    // Simulate API fetch with a small delay
    const timer = setTimeout(() => {
      if (slug && blogPostsData[slug as keyof typeof blogPostsData]) {
        setPost(blogPostsData[slug as keyof typeof blogPostsData]);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="terminal-content">
        <p className="terminal-prompt animate-pulse">Decrypting transmission data...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="terminal-content">
        <div className="terminal-window p-6 border-destructive">
          <h1 className="text-xl text-destructive mb-4">Transmission Not Found</h1>
          <p className="mb-4">The requested log entry could not be decrypted or does not exist.</p>
          <Link to="/blog" className="terminal-link flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Mission Logs
          </Link>
        </div>
      </div>
    );
  }

  // Convert markdown-like content to JSX
  const renderContent = () => {
    // This is a simple renderer - in a real app, use a proper markdown library
    return post.content.split('\n').map((line: string, index: number) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-1">{line.substring(2)}</li>;
      } else if (line.startsWith('```')) {
        return line.length > 3 
          ? <pre key={index} className="bg-muted p-4 rounded my-4 overflow-x-auto"><code>{line.substring(3)}</code></pre>
          : <pre key={index} className="bg-muted p-4 rounded my-4 overflow-x-auto"></pre>;
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="mb-4">{line}</p>;
      }
    });
  };

  return (
    <div className="terminal-content">
      <div className="mb-6">
        <Link to="/blog" className="terminal-link flex items-center mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mission Logs
        </Link>

        <h1 className="text-2xl sm:text-3xl mb-2">
          <TypeWriter 
            text={post.title} 
            speed={30}
            onComplete={() => setTitleComplete(true)}
          />
        </h1>
        
        <div className="flex flex-wrap gap-4 mt-4 mb-8 text-sm opacity-70">
          <span>{post.date}</span>
          <span>By: {post.author}</span>
          <div className="flex gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="terminal-window p-6">
        {titleComplete && (
          <div className="prose prose-invert max-w-none">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
