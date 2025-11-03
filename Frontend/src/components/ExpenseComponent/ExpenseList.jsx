import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({ expenses, loading, onUpdate, onDelete, onDeleteAll }) => {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-white">Loading expenses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Expenses</h2>
        <div className="flex items-center space-x-4">
          <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
          </span>
          {expenses.length > 0 && (
            <button
              onClick={onDeleteAll}
              className="bg-red-600/20 text-red-300 hover:bg-red-600/30 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Expenses Yet</h3>
          <p className="text-gray-400">Add your first expense to get started!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;