// pages/Login.js
import LoginForm from "../components/LoginForm";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const { formData, isLoading, handleChange, handleSubmit } = useLogin();

  return (
    <LoginForm
      formData={formData}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;