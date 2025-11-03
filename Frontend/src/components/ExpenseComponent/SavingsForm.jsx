import { useState } from "react";
import { toast } from "react-toastify";

const SavingsForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    description: "",
    amount: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.amount) {
      toast.error("Please fill all fields");
      return;
    }

    const success = await onSubmit({
      description: formData.description,
      amount: parseFloat(formData.amount)
    });

    if (success) {
      setFormData({ description: "", amount: "" });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Add New Savings</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-gray-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter savings description"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full px-4 py-3 bg-white/10 border border-gray-600/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="0.00"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !formData.description.trim() || !formData.amount}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-2xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding Savings...
            </div>
          ) : (
            "Add Savings"
          )}
        </button>
      </form>
    </div>
  );
};

export default SavingsForm;