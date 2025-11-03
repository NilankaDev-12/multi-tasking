// components/TodoForm.js
import { useState } from "react";

const TodoForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    const success = await onSubmit(formData);
    if (success) {
      setFormData({ title: "", description: "" });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Create New Todo</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
            placeholder="Enter todo title"
            disabled={loading}
          />
        </div>

        {/* Description Input */}
        <div className="group">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm resize-none"
            placeholder="Enter todo description"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.title.trim() || !formData.description.trim()}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform ${
            loading || !formData.title.trim() || !formData.description.trim()
              ? 'bg-gray-600 cursor-not-allowed scale-95'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl active:scale-95'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            {loading && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>{loading ? "Creating..." : "Create Todo"}</span>
          </div>
        </button>
      </form>
    </div>
  );
};

export default TodoForm;