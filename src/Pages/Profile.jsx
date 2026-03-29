import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Save profile data (temporarily)
  localStorage.setItem("profileComplete", "true");

  // ✅ Go to login next
  navigate("/login");
};

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-[90%] max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          Complete Your Profile
        </h2>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full border-4 border-blue-500 overflow-hidden mb-3">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-sm">
                No Image
              </div>
            )}
          </div>
          <label className="cursor-pointer text-blue-600 hover:underline">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Additional Info */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
          required
        />
        <textarea
          placeholder="Short Bio"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none resize-none"
          rows="3"
        ></textarea>
        <input
          type="text"
          placeholder="Location"
          className="w-full p-3 mb-4 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default Profile;
