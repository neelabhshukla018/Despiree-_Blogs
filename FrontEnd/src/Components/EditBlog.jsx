import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

const EditBlog = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [blog, setBlog] = useState({

    title: "",

    description: "",

    content: "",

    category: "",

    image: "",

  });

  const [loading, setLoading] =
    useState(false);

  // FETCH BLOG
  useEffect(() => {

    fetchBlog();

  }, []);

  const fetchBlog = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/blogs"
      );

      const foundBlog =
        response.data.blogs.find(
          (b) => b._id === id
        );

      if (foundBlog) {

        setBlog(foundBlog);

      }

    } catch (error) {

      console.log(error);

    }
  };

  // HANDLE CHANGE
  const handleChange = (e) => {

    setBlog({

      ...blog,

      [e.target.name]:
        e.target.value,

    });

  };

  // UPDATE BLOG
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append(
        "title",
        blog.title
      );

      formData.append(
        "description",
        blog.description
      );

      formData.append(
        "content",
        blog.content
      );

      formData.append(
        "category",
        blog.category
      );

      // IMAGE
      if (
        blog.image &&
        typeof blog.image !== "string"
      ) {

        formData.append(
          "image",
          blog.image
        );

      }

      const response =
        await axios.put(
          `http://localhost:5000/api/blogs/update-blog/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      console.log(response.data);

      if (response.data.success) {

        alert(
          "Blog Updated Successfully 🚀"
        );

        navigate("/dashboard");

      }

    } catch (error) {

      console.log(error);

      alert(
        "Update Failed ❌"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] p-6 overflow-hidden relative">

      {/* GLOW EFFECTS */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-400/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

      {/* MAIN CONTAINER */}
      <div className="max-w-5xl mx-auto relative z-10">

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(34,211,238,0.15)] rounded-[40px] p-10 animate-fadeIn">

          {/* HEADING */}
          <div className="text-center mb-12">

            <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight">

              Edit Your Blog

            </h1>

            <p className="text-gray-400 mt-4 text-lg">

              Update your masterpiece ✨

            </p>

          </div>

          {/* FORM */}
          <form
            onSubmit={handleUpdate}
            className="space-y-8"
          >

            {/* TITLE */}
            <div>

              <label className="block text-white mb-3 font-semibold text-lg">

                Blog Title

              </label>

              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                placeholder="Enter Blog Title"
                className="w-full p-5 rounded-2xl bg-[#1e293b]/80 border border-white/10 text-white outline-none"
              />

            </div>

            {/* DESCRIPTION */}
            <div>

              <label className="block text-white mb-3 font-semibold text-lg">

                Description

              </label>

              <textarea
                name="description"
                value={blog.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-5 rounded-2xl bg-[#1e293b]/80 border border-white/10 text-white outline-none"
              />

            </div>

            {/* CONTENT */}
            <div>

              <label className="block text-white mb-3 font-semibold text-lg">

                Blog Content

              </label>

              <textarea
                name="content"
                value={blog.content}
                onChange={handleChange}
                rows="12"
                className="w-full p-5 rounded-2xl bg-[#1e293b]/80 border border-white/10 text-white outline-none"
              />

            </div>

            {/* CATEGORY */}
            <div>

              <label className="block text-white mb-3 font-semibold text-lg">

                Category

              </label>

              <select
                name="category"
                value={blog.category}
                onChange={handleChange}
                className="w-full p-5 rounded-2xl bg-[#1e293b]/80 border border-white/10 text-white outline-none"
              >

                <option value="">
                  Select Category
                </option>

                <option value="Technology">
                  Technology
                </option>

                <option value="AI">
                  AI
                </option>

                <option value="Cricket">
                  Cricket
                </option>

                <option value="Lifestyle">
                  Lifestyle
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Programming">
                  Programming
                </option>

              </select>

            </div>

            {/* IMAGE */}
            <div>

              <label className="block text-white mb-4 font-semibold text-lg">

                Current Image

              </label>

              <img
                src={
                  typeof blog.image ===
                  "string"
                    ? blog.image
                    : URL.createObjectURL(
                        blog.image
                      )
                }
                alt="blog"
                className="w-full h-[400px] object-cover rounded-3xl"
              />

            </div>

            {/* CHANGE IMAGE */}
            <div>

              <label className="block text-white mb-4 font-semibold text-lg">

                Change Blog Image

              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    image:
                      e.target.files[0],
                  })
                }
                className="w-full p-4 rounded-2xl bg-[#1e293b]/80 text-white"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-300 text-black py-5 rounded-3xl font-black text-2xl"
            >

              {
                loading
                  ? "Updating..."
                  : "Update Blog 🚀"
              }

            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditBlog;