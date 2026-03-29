import React from "react";
import { useNavigate } from "react-router-dom";

const Below = ({ defaultPosts = [], userPosts = [], deletePost }) => {
  const allPosts = [...userPosts, ...defaultPosts];
  const navigate = useNavigate();

  const handleReadMore = (post) => {
    navigate(`/details/${post.id}`, { state: { post } });
  };

  const shortenText = (text, limit = 100) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <section className="px-4 sm:px-6 md:px-10 py-10 sm:py-16 md:py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center">
        Latest Posts
      </h2>

      {allPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-sm sm:text-base">
          No posts yet. Add one!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {allPosts.map((post) => {
            const hasImage = !!post.img;
            const hasVideo = !!post.video;
            const both = hasImage && hasVideo;

            return (
              <div
                key={post.id}
                className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-2xl shadow-lg hover:scale-[1.02] sm:hover:scale-105 transition-transform duration-300"
              >
                {/* 🖼🎥 Combined Media */}
                {both && (
                  <div className="flex flex-col gap-4 mb-4">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="rounded-lg w-full h-44 sm:h-48 md:h-52 object-cover"
                    />
                    {post.video.includes("youtube.com") ||
                    post.video.includes("youtu.be") ? (
                      <iframe
                        src={post.video.replace("watch?v=", "embed/")}
                        title={post.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-44 sm:h-48 md:h-52 rounded-lg"
                      ></iframe>
                    ) : (
                      <video
                        controls
                        src={post.video}
                        className="w-full h-44 sm:h-48 md:h-52 rounded-lg"
                      />
                    )}
                  </div>
                )}

                {/* 🖼 Only Image */}
                {!both && hasImage && (
                  <img
                    src={post.img}
                    alt={post.title}
                    className="rounded-lg w-full h-44 sm:h-48 md:h-52 object-cover mb-4"
                  />
                )}

                {/* 🎥 Only Video */}
                {!both && hasVideo && (
                  <div className="w-full rounded-lg overflow-hidden mb-4">
                    {post.video.includes("youtube.com") ||
                    post.video.includes("youtu.be") ? (
                      <iframe
                        src={post.video.replace("watch?v=", "embed/")}
                        title={post.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-44 sm:h-48 md:h-52 rounded-lg"
                      ></iframe>
                    ) : (
                      <video
                        controls
                        src={post.video}
                        className="w-full h-44 sm:h-48 md:h-52 rounded-lg"
                      />
                    )}
                  </div>
                )}

                {/* 🧾 Post Content */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 break-words overflow-hidden">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-4 leading-relaxed break-words overflow-hidden">
                  {shortenText(post.desc, 100)}
                </p>

                {/* 🔘 Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <button
                    onClick={() => handleReadMore(post)}
                    className="text-blue-500 hover:underline text-sm sm:text-base"
                  >
                    Read more →
                  </button>

                  {!post.isDefault && (
                    <button
                      onClick={() => deletePost(post.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs sm:text-sm transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Below;

