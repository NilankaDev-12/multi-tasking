import TodoItem from "./TodoItem";

const TodoList = ({ todos, loading, onUpdate, onDelete, searchTerm, onSearchChange }) => {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 h-full">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-white">Loading todos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 h-full flex flex-col">
      {/* Header with Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-white">Your Todos</h2>
          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
            {todos.length} {todos.length === 1 ? 'todo' : 'todos'}
          </span>
        </div>
        
        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-gray-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            placeholder="Search todos..."
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="w-4 h-4 text-gray-400 hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Todo List with proper scrolling */}
      {todos.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm ? "No matching todos" : "No Todos Yet"}
            </h3>
            <p className="text-gray-400">
              {searchTerm ? "Try a different search term" : "Create your first todo to get started!"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;