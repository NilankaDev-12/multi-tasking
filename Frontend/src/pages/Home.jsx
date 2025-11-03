import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  const features = [
    {
      icon: "📝",
      title: "Todo Manager",
      description: "Organize tasks and boost productivity"
    },
    {
      icon: "💰",
      title: "Expense Tracker",
      description: "Manage your finances efficiently"
    },
    {
      icon: "🎯",
      title: "Productivity Suite",
      description: "All-in-one productivity solution"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Welcome Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-8">
          <div className="text-center">
            {/* Simple Logo without Glass Effect */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-6">
              <div className="text-2xl md:text-3xl font-bold">🚀</div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-4 font-['Poppins']">
              Welcome Home
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-2 font-['Poppins'] font-light">
              Nilanka Roy Production
            </p>
            
            <p className="text-lg md:text-xl text-cyan-200 mb-8 font-['Poppins']">
              Multi-Tasking Application Suite
            </p>

            {/* Description */}
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
                A powerful productivity suite designed to streamline your daily tasks 
                and manage your finances with modern technology and intuitive design.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 font-['Poppins']">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-500/20 rounded-2xl p-4 text-center border border-blue-500/30">
              <div className="text-2xl font-bold text-white">2</div>
              <div className="text-blue-300 text-sm">Features</div>
            </div>
            <div className="bg-purple-500/20 rounded-2xl p-4 text-center border border-purple-500/30">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-purple-300 text-sm">Available</div>
            </div>
            <div className="bg-cyan-500/20 rounded-2xl p-4 text-center border border-cyan-500/30">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-cyan-300 text-sm">Secure</div>
            </div>
            <div className="bg-green-500/20 rounded-2xl p-4 text-center border border-green-500/30">
              <div className="text-2xl font-bold text-white">Modern</div>
              <div className="text-green-300 text-sm">Design</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate("/todo")}
              className="flex-1 max-w-xs mx-auto bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-4 px-8 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-['Poppins'] text-lg"
            >
              Explore Todo App
            </button>
            
            <button 
              onClick={() => navigate("/expenseTracker")}
              className="flex-1 max-w-xs mx-auto bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-4 px-8 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-['Poppins'] text-lg"
            >
              Go to Expense Tracker
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex-1 max-w-xs mx-auto bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-4 px-8 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-['Poppins'] text-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Built with modern technologies • Secure & Scalable • User-Friendly Design
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;