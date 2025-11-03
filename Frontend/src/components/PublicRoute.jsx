import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api/axios";

const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await api.get("/auth/profile");
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  
  // If user is authenticated, redirect to todo page
  // If not authenticated, show the login/signup page
  return isAuth ? <Navigate to="/todo" replace /> : children;
};

export default PublicRoute;