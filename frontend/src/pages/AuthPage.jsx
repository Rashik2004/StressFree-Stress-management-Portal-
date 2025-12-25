
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';

const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname !== '/register');

  useEffect(() => {
    setIsLogin(location.pathname !== '/register');
  }, [location.pathname]);

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-surface">
      {/* Left Side - Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-surface relative z-10">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-primary/80">
              {isLogin
                ? 'Enter your details to access your portal'
                : 'Start your journey to better mental health'}
            </p>
          </div>

          <div className="relative bg-background rounded-full p-1 mb-8 flex">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full shadow-sm transition-all duration-300 ease-in-out ${
                isLogin ? 'left-1' : 'left-[calc(50%+4px)]'
              }`}
            ></div>
            <button
              className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-300 ${
                isLogin ? 'text-primary-foreground' : 'text-primary/60 hover:text-primary'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`relative z-10 w-1/2 py-2 text-sm font-medium transition-colors duration-300 ${
                !isLogin ? 'text-primary-foreground' : 'text-primary/60 hover:text-primary'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <div className="relative overflow-hidden min-h-[350px]">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full"
                >
                  <LoginForm />
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full"
                >
                  <RegisterForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Side - Info Section */}
      <div className="hidden md:flex w-1/2 bg-primary p-12 text-primary-foreground flex-col justify-center items-center relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-lg text-center">
            {/* You could add a logo or illustration here if available */}
          <h2 className="text-3xl font-bold mb-6 italic font-serif leading-relaxed text-primary-foreground">
            "A science-backed stress management portal with guided meditations, breathing exercises, and mood tracking tailored to your daily life."
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
