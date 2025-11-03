// components/Navbar.js
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/todo", name: "Todo" },
    { path: "/expenseTracker", name: "Expense Tracker" }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                {/* Advanced DevOps Logo */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 rounded-2xl shadow-2xl flex items-center justify-center relative group overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-400/30 group-hover:from-blue-500/40 group-hover:via-purple-500/30 group-hover:to-cyan-400/40 transition-all duration-700"></div>
                  
                  {/* Main Logo Icon */}
                  <div className="relative z-10">
                    <svg 
                      className="w-7 h-7 text-white transform group-hover:scale-110 transition-all duration-500" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor"
                    >
                      {/* Cloud Infrastructure */}
                      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeWidth="1.2" className="stroke-white/90"/>
                      
                      {/* Server Cluster */}
                      <rect x="3" y="6" width="4" height="4" rx="0.5" strokeWidth="1.2" className="stroke-cyan-300" fill="url(#serverGrad)"/>
                      <rect x="8" y="6" width="4" height="4" rx="0.5" strokeWidth="1.2" className="stroke-cyan-300" fill="url(#serverGrad)"/>
                      <rect x="13" y="6" width="4" height="4" rx="0.5" strokeWidth="1.2" className="stroke-cyan-300" fill="url(#serverGrad)"/>
                      
                      {/* CI/CD Pipeline Flow */}
                      <path d="M5 12L7 10L9 12" strokeWidth="1.5" className="stroke-green-400" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 12L13 10L15 12" strokeWidth="1.5" className="stroke-green-400" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M17 12L19 10L21 12" strokeWidth="1.5" className="stroke-green-400" strokeLinecap="round" strokeLinejoin="round"/>
                      
                      {/* Kubernetes/Container Dots */}
                      <circle cx="5" cy="15" r="0.6" fill="#60A5FA" className="animate-pulse"/>
                      <circle cx="8" cy="15" r="0.6" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '0.2s'}}/>
                      <circle cx="11" cy="15" r="0.6" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '0.4s'}}/>
                      <circle cx="14" cy="15" r="0.6" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '0.6s'}}/>
                      <circle cx="17" cy="15" r="0.6" fill="#60A5FA" className="animate-pulse" style={{animationDelay: '0.8s'}}/>
                      
                      {/* Network Connections */}
                      <line x1="5" y1="10" x2="5" y2="14.4" strokeWidth="1" className="stroke-blue-400/60"/>
                      <line x1="8" y1="10" x2="8" y2="14.4" strokeWidth="1" className="stroke-blue-400/60"/>
                      <line x1="11" y1="10" x2="11" y2="14.4" strokeWidth="1" className="stroke-blue-400/60"/>
                      <line x1="14" y1="10" x2="14" y2="14.4" strokeWidth="1" className="stroke-blue-400/60"/>
                      <line x1="17" y1="10" x2="17" y2="14.4" strokeWidth="1" className="stroke-blue-400/60"/>
                      
                      {/* Automation Gear */}
                      <circle cx="20" cy="17" r="2" strokeWidth="1" className="stroke-yellow-400/80" fill="none"/>
                      <path d="M20 15L20 15.5M22 17L21.5 17M20 19L20 18.5M18 17L18.5 17" strokeWidth="1.5" className="stroke-yellow-400"/>
                      
                      <defs>
                        <linearGradient id="serverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-1 h-1 bg-cyan-400/40 rounded-full top-2 left-3 group-hover:animate-float"></div>
                    <div className="absolute w-1 h-1 bg-purple-400/40 rounded-full top-3 right-2 group-hover:animate-float" style={{animationDelay: '1s'}}></div>
                    <div className="absolute w-1 h-1 bg-blue-400/40 rounded-full bottom-2 left-2 group-hover:animate-float" style={{animationDelay: '2s'}}></div>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                {/* Brand Name */}
                <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent font-['Poppins'] font-semibold tracking-tight">
                  Nilanka Production
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 font-['Poppins'] ${
                    isActivePath(item.path)
                      ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white border border-cyan-400/50 shadow-2xl shadow-cyan-500/30 backdrop-blur-sm"
                      : "text-gray-300 hover:text-white hover:bg-white/10 hover:border hover:border-cyan-400/20 border border-transparent"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-cyan-500/20">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-4 rounded-2xl text-base font-medium transition-all duration-300 font-['Poppins'] ${
                  isActivePath(item.path)
                    ? "bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white border border-cyan-400/50 shadow-2xl shadow-cyan-500/30 backdrop-blur-sm"
                    : "text-gray-300 hover:text-white hover:bg-white/10 hover:border hover:border-cyan-400/20 border border-transparent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;