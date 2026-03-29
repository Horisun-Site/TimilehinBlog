import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";

const CreatePost = ({ addPost }) => {
  const [step, setStep] = useState(1);
  const [fileBase64, setFileBase64] = useState("");
  const [fileType, setFileType] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  // Convert uploaded file to base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileBase64(reader.result);
      setFileType(file.type.startsWith("video") ? "video" : "image");
    };
    reader.readAsDataURL(file);
  };

  // Generate embed URL for external videos
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const lower = url.toLowerCase();
    if (lower.includes("youtube.com/watch?v="))
      return url.replace("watch?v=", "embed/");
    if (lower.includes("youtu.be/"))
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
    if (lower.includes("vimeo.com/"))
      return `https://player.vimeo.com/video/${url.split("vimeo.com/")[1]}`;
    if (
      lower.endsWith(".mp4") ||
      lower.endsWith(".webm") ||
      lower.endsWith(".ogg")
    )
      return url;
    return null;
  };

  const embedUrl = getEmbedUrl(videoLink);

  const handleNext = () => {
    if (fileBase64 || videoLink) setStep(2);
    else alert("Please upload a file or enter a video link first!");
  };

  const handleBack = () => setStep(1);

  const handleSubmit = () => {
    if (!title || !desc)
      return alert("Please fill in the title and description!");

    const newPost = {
      id: Date.now(),
      title,
      desc,
      img: fileType === "image" ? fileBase64 : null,
      video: fileType === "video" ? fileBase64 : videoLink || null,
      isDefault: false,
    };

    addPost(newPost);

    // Save locally
    const saved = JSON.parse(localStorage.getItem("userPosts")) || [];
    localStorage.setItem("userPosts", JSON.stringify([newPost, ...saved]));

    // Reset
    setStep(1);
    setFileBase64("");
    setVideoLink("");
    setFileType("");
    setTitle("");
    setDesc("");

    alert("Post created successfully!");
    navigate("/blog");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="h-[540px] relative overflow-hidden">
            <AnimatePresence mode="wait">
              {/* STEP 1: Upload or Add Video Link */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: -500 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-white">
                    Upload Image or Add Video
                  </h2>

                  {/* Upload file */}
                  <label className="border-2 border-dashed border-blue-400 rounded-xl w-full h-52 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition mb-5">
                    {fileBase64 ? (
                      fileType === "video" ? (
                        <video
                          src={fileBase64}
                          controls
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        <img
                          src={fileBase64}
                          alt="Preview"
                          className="w-full h-full rounded-xl object-cover"
                        />
                      )
                    ) : (
                      <span>Click to upload an image or video file</span>
                    )}
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  {/* Video Link Input */}
                  <input
                    type="url"
                    placeholder="Or paste video link (YouTube, Vimeo, etc)"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white mb-3"
                  />

                  {embedUrl && (
                    <div className="mt-2 aspect-video w-full rounded-lg overflow-hidden shadow-md">
                      {embedUrl.endsWith(".mp4") ||
                      embedUrl.endsWith(".webm") ||
                      embedUrl.endsWith(".ogg") ? (
                        <video
                          src={embedUrl}
                          controls
                          className="w-full h-full object-cover"
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

                  {(fileBase64 || videoLink) && (
                    <button
                      onClick={handleNext}
                      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Next →
                    </button>
                  )}
                </motion.div>
              )}

              {/* STEP 2: Add Post Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  exit={{ x: 500 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-6"
                >
                  <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-white">
                    Add Post Details
                  </h2>
                  <input
                    type="text"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />
                  <textarea
                    placeholder="Enter description..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full h-32 mb-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  ></textarea>

                  <div className="flex justify-between w-full">
                    <button
                      onClick={handleBack}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Submit Post
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
