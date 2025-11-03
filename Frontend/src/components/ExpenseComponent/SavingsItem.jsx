import { useState } from "react";
import { toast } from "react-toastify";

const SavingsItem = ({ saving, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: saving.description,
    amount: saving.amount.toString()
  });
  const [updating, setUpdating] = useState(false);

  const handleSave = async () => {
    if (!editData.description.trim() || !editData.amount) {
      toast.error("Description and amount are required");
      return;
    }

    setUpdating(true);
    const success = await onUpdate(saving._id, {
      description: editData.description,
      amount: parseFloat(editData.amount)
    });
    
    if (success) {
      setIsEditing(false);
    }
    setUpdating(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      description: saving.description,
      amount: saving.amount.toString()
    });
  };

  const handleDelete = () => {
    onDelete(saving._id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-green-500/30 p-4 hover:border-green-500/50 transition-all duration-200">
      {isEditing ? (
        <div className="space-y-3" onKeyDown={handleKeyPress}>
          <input
            type="text"
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            className="w-full px-3 py-2 bg-white/10 border border-gray-500 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Savings description"
            autoFocus
          />
          <input
            type="number"
            step="0.01"
            value={editData.amount}
            onChange={(e) => setEditData({...editData, amount: e.target.value})}
            className="w-full px-3 py-2 bg-white/10 border border-gray-500 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="0.00"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={updating || !editData.description.trim() || !editData.amount}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {updating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={updating}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center">
            Press Ctrl+Enter to save, Esc to cancel
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-white text-lg">{saving.description}</h3>
            <p className="text-green-300 font-medium">₹{saving.amount.toFixed(2)}</p>
            <p className="text-gray-400 text-xs mt-1">
              {new Date(saving.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 p-2 rounded-lg transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600/20 text-red-300 hover:bg-red-600/30 p-2 rounded-lg transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavingsItem;