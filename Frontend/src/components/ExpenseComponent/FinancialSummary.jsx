const FinancialSummary = ({ expenses, savings }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalSavings = savings.reduce((sum, saving) => sum + saving.amount, 0);
  const balance = totalSavings - totalExpenses;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 mb-8">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Financial Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-500/20 rounded-2xl p-6 text-center border border-red-500/30 hover:border-red-500/50 transition-all duration-200">
          <div className="text-3xl font-bold text-red-300 mb-2">₹{totalExpenses.toFixed(2)}</div>
          <div className="text-red-200 text-lg">Total Expenses</div>
          <div className="text-red-300 text-sm mt-2">
            {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
          </div>
        </div>

        <div className="bg-green-500/20 rounded-2xl p-6 text-center border border-green-500/30 hover:border-green-500/50 transition-all duration-200">
          <div className="text-3xl font-bold text-green-300 mb-2">₹{totalSavings.toFixed(2)}</div>
          <div className="text-green-200 text-lg">Total Savings</div>
          <div className="text-green-300 text-sm mt-2">
            {savings.length} {savings.length === 1 ? 'saving' : 'savings'}
          </div>
        </div>

        <div className={`rounded-2xl p-6 text-center border hover:border-opacity-50 transition-all duration-200 ${
          balance >= 0 
            ? 'bg-green-500/20 border-green-500/30 hover:border-green-500/50' 
            : 'bg-red-500/20 border-red-500/30 hover:border-red-500/50'
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            balance >= 0 ? 'text-green-300' : 'text-red-300'
          }`}>
            ₹{Math.abs(balance).toFixed(2)}
          </div>
          <div className={balance >= 0 ? 'text-green-200 text-lg' : 'text-red-200 text-lg'}>
            {balance >= 0 ? 'Net Balance' : 'Net Deficit'}
          </div>
          <div className={`text-sm mt-2 ${
            balance >= 0 ? 'text-green-300' : 'text-red-300'
          }`}>
            {balance >= 0 ? '🎉 You are saving!' : '⚠️ Spending exceeds savings'}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>Expenses: ₹{totalExpenses.toFixed(2)}</span>
          <span>Savings: ₹{totalSavings.toFixed(2)}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ 
              width: `${totalSavings + totalExpenses > 0 ? (totalSavings / (totalSavings + totalExpenses)) * 100 : 0}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;