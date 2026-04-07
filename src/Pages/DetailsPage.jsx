import React, { useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const DetailsPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const post = state?.post;

  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Post not found</h2>
        <p className="mb-6 text-gray-500">
          It seems the post data wasn’t loaded.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const hasImage = !!post.img;
  const hasVideo = !!post.video;
  const both = hasImage && hasVideo;

  // 🖱️ Zoom + Drag logic
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () =>
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const resetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setDragging(true);
      const touch = e.touches[0];
      setStartPos({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!dragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - startPos.x,
      y: touch.clientY - startPos.y,
    });
  };

  const handleTouchEnd = () => setDragging(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-5 md:px-16 py-12 relative">
      <div className="max-w-4xl mx-auto">
        {/* 🏷️ Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 break-words overflow-hidden">
          {post.title}
        </h1>

        {/* 🎬 Media Section */}
        <div className="flex flex-col gap-6 mb-10">
          {both && (
            <>
              <div className="relative group cursor-pointer">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-[400px] object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setIsZoomOpen(true)}
                />
                <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                  🔍 View Full Image
                </span>
              </div>

              {post.video.includes("youtube.com") ||
              post.video.includes("youtu.be") ? (
                <iframe
                  src={post.video.replace("watch?v=", "embed/")}
                  title={post.title}
                  allowFullScreen
                  className="w-full h-[400px] rounded-2xl shadow-lg"
                ></iframe>
              ) : (
                <video
                  controls
                  src={post.video}
                  className="w-full h-[400px] rounded-2xl shadow-lg"
                />
              )}
            </>
          )}

          {/* 🖼 Only Image */}
          {!both && hasImage && (
            <div className="relative group cursor-pointer">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-[450px] object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                onClick={() => setIsZoomOpen(true)}
              />
              <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                🔍 View Full Image
              </span>
            </div>
          )}

          {/* 🎥 Only Video */}
          {!both && hasVideo && (
            <>
              {post.video.includes("youtube.com") ||
              post.video.includes("youtu.be") ? (
                <iframe
                  src={post.video.replace("watch?v=", "embed/")}
                  title={post.title}
                  allowFullScreen
                  className="w-full h-[450px] rounded-2xl shadow-lg"
                ></iframe>
              ) : (
                <video
                  controls
                  src={post.video}
                  className="w-full h-[450px] rounded-2xl shadow-lg"
                />
              )}
            </>
          )}
        </div>

        {/* 📝 Description */}
        <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-12 whitespace-pre-line break-words overflow-hidden">
          {post.desc || "No description available for this post."}
        </div>

        {/* 🔙 Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-xl shadow-md transition"
          >
            ← Back to Posts
          </button>
        </div>
      </div>

      {/* 🖼️ Zoom + Pan Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 bg-black/85 flex flex-col justify-center items-center z-50 p-4"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 🔄 Reset Button (Top Right) */}
          <button
            onClick={resetZoom}
            className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-yellow-400 transition"
          >
            ⟳
          </button>

          {/* 📸 Zoomable Image */}
          <div
            className="relative flex justify-center items-center w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <img
              ref={imgRef}
              src={post.img}
              alt="Zoomed view"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                transition: dragging ? "none" : "transform 0.3s ease",
              }}
              className="max-w-none max-h-none rounded-xl object-contain select-none pointer-events-none"
              draggable="false"
            />
          </div>

          {/* 🔍 Zoom Controls */}
          <div className="absolute bottom-10 flex gap-4">
            {/* Zoom Out */}
            <button
              onClick={handleZoomOut}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-lg"
            >
              ➖
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                setIsZoomOpen(false);
                resetZoom();
              }}
              className="bg-gray-700 hover:bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold"
            >
              ×
            </button>

            {/* Zoom In */}
            <button
              onClick={handleZoomIn}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full text-lg"
            >
              ➕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
