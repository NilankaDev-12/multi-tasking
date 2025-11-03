import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Signup, Login, Home, Todo, ExpenseTracker } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RootLayout from "./layout/RootLayout";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-slate-800">
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />}/>
            {/* Public Route - redirect if authenticated */}
            <Route
              path="signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/* Protected Route - redirect to login if not authenticated */}
            <Route element={<ProtectedRoute />}>
              <Route path="todo" element={<Todo />} />
              <Route path="expenseTracker" element={<ExpenseTracker />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
