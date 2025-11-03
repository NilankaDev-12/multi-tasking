import SavingsItem from "./SavingsItem";

const SavingsList = ({ savings, loading, onUpdate, onDelete, onDeleteAll }) => {
  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-white">Loading savings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Savings</h2>
        <div className="flex items-center space-x-4">
          <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
            {savings.length} {savings.length === 1 ? 'saving' : 'savings'}
          </span>
          {savings.length > 0 && (
            <button
              onClick={onDeleteAll}
              className="bg-red-600/20 text-red-300 hover:bg-red-600/30 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {savings.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Savings Yet</h3>
          <p className="text-gray-400">Add your first savings to get started!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {savings.map((saving) => (
            <SavingsItem
              key={saving._id}
              saving={saving}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavingsList;