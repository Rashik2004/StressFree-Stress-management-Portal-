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
        if (savedUser?.token) {
            setUser(savedUser);
        } else if (savedUser) {
            localStorage.removeItem("user");
        }
    } catch (error) {
        console.error("Failed to parse user from local storage", error);
        localStorage.removeItem("user");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setIsSuccess(false);
      setIsError(true);
      setMessage("Your session expired. Please sign in again.");
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  // Register User
  const register = async (userData) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setMessage("");
    try {
      const data = await authService.register(userData);
      if (!data?.token) {
        throw new Error("Registration succeeded but no auth token was returned");
      }
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
      if (!data?.token) {
        throw new Error("Login succeeded but no auth token was returned");
      }
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
      if (!user?.token) throw new Error("User not authenticated");
      const updatedUser = await authService.updateProfile(userData, user.token);
      if (!updatedUser?.token) {
        throw new Error("Profile updated but no auth token was returned");
      }
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
        isAuthenticated: !!user?.token
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
