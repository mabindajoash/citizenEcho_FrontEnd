import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaSketch, FaSignsPost } from "react-icons/fa6";
import { BiSolidLogOutCircle } from "react-icons/bi";

function Sidebar({ children }) {
  return (
    <div className="sticky top-0 w-64 h-screen bg-gray-900 text-white flex flex-col p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6 tracking-wide">Admin Panel</h2>
      <nav className="space-y-3">{children}</nav>
    </div>
  );
}

function SidebarItem({ to, children }) {
  return (
    <Link
      to={to}
      className="flex items-center px-4 py-2 rounded hover:bg-gray-700 transition-colors"
    >
      {children}
    </Link>
  );
}

export default function Posts() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Future of Web Development",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec felis ac purus...",
      image: "/assets/res1.jpg",
    },
    {
      id: 2,
      title: "React Best Practices",
      description:
        "Learn about the most effective ways to use React in modern development...",
      image: "/assets/res1.jpg",
    },
  ]);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEdit = (id) => {
    alert(`Edit post with id: ${id}`);
  };

  const handleAddPost = () => {
    const newPost = {
      id: posts.length + 1,
      title: "New Post Title",
      description: "New post description...",
      image: "/assets/res1.jpg",
    };
    setPosts([...posts, newPost]);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar>
        <SidebarItem to="/admin">
          <FaHome className="mr-3" /> Home
        </SidebarItem>
        <SidebarItem to="/admin/inquiries">
          <FaSketch className="mr-3" /> Inquiries
        </SidebarItem>
        <SidebarItem to="/admin/posts">
          <FaSignsPost className="mr-3" /> Posts
        </SidebarItem>
        <SidebarItem to="/admin/users">
          <BiSolidLogOutCircle className="mr-3" /> Logout
        </SidebarItem>
      </Sidebar>

      <div className="flex-1 p-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Manage Posts</h1>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
              onClick={handleAddPost}
            >
              + Add New Post
            </button>
          </div>

          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-gray-300">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Title</th>
                    <th className="px-4 py-2 border">Description</th>
                    <th className="px-4 py-2 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{post.id}</td>
                      <td className="border px-4 py-2">{post.title}</td>
                      <td className="border px-4 py-2 text-sm text-gray-700">
                        {post.description}
                      </td>
                      <td className="border px-4 py-2 text-center space-x-2">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          onClick={() => handleEdit(post.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10">No posts available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
