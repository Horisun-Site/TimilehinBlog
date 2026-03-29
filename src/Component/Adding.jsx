import React from "react";

const Adding = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center px-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition">
      <h2 className="text-5xl font-extrabold mb-4">
        Welcome to <span className="text-blue-500">Timilehin’s</span> Blog
      </h2>
      <p className="text-lg max-w-2xl text-gray-600 dark:text-gray-400">
        I share thoughts, tutorials, and insights about technology, design, and personal growth.
      </p>
      <a href="/blog" className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
        Explore My Blog
      </a>
    </section>
  );
};

export default Adding;
