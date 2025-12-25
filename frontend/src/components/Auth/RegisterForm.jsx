import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '', // UI field
    email: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const { register, isError, isSuccess, message, reset } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.error(message);
    }

    if (isSuccess) {
      navigate('/onboarding');
      reset();
    }
  }, [isError, isSuccess, message, navigate, reset]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        // You might want to set a local error state here for UI feedback
        alert('Passwords do not match');
        return;
    }

    // Register user
    // Backend expects 'name', so we map 'username' to 'name'
    register({
       name: formData.username,
       email: formData.email,
       dob: formData.dob,
       gender: formData.gender,
       password: formData.password
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isError && <p className="text-red-500 text-sm text-center">{message}</p>}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e5c55] focus:ring-2 focus:ring-[#2e5c55]/30 outline-none transition-all duration-200 bg-gray-50"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e5c55] focus:ring-2 focus:ring-[#2e5c55]/30 outline-none transition-all duration-200 bg-gray-50"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e5c55] focus:ring-2 focus:ring-[#2e5c55]/30 outline-none transition-all duration-200 bg-gray-50"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <div className="relative">
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e5c55] focus:ring-2 focus:ring-[#2e5c55]/30 outline-none transition-all duration-200 bg-gray-50 appearance-none"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
              <option value="Other">Other</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2e5c55] focus:ring-2 focus:ring-[#2e5c55]/30 outline-none transition-all duration-200 bg-gray-50"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all duration-200 bg-gray-50"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#2e5c55] hover:bg-[#254a44] text-[#f1f3e0] font-semibold rounded-xl shadow-lg shadow-[#2e5c55]/20 transition-all duration-200 transform hover:-translate-y-0.5 mt-2"
      >
        Create Account
      </button>
    </form>
  );
};

export default RegisterForm;
