import React from "react";

const Under = () => {
  return (
    <section className="px-10 py-20 flex flex-col items-center text-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition">
      <img
        src="https://cdn.pixabay.com/photo/2019/10/22/13/42/black-male-4568760_640.jpg"
        alt="profile"
        className="w-40 h-40 rounded-full mb-6"
      />
      <h2 className="text-4xl font-bold mb-4">Hey, I’m Timilehin 👋</h2>
      <p className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
        I’m a tech enthusiast who loves building projects, sharing knowledge, and writing about creativity and growth.
      </p>
    </section>
  );
};

export default Under;
