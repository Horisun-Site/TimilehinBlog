import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddingPost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgBase64, setImgBase64] = useState("");
  const [preview, setPreview] = useState(null);
  const [videoLink, setVideoLink] = useState(""); // 🎥 new video input state
  const navigate = useNavigate();

  // 🖼️ Handle image upload + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgBase64(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🧠 Handle general video preview (YouTube, Vimeo, direct .mp4)
  const getEmbedUrl = (url) => {
    if (!url) return null;

    try {
      const lower = url.toLowerCase();

      // 🎬 YouTube
      if (lower.includes("youtube.com/watch?v=")) {
        return url.replace("watch?v=", "embed/");
      }

      // 🎬 YouTube short link
      if (lower.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // 🎞️ Vimeo
      if (lower.includes("vimeo.com/")) {
        const videoId = url.split("vimeo.com/")[1];
        return `https://player.vimeo.com/video/${videoId}`;
      }

      // 🎥 Direct video file (.mp4, .webm, etc.)
      if (lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".ogg")) {
        return url; // will use <video> tag instead of iframe
      }

      return null;
    } catch {
      return null;
    }
  };

  // 📝 Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      alert("Please fill in the title and description!");
      return;
    }

    if (!imgBase64 && !videoLink) {
      alert("Please add an image or a video link!");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      desc,
      img: imgBase64 || null,
      video: videoLink || null,
    };

    // ✅ Add post to global state
    addPost(newPost);

    // ✅ Save to localStorage (persistent)
    const existing = JSON.parse(localStorage.getItem("userPosts")) || [];
    localStorage.setItem("userPosts", JSON.stringify([newPost, ...existing]));

    // ✅ Reset form
    setTitle("");
    setDesc("");
    setImgBase64("");
    setVideoLink("");
    setPreview(null);

    // ✅ Navigate to blog
    navigate("/blog");
  };

  const embedUrl = getEmbedUrl(videoLink);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Create a New Post
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md w-[90%] md:w-[500px] space-y-5"
      >
        {/* 🏷️ Title */}
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
        />

        {/* 📝 Description */}
        <textarea
          placeholder="Post Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
        />

        {/* 🖼️ Image Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Upload Post Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-full h-56 object-cover rounded-lg shadow-md"
            />
          )}
        </div>

        {/* 🎥 Video Link */}
        <div>
          <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
            Add Video Link (optional)
          </label>
          <input
            type="url"
            placeholder="e.g. https://youtube.com/watch?v=abc123 or https://example.com/video.mp4"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
          />

          {/* 🎬 Video Preview */}
          {embedUrl && (
            <div className="mt-4 aspect-video w-full rounded-lg overflow-hidden shadow-md">
              {embedUrl.endsWith(".mp4") ||
              embedUrl.endsWith(".webm") ||
              embedUrl.endsWith(".ogg") ? (
                <video
                  src={embedUrl}
                  controls
                  className="w-full h-full object-cover rounded-lg"
                ></video>
              ) : (
                <iframe
                  src={embedUrl}
                  title="Video Preview"
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          )}
        </div>

        {/* 🔘 Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddingPost;
