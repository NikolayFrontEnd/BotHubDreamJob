
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setIsAuthenticated(false); 
    window.location.reload(); 
  };

  return { isAuthenticated, handleLogin, handleLogout };
};
