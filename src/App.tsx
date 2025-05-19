
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => {
  const [isRed, setIsRed] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("terminal-theme");
    if (savedTheme) {
      setIsRed(savedTheme === "red");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isRed;
    setIsRed(newTheme);
    localStorage.setItem("terminal-theme", newTheme ? "red" : "green");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={isRed ? "terminal-red" : ""}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout toggleTheme={toggleTheme} isRed={isRed} />}>
                <Route index element={<Index />} />
                <Route path="about" element={<About />} />
                <Route path="projects" element={<Projects />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:slug" element={<BlogPost />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
