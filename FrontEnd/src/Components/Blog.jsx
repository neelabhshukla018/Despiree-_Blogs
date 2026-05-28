import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Blog = () => {

  const navigate = useNavigate();

  // BLOG STATE
  const [blogs, setBlogs] = useState([]);

  // FETCH BLOGS
  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/blogs`
        );

        setBlogs(response.data.blogs);

      } catch (error) {

        console.log(
          "Error fetching blogs:",
          error
        );

      }
    };

    fetchBlogs();

  }, []);

  return (

    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-5 sm:px-8 lg:px-16 py-16">

      {/* GRID BG */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* AURORA */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 blur-[140px] rounded-full animate-aurora"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full animate-aurora2"></div>

      {/* HEADING */}
      <div className="relative z-10 text-center mb-16">

        <p className="text-cyan-300 uppercase tracking-[5px] text-sm font-semibold mb-4">

          Explore Latest Articles

        </p>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight">

          Latest
          <span className="bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent">

            {" "}Blogs

          </span>

        </h1>

        <p className="text-gray-300 text-lg mt-6 max-w-2xl mx-auto leading-relaxed">

          Discover premium blogs on technology,
          cricket, startups, AI, lifestyle and
          modern trends written by creators.

        </p>

      </div>

      {/* BLOG GRID */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">

        {Array.isArray(blogs) &&
        blogs.length > 0 ? (

          blogs.map((blog) => (

            <div
              key={blog._id}
              onClick={() =>
                navigate(`/blog/${blog._id}`)
              }
              className="
                group
                relative
                overflow-hidden
                rounded-[38px]
                h-[420px]
                sm:h-[500px]
                cursor-pointer
                border
                border-white/10
                bg-black/20
                backdrop-blur-xl
                hover:-translate-y-4
                transition-all
                duration-700
                shadow-[0_0_40px_rgba(0,0,0,0.45)]
                hover:shadow-[0_0_60px_rgba(34,211,238,0.25)]
              "
            >

              {/* IMAGE */}
              <img
                src={blog.image}
                alt={blog.title}
                className="
                  w-full
                  h-full
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-700
                "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/95
                  via-black/55
                  to-transparent
                  z-10
                "
              ></div>

              {/* CATEGORY */}
              <div className="absolute top-5 left-5 z-20">

                <span
                  className="
                    bg-cyan-300
                    text-black
                    px-5
                    py-2
                    rounded-full
                    font-extrabold
                    text-sm
                    shadow-[0_0_25px_rgba(103,232,249,0.5)]
                    backdrop-blur-md
                  "
                >
                  {blog.category}
                </span>

              </div>

              {/* CONTENT */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  z-20
                  p-7
                  w-full
                "
              >

                {/* TITLE */}
                <h2
                  className="
                    text-white
                    text-3xl
                    sm:text-4xl
                    font-black
                    leading-tight
                    mb-4
                    line-clamp-2
                    drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]
                  "
                >
                  {blog.title}
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="
                    text-gray-200
                    text-base
                    sm:text-lg
                    leading-relaxed
                    line-clamp-3
                    mb-6
                    drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                  "
                >
                  {blog.description}
                </p>

                {/* BUTTON */}
                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    navigate(`/blog/${blog._id}`);

                  }}
                  className="
                    group/btn
                    flex
                    items-center
                    gap-3
                    text-cyan-300
                    font-bold
                    text-lg
                    sm:text-xl
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >

                  Read More

                  <span
                    className="
                      group-hover/btn:translate-x-2
                      transition-all
                      duration-300
                    "
                  >
                    →
                  </span>

                </button>

              </div>

            </div>

          ))

        ) : (

          <div className="col-span-2 flex items-center justify-center min-h-[300px]">

            <h2 className="text-white text-3xl font-bold">

              No Blogs Found...

            </h2>

          </div>

        )}

      </div>

    </div>
  );
};

export default Blog;