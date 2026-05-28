import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Search,
  ArrowRight,
} from "lucide-react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const Herosection = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [blogsData, setBlogsData] = useState([]);

  // LOADING STATE
  const [loading, setLoading] = useState(true);

  // FETCH BLOGS
  const fetchBlogs = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs`
      );

      setBlogsData(response.data.blogs);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    const animateCount = (
      id,
      target,
      suffix = ""
    ) => {

      let count = 0;

      const element =
        document.getElementById(id);

      if (!element) return;

      const speed = target / 50;

      const updateCount = () => {

        count += speed;

        if (count < target) {

          element.innerText =
            Math.floor(count) + suffix;

          requestAnimationFrame(updateCount);

        } else {

          element.innerText =
            target + suffix;

        }
      };

      updateCount();
    };

    animateCount("blogsCount", 100, "+");

    animateCount("readersCount", 10, "K+");

    animateCount("creatorsCount", 20, "+");

    fetchBlogs();

  }, []);

  // FILTER BLOGS
  const filteredBlogs = blogsData.filter((blog) => {

    const matchesSearch =
      blog.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      blog.description
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      blog.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||

      blog.category.toLowerCase() ===
      selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // NAVIGATION
  const handleExplore = () => {

    navigate(
      `/blog?search=${search}&category=${selectedCategory}`
    );
  };

  return (

    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-5 sm:px-6 lg:px-16 py-10">

      {/* GRID BG */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* AURORA */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-400/20 blur-[140px] rounded-full animate-aurora"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full animate-aurora2"></div>

      {/* MAIN */}
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center min-h-[85vh]">

        {/* LEFT */}
        <div className="text-center lg:text-left">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs sm:text-sm font-semibold shadow-lg mb-6 backdrop-blur-xl">

            ✨ New : AI Features Integrated

          </div>

          <p className="text-cyan-300 font-semibold tracking-[5px] uppercase text-sm mb-5">

            Welcome To DeSpire

          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1]">

            Read. Learn.
            <br />

            <span className="bg-gradient-to-r from-cyan-300 via-white to-cyan-300 bg-clip-text text-transparent">

              Get Inspired.

            </span>

          </h1>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mt-8 max-w-2xl">

            Discover AI-powered blogs across tech,
            cricket, startups, travel, lifestyle & more.
            Generate content instantly with AI or
            edit and publish your own stories beautifully.

          </p>

          {/* STATS */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-10 mt-12">

            <div>

              <h2
                id="blogsCount"
                className="text-cyan-300 text-4xl font-black"
              >

                0

              </h2>

              <p className="text-gray-400 mt-2">

                Blogs Published

              </p>

            </div>

            <div>

              <h2
                id="readersCount"
                className="text-cyan-300 text-4xl font-black"
              >

                0

              </h2>

              <p className="text-gray-400 mt-2">

                Monthly Readers

              </p>

            </div>

            <div>

              <h2
                id="creatorsCount"
                className="text-cyan-300 text-4xl font-black"
              >

                0

              </h2>

              <p className="text-gray-400 mt-2">

                Creators

              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="w-full flex justify-center lg:justify-end">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
              w-full
              max-w-[520px]
              bg-white/5
              border
              border-white/10
              backdrop-blur-2xl
              rounded-[40px]
              p-6 sm:p-8
              shadow-[0_0_60px_rgba(0,255,255,0.08)]
            "
          >

            {/* SEARCH */}
            <div className="relative">

              <div className="absolute inset-0 bg-cyan-400/10 blur-2xl rounded-3xl"></div>

              <div
                className="
                  relative
                  flex
                  items-center
                  bg-white/10
                  border
                  border-white/10
                  rounded-3xl
                  overflow-hidden
                "
              >

                <Search
                  className="ml-5 text-cyan-300"
                  size={24}
                />

                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                    w-full
                    bg-transparent
                    px-4
                    py-5
                    text-lg
                    outline-none
                    text-white
                    placeholder:text-gray-400
                  "
                />

              </div>

            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-4 mt-8">

              {[
                "All",
                "Technology",
                "Cricket",
                "Lifestyle",
                "Travel",
              ].map((item, index) => (

                <button
                  key={index}
                  onClick={() =>
                    setSelectedCategory(item)
                  }
                  className={`px-5 py-3 rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 ${
                    selectedCategory === item
                      ? "bg-cyan-300 text-black"
                      : "bg-white/10 text-white hover:bg-cyan-300 hover:text-black"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button
                onClick={handleExplore}
                className="
                  flex-1
                  py-4
                  rounded-2xl
                  bg-cyan-300
                  text-black
                  font-black
                  text-lg
                "
              >

                Explore Blogs

              </button>

              <button
                onClick={() =>
                  navigate("/create-blog")
                }
                className="
                  flex-1
                  py-4
                  rounded-2xl
                  border
                  border-cyan-300
                  text-cyan-300
                  font-black
                  text-lg
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                Create Blog

                <ArrowRight size={22} />

              </button>

            </div>

            {/* LIVE BLOGS */}
            <div
              className="
                mt-10
                space-y-5
                max-h-[210px]
                overflow-y-auto
                pr-2
              "
            >

              {loading ? (

                [...Array(3)].map((_, index) => (

                  <div
                    key={index}
                    className="
                      animate-pulse
                      flex
                      gap-4
                      items-center
                      bg-white/5
                      border
                      border-white/10
                      rounded-2xl
                      p-3
                    "
                  >

                    <div className="w-24 h-24 rounded-2xl bg-white/10"></div>

                    <div className="flex-1">

                      <div className="h-4 w-24 bg-white/10 rounded mb-3"></div>

                      <div className="h-6 w-[80%] bg-white/10 rounded mb-3"></div>

                      <div className="h-4 w-full bg-white/10 rounded"></div>

                    </div>

                  </div>

                ))

              ) : filteredBlogs.length > 0 ? (

                filteredBlogs.map((blog, index) => (

                  <div
                    key={blog?._id || index}
                    onClick={() => {

                      if (blog?._id) {

                        navigate(`/blog/${blog._id}`);

                      }

                    }}
                    className="
                      flex
                      gap-4
                      items-center
                      bg-white/5
                      border
                      border-white/10
                      rounded-2xl
                      p-3
                      hover:bg-white/10
                      transition-all
                      duration-300
                      cursor-pointer
                    "
                  >

                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="
                        w-24
                        h-24
                        object-cover
                        rounded-2xl
                        flex-shrink-0
                      "
                    />

                    <div className="overflow-hidden">

                      <span className="text-cyan-300 text-sm font-bold">

                        {blog.category}

                      </span>

                      <h3 className="text-white font-bold text-lg line-clamp-1 mt-1">

                        {blog.title}

                      </h3>

                      <p className="text-gray-400 text-sm line-clamp-2 mt-1">

                        {blog.description}

                      </p>

                    </div>

                  </div>

                ))

              ) : (

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">

                  <h3 className="text-white text-xl font-bold">

                    No Blogs Found...

                  </h3>

                  <p className="text-gray-400 mt-2">

                    Try another category or search term.

                  </p>

                </div>

              )}

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default Herosection;