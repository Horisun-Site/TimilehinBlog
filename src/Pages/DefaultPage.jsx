import React from "react";
import { useNavigate } from "react-router-dom";
import Defaultnav from "../Component/Defaultnav";

const DefaultPage = ({ defaultPosts, userPosts }) => {
  const navigate = useNavigate();
  const allPosts = [...defaultPosts, ...userPosts];

  const handleRequireRegister = (post) => {
    // Save post data so we know which one they clicked
    localStorage.setItem("redirectPostId", post.id);
    localStorage.setItem("redirectPostData", JSON.stringify(post));

    // Redirect to register
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <Defaultnav/>
      <h1 className="text-4xl font-bold text-center mb-4 text-blue-700 dark:text-white">
        Welcome to Timilehin Blog 🌍
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-10 text-center max-w-2xl">
        Discover amazing posts, stories, and videos from the community.  
        Register to explore full posts or upload your own!
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              {post.video ? (
                <div className="relative">
                  <video
                    src={post.video}
                    className="w-full h-56 object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center px-4">
                    <p className="text-white text-sm mb-2 font-medium">
                      Register to get full access to this blog
                    </p>
                    <button
                      onClick={() => handleRequireRegister(post)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                    >
                      ▶ Watch Video
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {post.desc?.slice(0, 100)}...
                </p>
                <button
                  onClick={() => handleRequireRegister(post)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Read More
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No posts available yet.
          </p>
        )}
      </div>

      <button
        onClick={() => navigate("/register")}
        className="mt-12 bg-blue-700 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-800 transition"
      >
        Explore The Vast World
      </button>
    </div>
  );
};

export default DefaultPage;
