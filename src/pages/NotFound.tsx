
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import TypeWriter from "../components/TypeWriter";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="terminal-content flex flex-col items-center justify-center text-center py-16">
      <h1 className="text-4xl mb-8">
        <TypeWriter text="ERROR 404: LOCATION NOT FOUND" speed={50} />
      </h1>
      
      <div className="terminal-window p-8 max-w-lg mx-auto mb-8">
        <p className="mb-6 opacity-80">The requested resource could not be located on this server.</p>
        <pre className="bg-muted p-4 text-left mb-6 overflow-auto">
          {`
> ACCESS ${location.pathname}
> SCANNING...
> LOCATION NOT FOUND
> SYSTEM RETURNED: ERROR 404
          `}
        </pre>
        <p className="opacity-80">Return to a known secure location to continue operations.</p>
      </div>
      
      <Link to="/" className="terminal-link flex items-center">
        <Home className="mr-2 h-5 w-5" /> Return to Terminal
      </Link>
    </div>
  );
};

export default NotFound;
