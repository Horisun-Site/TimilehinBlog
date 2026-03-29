import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  // Save user data
  localStorage.setItem("user", JSON.stringify(formData));

  // ✅ Always go to profile after registration
  navigate("/profile");
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="w-[90%] max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-all duration-500">
        <div className="flex items-center justify-center mb-6">
          <UserPlus className="text-blue-600 dark:text-blue-400 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Register</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
