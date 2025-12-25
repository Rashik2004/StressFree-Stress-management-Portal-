import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isError, isSuccess, message, reset } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess) {
      navigate('/dashboard');
      reset();
    }
  }, [isError, isSuccess, message, navigate, reset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isError && <p className="text-red-500 text-sm text-center">{message}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e5c55] focus:ring-2 focus:ring-[#2e5c55]/30 outline-none transition-all duration-200 bg-gray-50"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <a href="#" className="text-xs text-[#2e5c55] hover:text-[#254a44] font-medium">
            Forgot password?
          </a>
        </div>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e5c55] focus:ring-2 focus:ring-[#2e5c55]/30 outline-none transition-all duration-200 bg-gray-50"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#2e5c55] hover:bg-[#254a44] text-[#f1f3e0] font-semibold rounded-xl shadow-lg shadow-[#2e5c55]/20 transition-all duration-200 transform hover:-translate-y-0.5"
      >
        Sign In
      </button>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
