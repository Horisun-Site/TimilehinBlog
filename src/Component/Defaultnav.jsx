import React from "react";
import { Link } from "react-router-dom";


const Defaultnav = () => {

  return (
    <nav
      className="
        h-[60px] flex justify-between items-center 
        px-4 sm:px-6 md:px-10 
        py-4 border-b border-gray-300 dark:border-gray-700 
        bg-white dark:bg-gray-900 
        transition-all duration-500 
        fixed top-0 w-full z-50 shadow-sm
      "
    >
      {/* LOGO */}
      <Link
        to="/"
        className="
          text-xl sm:text-2xl font-bold 
          text-blue-600 dark:text-blue-400 
          transition-colors duration-500
        "
      >
        Timilehin’s <span className="text-yellow-400">Blog</span>
      </Link>

      {/* RIGHT SIDE */}
      <div
        className="
          flex items-center 
          gap-3 sm:gap-5
        "
      >
        {/* Login */}
        <Link
          to="/login"
          className="
            text-[14px] sm:text-[16px] 
            text-blue-600 dark:text-blue-400 
            font-semibold hover:underline 
            transition-all duration-300
          "
        >
          Login
        </Link>

        {/* Register */}
        <Link
          to="/register"
          className="
            text-[14px] sm:text-[16px] 
            bg-blue-600 dark:bg-blue-500 
            text-white font-semibold 
            px-3 sm:px-4 py-1.5 sm:py-2 
            rounded-full 
            hover:bg-blue-700 dark:hover:bg-blue-400 
            transition-all duration-300 shadow-sm
          "
        >
          Register
        </Link>

      </div>
    </nav>
  );
};

export default Defaultnav;
