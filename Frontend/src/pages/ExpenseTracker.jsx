import { useState, useEffect } from "react";
import { api } from "../api/axios";
import ExpenseForm from "../components/ExpenseComponent/ExpenseForm";
import ExpenseList from "../components/ExpenseComponent/ExpenseList";
import SavingsForm from "../components/ExpenseComponent/SavingsForm";
import SavingsList from "../components/ExpenseComponent/SavingsList";
import FinancialSummary from "../components/ExpenseComponent/FinancialSummary";
import { toast } from "react-toastify";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expensesRes, savingsRes] = await Promise.all([
        api.get("/expense/getAllExpenses"),
        api.get("/savings/getAllSavings")
      ]);
      setExpenses(expensesRes.data.expenses || []);
      setSavings(savingsRes.data.savings || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createExpense = async (expenseData) => {
    setFormLoading(true);
    try {
      const response = await api.post("/expense/createExpense", expenseData);
      setExpenses(prev => [response.data.expense, ...prev]);
      toast.success("Expense added successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to add expense");
      return false;
    } finally {
      setFormLoading(false);
    }
  };

  const updateExpense = async (id, updates) => {
    try {
      const response = await api.put(`/expense/updateExpense/${id}`, updates);
      setExpenses(prev => 
        prev.map(expense => 
          expense._id === id ? { ...expense, ...response.data.expense } : expense
        )
      );
      toast.success("Expense updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update expense");
      return false;
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expense/deleteSingleExpense/${id}`);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
      toast.success("Expense deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const deleteAllExpenses = async () => {
    try {
      await api.delete("/expense/deleteAllExpenses");
      setExpenses([]);
      toast.success("All expenses deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete all expenses");
    }
  };

  const createSaving = async (savingData) => {
    setFormLoading(true);
    try {
      const response = await api.post("/savings/createSavings", savingData);
      setSavings(prev => [response.data.saving, ...prev]);
      toast.success("Savings added successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to add savings");
      return false;
    } finally {
      setFormLoading(false);
    }
  };

  const updateSaving = async (id, updates) => {
    try {
      const response = await api.put(`/savings/updateSavings/${id}`, updates);
      setSavings(prev => 
        prev.map(saving => 
          saving._id === id ? { ...saving, ...response.data.saving } : saving
        )
      );
      toast.success("Savings updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update savings");
      return false;
    }
  };

  const deleteSaving = async (id) => {
    try {
      await api.delete(`/savings/deleteSingleSavings/${id}`);
      setSavings(prev => prev.filter(saving => saving._id !== id));
      toast.success("Savings deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete savings");
    }
  };

  const deleteAllSavings = async () => {
    try {
      await api.delete("/savings/deleteAllSavings");
      setSavings([]);
      toast.success("All savings deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete all savings");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-2xl mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Financial Manager
          </h1>
          <p className="text-gray-400 mt-2 font-light">
            Track your expenses and savings in one place
          </p>
        </div>

        <FinancialSummary expenses={expenses} savings={savings} />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
          <div className="space-y-6">
            <ExpenseForm 
              onSubmit={createExpense} 
              loading={formLoading}
            />
            <ExpenseList
              expenses={expenses}
              loading={loading}
              onUpdate={updateExpense}
              onDelete={deleteExpense}
              onDeleteAll={deleteAllExpenses}
            />
          </div>

          <div className="space-y-6">
            <SavingsForm 
              onSubmit={createSaving} 
              loading={formLoading}
            />
            <SavingsList
              savings={savings}
              loading={loading}
              onUpdate={updateSaving}
              onDelete={deleteSaving}
              onDeleteAll={deleteAllSavings}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;