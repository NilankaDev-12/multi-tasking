import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { api } from "../api/axios";

const ProtectedRoute = () => {
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

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <p className="text-white text-xl font-medium flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/30">
          <span className="flex space-x-1">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
            <span
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
          </span>
          <span>Loading</span>
          <span className="flex">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
              .
            </span>
            <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
              .
            </span>
          </span>
        </p>
      </div>
    );
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
