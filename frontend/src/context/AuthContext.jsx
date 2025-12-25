import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
        // Check for existing user in localStorage
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            setUser(savedUser);
        }
    } catch (error) {
        console.error("Failed to parse user from local storage", error);
        localStorage.removeItem("user");
    }
    setIsLoading(false);
  }, []);

  // Register User
  const register = async (userData) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setMessage("");
    try {
      const data = await authService.register(userData);
      setUser(data);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          "Registration failed"
      );
    } finally {
        setIsLoading(false);
    }
  };

  const login = async (userData) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setMessage("");
    try {
      const data = await authService.login(userData);
      setUser(data);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      setMessage(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          "Login failed"
      );
    } finally {
        setIsLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    setIsLoading(true);
    try {
      if (!user) throw new Error("User not authenticated");
      const updatedUser = await authService.updateProfile(userData, user.token);
      setUser(updatedUser);
      setIsSuccess(true);
      return updatedUser;
    } catch (error) {
      setIsError(true);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsSuccess(false);
    setIsError(false);
    setMessage("");
  };

  const reset = () => {
      setIsError(false);
      setIsSuccess(false);
      setMessage("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isError,
        isSuccess,
        message,
        register,
        login,
        logout,
        updateProfile,
        reset,
        isAuthenticated: !!user
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
