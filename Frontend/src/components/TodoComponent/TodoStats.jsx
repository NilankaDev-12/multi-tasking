// components/TodoStats.js
const TodoStats = ({ todos, onDeleteAll }) => {
  const completedTodos = todos.filter(todo => todo.isCompleted).length;
  const pendingTodos = todos.length - completedTodos;
  const completionRate = todos.length > 0 ? (completedTodos / todos.length) * 100 : 0;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Progress</h2>
      
      {/* Completion Rate */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">Completion Rate</span>
          <span className="text-sm font-medium text-blue-300">
            {Math.round(completionRate)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-blue-300">{todos.length}</div>
          <div className="text-xs text-blue-200/70 mt-1">Total</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-green-300">{completedTodos}</div>
          <div className="text-xs text-green-200/70 mt-1">Completed</div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-yellow-300">{pendingTodos}</div>
          <div className="text-xs text-yellow-200/70 mt-1">Pending</div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 text-center">
          <div className="text-2xl font-bold text-purple-300">
            {todos.length > 0 ? Math.round(completionRate) : 0}%
          </div>
          <div className="text-xs text-purple-200/70 mt-1">Done</div>
        </div>
      </div>

      {/* Delete All Button */}
      {todos.length > 0 && (
        <button
          onClick={onDeleteAll}
          className="w-full bg-red-600/20 text-red-300 hover:bg-red-600/30 border border-red-500/30 py-3 px-4 rounded-xl font-medium transition-colors duration-200"
        >
          Delete All Todos
        </button>
      )}
    </div>
  );
};

export default TodoStats;