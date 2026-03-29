import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Mock login
  if (formData.email === "horisunola@gmail.com" && formData.password === "HORISUN4site(LovesGod)001$&@gmail.com") {
    localStorage.setItem("role", "admin");
    navigate("/admin");
  } else {
    localStorage.setItem("role", "user");

    // ✅ Check if the user came from a post click
    const redirectId = localStorage.getItem("redirectPostId");
    const redirectPost = localStorage.getItem("redirectPostData");

    if (redirectId && redirectPost) {
      navigate(`/details/${redirectId}`, {
        state: { post: JSON.parse(redirectPost) },
      });

      // Clean up
      localStorage.removeItem("redirectPostId");
      localStorage.removeItem("redirectPostData");
    } else {
      navigate("/home");
    }
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      <div className="w-[90%] max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-all duration-500">
        <div className="flex items-center justify-center mb-6">
          <LogIn className="text-blue-600 dark:text-blue-400 mr-2" size={24} />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Login</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
