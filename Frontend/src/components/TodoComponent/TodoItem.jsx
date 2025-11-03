// components/TodoItem.js (unchanged, but adding custom scrollbar CSS)
import { useState } from "react";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description
  });
  const [updating, setUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setUpdating(true);
    await onUpdate(todo._id, { isCompleted: !todo.isCompleted });
    setUpdating(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      title: todo.title,
      description: todo.description
    });
  };

  const handleSave = async () => {
    if (!editData.title.trim() || !editData.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    setUpdating(true);
    const success = await onUpdate(todo._id, {
      title: editData.title,
      description: editData.description,
      isCompleted: todo.isCompleted // Keep the current completion status
    });
    
    if (success) {
      setIsEditing(false);
    }
    setUpdating(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      title: todo.title,
      description: todo.description
    });
  };

  const handleDelete = () => {
      onDelete(todo._id);
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
    <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border transition-all duration-200 ${
      todo.isCompleted 
        ? 'border-green-500/30 bg-green-500/5' 
        : 'border-gray-600/30 hover:border-gray-500/50'
    } p-4`}>
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3" onKeyDown={handleKeyPress}>
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({...editData, title: e.target.value})}
            className="w-full px-3 py-2 bg-white/10 border border-gray-500 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Todo title"
            autoFocus
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({...editData, description: e.target.value})}
            className="w-full px-3 py-2 bg-white/10 border border-gray-500 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            rows="2"
            placeholder="Todo description"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={updating || !editData.title.trim() || !editData.description.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
        // View Mode
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-semibold text-lg ${
                todo.isCompleted ? 'text-green-300 line-through' : 'text-white'
              }`}>
                {todo.title}
              </h3>
              <p className={`mt-1 text-sm ${
                todo.isCompleted ? 'text-green-200/70' : 'text-gray-300'
              }`}>
                {todo.description}
              </p>
            </div>
            <button
              onClick={handleToggleComplete}
              disabled={updating}
              className={`ml-3 p-2 rounded-lg transition-colors ${
                todo.isCompleted 
                  ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              } disabled:opacity-50`}
              title={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {updating ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {todo.isCompleted ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  )}
                </svg>
              )}
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600/20 text-red-300 hover:bg-red-600/30 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;