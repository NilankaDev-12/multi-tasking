// pages/Todo.js
import { useState, useEffect } from "react";
import { api } from "../api/axios";
import TodoForm from "../components/TodoComponent/TodoForm";
import TodoList from "../components/TodoComponent/TodoList";
import TodoStats from "../components/TodoComponent/TodoStats";
import { toast } from "react-toastify";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter todos based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTodos(todos);
    } else {
      const filtered = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTodos(filtered);
    }
  }, [todos, searchTerm]);

  // Fetch all todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/todo/getAllTodo");
      setTodos(response.data.todos || []);
    } catch (error) {
      toast.error("Failed to fetch todos");
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Create new todo
  const createTodo = async (todoData) => {
    setFormLoading(true);
    try {
      const response = await api.post("/todo/createTodo", todoData);
      setTodos(prev => [response.data.todo, ...prev]);
      toast.success("Todo created successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to create todo");
      console.error("Error creating todo:", error);
      return false;
    } finally {
      setFormLoading(false);
    }
  };

  // Update todo - FIXED: Added id to URL
  const updateTodo = async (id, updates) => {
    try {
      const response = await api.put(`/todo/updateTodo/${id}`, updates);
      setTodos(prev => 
        prev.map(todo => 
          todo._id === id ? { ...todo, ...response.data.todo } : todo
        )
      );
      toast.success("Todo updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update todo");
      console.error("Error updating todo:", error);
      return false;
    }
  };

  // Delete todo - FIXED: Added id to URL
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todo/deleteSingleTodo/${id}`);
      setTodos(prev => prev.filter(todo => todo._id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete todo");
      console.error("Error deleting todo:", error);
    }
  };

  // Delete all todos
  const deleteAllTodos = async () => {  
      try {
        await api.delete("/todo/deleteAllTodo");
        setTodos([]);
        toast.success("All todos deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete all todos");
        console.error("Error deleting all todos:", error);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto"> {/* Increased max-width for better desktop layout */}
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl mb-4">
            <svg 
              className="w-8 h-8 text-white" 
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Todo Manager
          </h1>
          <p className="text-gray-400 mt-2 font-light">
            Organize your tasks and boost your productivity
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8"> {/* Changed to 4-column grid for better desktop layout */}
          {/* Left Column - Form & Stats */}
          <div className="xl:col-span-1 space-y-6">
            <TodoForm onSubmit={createTodo} loading={formLoading} />
            <TodoStats todos={todos} onDeleteAll={deleteAllTodos} />
          </div>

          {/* Right Column - Todo List with Search */}
          <div className="xl:col-span-3">
            <TodoList 
              todos={filteredTodos} 
              loading={loading}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;