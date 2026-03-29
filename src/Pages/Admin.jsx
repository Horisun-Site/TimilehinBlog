import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, PlusCircle, Trash2, Edit3 } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    desc: "",
    imgBase64: "",
    preview: null,
    videoLink: "",
  });

  // Redirect non-admins
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Load existing posts
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    setPosts(savedPosts);
  }, []);

  // 🎬 Convert video URLs
  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const lower = url.toLowerCase();
      if (lower.includes("youtube.com/watch?v="))
        return url.replace("watch?v=", "embed/");
      if (lower.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      if (lower.includes("vimeo.com/")) {
        const videoId = url.split("vimeo.com/")[1];
        return `https://player.vimeo.com/video/${videoId}`;
      }
      if (
        lower.endsWith(".mp4") ||
        lower.endsWith(".webm") ||
        lower.endsWith(".ogg")
      )
        return url;
      return null;
    } catch {
      return null;
    }
  };

  // 🖼️ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost((prev) => ({
          ...prev,
          imgBase64: reader.result,
          preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 🧠 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  // 📝 Add post
  const addPost = (e) => {
    e.preventDefault();
    const { title, desc, imgBase64, videoLink } = newPost;
    if (!title || !desc) {
      alert("Please fill in title and description!");
      return;
    }
    if (!imgBase64 && !videoLink) {
      alert("Please add an image or video!");
      return;
    }

    const post = {
      id: Date.now(),
      title,
      desc,
      img: imgBase64 || null,
      video: videoLink || null,
    };

    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem("userPosts", JSON.stringify(updated));

    setNewPost({
      title: "",
      desc: "",
      imgBase64: "",
      preview: null,
      videoLink: "",
    });
  };

  // 🗑️ Delete post
  const deletePost = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("userPosts", JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  const embedUrl = getEmbedUrl(newPost.videoLink);

  // 🧭 Added: Handle Read More navigation
  const handleReadMore = (post) => {
    navigate(`/details/${post.id}`, { state: { post } });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500">
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          Admin Dashboard
        </h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-6 flex flex-col lg:flex-row gap-6">
        {/* LEFT: CREATE POST */}
        <div className="w-full lg:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-500">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <PlusCircle size={20} className="text-blue-600 dark:text-blue-400" />
            Create New Post
          </h2>

          <form onSubmit={addPost} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={newPost.title}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              name="desc"
              placeholder="Description"
              value={newPost.desc}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* 🖼️ Image Upload */}
            <div>
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Upload Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
              />
              {newPost.preview && (
                <img
                  src={newPost.preview}
                  alt="Preview"
                  className="mt-4 w-full h-40 object-cover rounded-lg shadow-md"
                />
              )}
            </div>

            {/* 🎥 Video Link */}
            <div>
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Video Link (optional)
              </label>
              <input
                type="url"
                name="videoLink"
                placeholder="https://youtube.com/watch?v=abc123 or .mp4 link"
                value={newPost.videoLink}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
              />

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

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
            >
              Add Post
            </button>
          </form>
        </div>

        {/* RIGHT: MANAGE POSTS */}
        <div className="w-full lg:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-500">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Manage Posts
          </h2>

          {posts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No posts yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm transition-all"
                >
                  {post.video ? (
                    <div className="aspect-video">
                      {getEmbedUrl(post.video)?.endsWith(".mp4") ? (
                        <video
                          src={post.video}
                          controls
                          className="w-full h-full object-cover"
                        ></video>
                      ) : (
                        <iframe
                          src={getEmbedUrl(post.video)}
                          title={post.title}
                          className="w-full h-full"
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                  ) : (
                    post.img && (
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-40 object-cover"
                      />
                    )
                  )}

                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {post.desc}
                    </p>

                    {/* Added: Read More button */}
                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={() => handleReadMore(post)}
                        className="text-blue-500 hover:underline text-sm sm:text-base"
                      >
                        Read more →
                      </button>

                      <div className="flex gap-3">
                        <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
