import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-[60px] flex justify-between items-center px-6 md:px-10 py-5 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-500 relative z-50">
      {/* LOGO */}
      <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 transition-colors duration-500">
        Timilehin’s Blog
      </h1>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6">
        <a
          href="/home"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/blog"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Blog
        </a>
        <a
          href="/about"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          About
        </a>
        <a
          href="/create"
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Create Post
        </a>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-2xl text-gray-700 dark:text-gray-200"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* MOBILE DROPDOWN */}
      <div
        className={`absolute top-[70px] left-0 w-full flex-col items-center gap-5 py-6 md:hidden transition-all duration-500 border-t
          ${
            isOpen
              ? "flex opacity-100 visible bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              : "hidden opacity-0 invisible"
          }
        `}
      >
        <a
          href="/home"
          onClick={() => setIsOpen(false)}
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/blog"
          onClick={() => setIsOpen(false)}
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Blog
        </a>
        <a
          href="/about"
          onClick={() => setIsOpen(false)}
          className="hover:text-blue-500 transition-colors duration-300"
        >
          About
        </a>
        <a
          href="/create"
          onClick={() => setIsOpen(false)}
          className="hover:text-blue-500 transition-colors duration-300"
        >
          Create Post
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
