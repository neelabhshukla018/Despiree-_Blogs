import React, { useState } from "react";

import axios from "axios";

import { useUser } from "@clerk/clerk-react";

import {
  ImagePlus,
  UploadCloud,
  Sparkles,
  ArrowRight,
  WandSparkles,
} from "lucide-react";

const CreateBlog = () => {

  const { user } = useUser();

  // BLOG STATES
  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [content, setContent] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // AI STATES
  const [aiTopic, setAiTopic] =
    useState("");

  const [aiLoading, setAiLoading] =
    useState(false);

  // CATEGORIES
  const categories = [
    "Technology",
    "Cricket",
    "Lifestyle",
    "Travel",
    "Entertainment",
    "Startups",
    "AI",
    "Coding",
    "Competitive Exams",
    "World News",
    "AutoZone",
  ];

  // IMAGE PREVIEW
  const handleImageChange = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (file) {

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );

    }
  };

  // AI GENERATION
  const generateAIContent =
    async () => {

      if (!aiTopic.trim()) {

        alert(
          "Please enter a topic"
        );

        return;
      }

      try {

        setAiLoading(true);

        const response =
          await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/ai/generate`,
            {
              topic: aiTopic,
            }
          );

        const text =
          response.data.text;

        setTitle(aiTopic);

        setDescription(
          text.substring(0, 200)
        );

        setContent(text);

        alert(
          "AI Content Generated Successfully "
        );

      } catch (error) {

        alert(
          error?.response?.data
            ?.message ||
            error.message
        );

      } finally {

        setAiLoading(false);

      }
    };

  // SUBMIT BLOG
  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "content",
        content
      );

      formData.append(
        "category",
        category
      );

      formData.append(
        "image",
        image
      );

      formData.append(
        "authorId",
        user.id
      );

      formData.append(
        "authorName",
        user.fullName
      );

      formData.append(
        "authorEmail",
        user
          ?.primaryEmailAddress
          ?.emailAddress
      );

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/create`,
        formData
      );

      alert(
        "Blog Published Successfully "
      );

      setTitle("");

      setDescription("");

      setContent("");

      setCategory("");

      setImage(null);

      setPreview("");

      setAiTopic("");

    } catch (error) {

      console.log(error);

      alert(
        "Error Publishing Blog"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] overflow-hidden px-3 sm:px-6 py-6 sm:py-10">

      {/* BG */}
      <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-cyan-400/10 rounded-full blur-[120px]" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px]" />

      {/* CARD */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-[0_0_60px_rgba(0,255,255,0.08)]">

        {/* HEADER */}
        <div className="border-b border-white/10 p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">

          <div className="flex flex-col sm:flex-row items-center gap-4">

            <img
              src={user?.imageUrl}
              alt="user"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-cyan-300"
            />

            <div>

              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center lg:justify-start gap-2">

                Create Story

                <Sparkles className="text-cyan-300 animate-pulse" />

              </h1>

              <p className="text-gray-400 mt-1 text-sm sm:text-base">

                Write premium blogs ✨

              </p>

            </div>

          </div>

          <div className="text-center lg:text-right">

            <h2 className="text-white font-bold text-sm sm:text-base">

              {user?.fullName}

            </h2>

            <p className="text-gray-400 text-xs sm:text-sm break-all">

              {
                user
                  ?.primaryEmailAddress
                  ?.emailAddress
              }

            </p>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 md:p-8 flex flex-col gap-6 sm:gap-8"
        >

          {/* AI */}
          <div className="bg-white/5 border border-cyan-300/20 rounded-3xl p-4 sm:p-6">

            <div className="flex items-center gap-3 mb-5">

              <WandSparkles className="text-cyan-300" />

              <h2 className="text-xl sm:text-2xl font-bold text-white">

                Generate with AI

              </h2>

            </div>

            <div className="flex flex-col md:flex-row gap-4">

              <input
                type="text"
                placeholder="Enter topic..."
                value={aiTopic}
                onChange={(e) =>
                  setAiTopic(
                    e.target.value
                  )
                }
                className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-white outline-none text-sm sm:text-base"
              />

              <button
                type="button"
                onClick={
                  generateAIContent
                }
                className="bg-cyan-300 text-black px-6 sm:px-8 py-4 rounded-2xl font-bold hover:scale-105 transition w-full md:w-auto"
              >

                {aiLoading
                  ? "Generating..."
                  : "Generate"}

              </button>

            </div>

          </div>

          {/* TITLE */}
          <div>

            <label className="text-cyan-300 font-semibold mb-3 block text-base sm:text-lg">

              Blog Title

            </label>

            <input
              type="text"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full bg-white/10 border border-white/10 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-white outline-none text-sm sm:text-base"
              required
            />

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="text-cyan-300 font-semibold mb-3 block text-base sm:text-lg">

              Description

            </label>

            <textarea
              placeholder="Short description..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full h-28 sm:h-32 bg-white/10 border border-white/10 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-white outline-none resize-none text-sm sm:text-base"
              required
            />

          </div>

          {/* CONTENT */}
          <div>

            <label className="text-cyan-300 font-semibold mb-3 block text-base sm:text-lg">

              Blog Content

            </label>

            <textarea
              placeholder="Write your full blog content..."
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              className="w-full h-[320px] sm:h-[400px] md:h-[500px] bg-white/10 border border-white/10 rounded-2xl px-4 sm:px-6 py-5 text-white outline-none resize-none text-sm sm:text-base"
              required
            />

          </div>

          {/* CATEGORY */}
          <div>

            <label className="text-cyan-300 font-semibold mb-4 block text-base sm:text-lg">

              Select Category

            </label>

            <div className="flex flex-wrap gap-3">

              {categories.map(
                (
                  item,
                  index
                ) => (

                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setCategory(
                        item
                      )
                    }
                    className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                      category === item
                        ? "bg-cyan-300 text-black scale-105"
                        : "bg-white/10 text-white hover:bg-cyan-300 hover:text-black"
                    }`}
                  >

                    {item}

                  </button>

                )
              )}

            </div>

          </div>

          {/* IMAGE */}
          <div>

            <label className="text-cyan-300 font-semibold mb-4 block text-base sm:text-lg">

              Upload Thumbnail

            </label>

            <label className="relative border-2 border-dashed border-cyan-300/30 rounded-3xl p-5 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-cyan-300 hover:bg-white/5 transition-all overflow-hidden">

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
                required
              />

              {preview ? (

                <div className="w-full">

                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-2xl"
                  />

                  <p className="text-cyan-300 mt-5 font-semibold text-sm sm:text-base">

                    Image Selected ✅

                  </p>

                </div>

              ) : (

                <>

                  <UploadCloud
                    size={45}
                    className="text-cyan-300 animate-bounce"
                  />

                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-5">

                    Upload Blog Cover

                  </h3>

                  <p className="text-gray-400 mt-3 text-sm sm:text-base">

                    Add eye-catching
                    thumbnail ✨

                  </p>

                  <div className="mt-6 bg-cyan-300 text-black px-5 sm:px-6 py-3 rounded-2xl font-bold flex items-center gap-2 text-sm sm:text-base">

                    <ImagePlus />

                    Choose File

                  </div>

                </>

              )}

            </label>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="group bg-cyan-300 text-black py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
          >

            {loading
              ? "Publishing..."
              : "Publish Story"}

            <ArrowRight className="group-hover:translate-x-2 transition" />

          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateBlog;