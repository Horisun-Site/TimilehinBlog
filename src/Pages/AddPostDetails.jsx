// src/Pages/AddPostDetails.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AddPostDetails = ({ addPost }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { imgBase64, videoLink } = location.state || {}; // from CreatePost

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      ...formData,
      img: imgBase64 || null,
      video: videoLink || null,
      date: new Date().toLocaleDateString(),
    };

    addPost(newPost);
    navigate("/blog"); // redirect to main blog page after saving
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 transition-all duration-500">
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Add Details to Your Post
        </h2>

        {/* --- Preview Section --- */}
        <div className="mb-6">
          {imgBase64 ? (
            <img
              src={imgBase64}
              alt="Preview"
              className="w-full h-56 object-cover rounded-xl border border-gray-300 dark:border-gray-700"
            />
          ) : videoLink ? (
            <video
              src={videoLink}
              className="w-full h-56 object-cover rounded-xl border border-gray-300 dark:border-gray-700"
              controls
            />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No media uploaded yet
            </p>
          )}
        </div>

        {/* --- Form Section --- */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">
              Description
            </label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Write about your post..."
            ></textarea>
          </div>

          <div>
            <label className="text-gray-600 dark:text-gray-300 text-sm">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="E.g. Technology, Fashion, Travel..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            Save & Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPostDetails;
