// pages/Signup.js
import SignupForm from "../components/SignupForm";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const { formData, isLoading, handleChange, handleSubmit } = useSignup();

  return (
    <SignupForm
      formData={formData}
      isLoading={isLoading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;