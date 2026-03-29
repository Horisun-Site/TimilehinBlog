import React from "react";
import Navbar from "../Component/Navbar";
import Below from "../Component/Below";

const Blog = ({ defaultPosts, userPosts, deletePost }) => {
  return (
    <div>
      <Navbar />
      <Below
        defaultPosts={defaultPosts}
        userPosts={userPosts}
        deletePost={deletePost}
      />
    </div>
  );
};

export default Blog;
