import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultPage from "./Pages/DefaultPage";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import CreatePost from "./Pages/CreatePost";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin from "./Pages/Admin";
import Profile from "./Pages/Profile";
import AddPostDetails from "./Pages/AddPostDetails";
import DetailsPage from "./Pages/DetailsPage";

const App = () => {
  // Default posts (always visible)
  const defaultPosts = [
    {
      id: 1,
      title: "Exploring AI in 2025",
      desc: "A deep dive into how AI continues to change tech and creativity.",
      img: "https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_1280.jpg",
      isDefault: true,
    },
    {
      id: 2,
      title: "Building with TailwindCSS",
      desc: "How Tailwind revolutionized frontend development.",
      img: "https://cdn.pixabay.com/photo/2020/10/08/14/39/man-5638146_1280.jpg",
      isDefault: true,
    },
  ];

  // Load user-created posts from localStorage
  const [userPosts, setUserPosts] = useState(() => {
    const saved = localStorage.getItem("userPosts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("userPosts", JSON.stringify(userPosts));
  }, [userPosts]);

  const addPost = (newPost) => {
    setUserPosts((prev) => [
      { ...newPost, id: Date.now(), isDefault: false },
      ...prev,
    ]);
  };

  const deletePost = (id) => {
    setUserPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <main className="pt-20 px-6">
          <Routes>
            {/* 🌍 Public Landing Page */}
            <Route
              path="/"
              element={<DefaultPage defaultPosts={defaultPosts} userPosts={userPosts} />}
            />

            {/* 🔐 Auth Flow */}
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />

            {/* 👑 Admin / Authenticated Routes */}
            <Route path="/home" element={<Home />} />
            <Route
              path="/blog"
              element={
                <Blog
                  defaultPosts={defaultPosts}
                  userPosts={userPosts}
                  deletePost={deletePost}
                />
              }
            />
            <Route path="/create" element={<CreatePost addPost={addPost} />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/add" element={<AddPostDetails addPost={addPost} />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
