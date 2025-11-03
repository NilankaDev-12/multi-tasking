// hooks/useSignup.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { handleError, handleSuccess } from "../utils/Toaster";

export const useSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  // Basic frontend validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      handleError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      handleError("Email is required");
      return false;
    }
    if (!formData.password) {
      handleError("Password is required");
      return false;
    }
    if (formData.name.trim().length < 3) {
      handleError("Name must be at least 3 characters long");
      return false;
    }
    if (formData.password.length < 8) {
      handleError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/auth/signup", formData);
      const { success, message, error } = response.data;

      if (success) {
        handleSuccess(message || "Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else if (error) {
        // Handle both string and object error formats
        const errorMessage =
          typeof error === "string" ? error : error?.details?.[0]?.message;
        handleError(errorMessage || "Signup failed");
      } else {
        handleError(message || "Signup failed");
      }
    } catch (err) {
      // Properly handle 400 validation errors
      if (err.response && err.response.status === 400) {
        const errorData = err.response.data;
        // Extract the Joi validation error message
        const errorMessage =
          errorData.error?.details?.[0]?.message ||
          errorData.error ||
          errorData.message ||
          "Validation failed";
        handleError(errorMessage);
      } else if (err.response) {
        // Handle other server errors
        handleError(err.response.data?.message || "Server error");
      } else if (err.request) {
        // Network errors
        handleError("Network error. Please try again.");
      } else {
        // Other errors
        handleError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
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