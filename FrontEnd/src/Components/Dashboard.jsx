import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useUser } from "@clerk/clerk-react";

import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from "lucide-react";

const Dashboard = () => {

  const navigate = useNavigate();

  const { user } = useUser();

  const [blogs, setBlogs] = useState([]);

  const email =
    user?.primaryEmailAddress?.emailAddress;

  // FETCH BLOGS
  const fetchBlogs = async () => {

    try {

      if (!email) return;

      console.log(
        "FETCHING BLOGS FOR:",
        email
      );

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/myblogs?email=${email}`
      );

      const data = await response.json();

      console.log(
        "BLOG RESPONSE:",
        data
      );

      if (data.success && Array.isArray(data.blogs)) {

        // REMOVE INVALID BLOGS
        const validBlogs = data.blogs.filter(
          (blog) => blog && blog._id
        );

        setBlogs(validBlogs);

      }

    } catch (error) {

      console.log(error);

    }
  };

  // RUN FETCH
  useEffect(() => {

    fetchBlogs();

  }, [email]);

  // DELETE BLOG
  const deleteBlog = async (id) => {

    try {

      if (!id) return;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (data.success) {

        setBlogs(
          blogs.filter(
            (blog) =>
              blog._id !== id
          )
        );

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] p-6">

      <div className="max-w-7xl mx-auto">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* USER INFO */}
          <div className="flex items-center gap-4">

            <img
              src={user?.imageUrl}
              alt="user"
              className="w-20 h-20 rounded-full border-4 border-cyan-300"
            />

            <div>

              <h1 className="text-3xl font-bold text-white">

                Welcome, {user?.fullName}

              </h1>

              <p className="text-gray-300 mt-1">

                {email}

              </p>

            </div>

          </div>

          {/* CREATE BLOG BUTTON */}
          <button
            onClick={() =>
              navigate("/create-blog")
            }
            className="bg-cyan-300 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300 shadow-2xl"
          >

            + Create Blog

          </button>

        </div>

        {/* BLOG COUNT */}
        <div className="mt-14">

          <h2 className="text-6xl font-black text-cyan-300">

            {blogs.length}

          </h2>

          <p className="text-gray-400 mt-2 text-lg">

            Blogs Published

          </p>

        </div>

        {/* BLOG SECTION */}
        <div className="mt-12">

          <h2 className="text-5xl font-bold text-white mb-10">

            Your Blogs

          </h2>

          {

            blogs.length === 0 ? (

              <div className="bg-white/5 border border-white/10 rounded-3xl p-14 text-center backdrop-blur-lg">

                <h3 className="text-3xl font-bold text-white">

                  No Blogs Yet

                </h3>

                <p className="text-gray-400 mt-4 text-lg">

                  Start creating your first amazing blog.

                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {blogs.map((blog) => (

                  <div
                    key={blog._id}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:scale-[1.03] transition duration-300 shadow-2xl backdrop-blur-lg"
                  >

                    {/* IMAGE */}
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-60 object-cover"
                    />

                    {/* CONTENT */}
                    <div className="p-6">

                      {/* CATEGORY */}
                      <span className="inline-block bg-cyan-300 text-black px-4 py-1 rounded-full text-sm font-bold mb-4">

                        {blog.category}

                      </span>

                      {/* TITLE */}
                      <h2 className="text-2xl font-bold text-white line-clamp-2">

                        {blog.title}

                      </h2>

                      {/* DESCRIPTION */}
                      <p className="text-gray-400 mt-3 line-clamp-3">

                        {blog.description}

                      </p>

                      {/* DATE */}
                      <p className="text-gray-500 text-sm mt-4">

                        Published on{" "}

                        {new Date(
                          blog.createdAt
                        ).toLocaleDateString()}

                      </p>

                      {/* STATS */}
                      <div className="flex items-center gap-6 mt-6 text-white">

                        {/* LIKES */}
                        <div className="flex items-center gap-2">

                          <ThumbsUp
                            size={18}
                            className="text-cyan-300"
                          />

                          <span className="font-semibold">

                            {blog.likes || 0}

                          </span>

                        </div>

                        {/* DISLIKES */}
                        <div className="flex items-center gap-2">

                          <ThumbsDown
                            size={18}
                            className="text-red-400"
                          />

                          <span className="font-semibold">

                            {blog.dislikes || 0}

                          </span>

                        </div>

                        {/* COMMENTS */}
                        <div className="flex items-center gap-2">

                          <MessageCircle
                            size={18}
                            className="text-yellow-300"
                          />

                          <span className="font-semibold">

                            {blog.comments?.length || 0}

                          </span>

                        </div>

                      </div>

                      {/* BUTTONS */}
                      <div className="flex gap-4 mt-6">

                        {/* EDIT */}
                        <button
                          onClick={() => {

                            if (blog?._id) {

                              navigate(
                                `/edit-blog/${blog._id}`
                              );

                            }

                          }}
                          className="flex-1 bg-cyan-300 text-black py-3 rounded-xl font-bold hover:scale-105 transition duration-300"
                        >

                          Edit

                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteBlog(blog?._id)
                          }
                          className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition duration-300"
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )

          }

        </div>

      </div>

    </div>

  );
};

export default Dashboard;