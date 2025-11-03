// hooks/useLogin.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { handleError, handleSuccess } from "../utils/Toaster";

export const useLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      handleError("Email is required");
      return false;
    }
    if (!formData.password) {
      handleError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic frontend validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", formData, {
        withCredentials: true,
      });

      const { success, message, error } = response.data;

      if (success) {
        handleSuccess(message || "Login successful!");

        setTimeout(() => {
          navigate("/todo");
        }, 1500);
      } else {
        const errorMessage =
          typeof error === "string" ? error : error?.details?.[0]?.message;
        handleError(errorMessage || "Login failed");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errorData = err.response.data;
        const errorMessage =
          errorData.error?.details?.[0]?.message ||
          errorData.error ||
          errorData.message ||
          "Invalid email or password";
        handleError(errorMessage);
      } else if (err.response && err.response.status === 401) {
        handleError("Invalid email or password");
      } else if (err.response) {
        handleError(err.response.data?.message || "Server error");
      } else if (err.request) {
        handleError("Network error. Please try again.");
      } else {
        handleError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleSubmit,
    resetForm,
  };
};