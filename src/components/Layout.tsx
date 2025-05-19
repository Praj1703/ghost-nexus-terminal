
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ParticleBackground from "./ParticleBackground";
import { Code, Search, Menu, X } from "lucide-react";

interface LayoutProps {
  toggleTheme: () => void;
  isRed: boolean;
}

const Layout = ({ toggleTheme, isRed }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour12: false });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const navItems = [
    { path: "/", label: "Terminal" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Operations" },
    { path: "/blog", label: "Mission_Logs" },
    { path: "/contact", label: "Connect_Securely" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground />
      
      <header className="terminal-window sticky top-0 z-50 mb-4">
        <div className="terminal-header">
          <div className="flex gap-2">
            <div className="terminal-button terminal-close"></div>
            <div className="terminal-button terminal-minimize"></div>
            <div className="terminal-button terminal-maximize"></div>
          </div>
          <div className="ml-4 text-xs">KernelGhost Nexus :: {formatDate(currentTime)} :: {formatTime(currentTime)}</div>
          <div className="ml-auto flex gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleTheme} 
              className="text-xs"
            >
              TERM_MODE: {isRed ? "ALERT" : "SECURE"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>
        </div>
        
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-4 p-4 border-b border-terminal-green ${isRed ? 'border-terminal-red' : 'border-terminal-green'}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`terminal-prompt ${isActive(item.path) ? 'font-bold' : 'opacity-70 hover:opacity-100'} transition-opacity`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="flex-1 container px-4 pb-12">
        <Outlet />
      </main>

      <footer className="terminal-window mt-8 py-4 text-center text-sm opacity-70">
        <p>© {new Date().getFullYear()} KernelGhost :: All rights encrypted :: <Code className="inline h-4 w-4" /></p>
      </footer>
    </div>
  );
};

export default Layout;
