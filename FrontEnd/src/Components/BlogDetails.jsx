import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import { useUser } from "@clerk/clerk-react";

import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Share2,
  UserPlus,
} from "lucide-react";

const BlogDetails = () => {

  const { id } = useParams();

  const { user } = useUser();

  const [blog, setBlog] =
    useState(null);

  const [comment, setComment] =
    useState("");

  // FOLLOW STATE
  const [following, setFollowing] =
    useState(false);

  // FOLLOW COUNTS
  const [followersCount,
    setFollowersCount] =
    useState(0);

  const [followingCount,
    setFollowingCount] =
    useState(0);

  // ============================
  // FETCH BLOG
  // ============================

  const fetchBlog = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );

      setBlog(
        response.data.blog
      );

    } catch (error) {

      console.log(error);

    }
  };

  // ============================
  // CHECK FOLLOW STATUS
  // ============================

  const checkFollowStatus =
    async () => {

      if (!user || !blog)
        return;

      try {

        const response =
          await axios.get(
            `http://localhost:5000/api/follow/check/${user.id}/${blog.authorId}`
          );

        setFollowing(
          response.data.following
        );

      } catch (error) {

        console.log(error);

      }
    };

  // ============================
  // FETCH FOLLOW COUNTS
  // ============================

  const fetchFollowCounts =
    async () => {

      if (!blog) return;

      try {

        const followersRes =
          await axios.get(
            `http://localhost:5000/api/follow/followers/${blog.authorId}`
          );

        setFollowersCount(
          followersRes.data.count
        );

        const followingRes =
          await axios.get(
            `http://localhost:5000/api/follow/following/${blog.authorId}`
          );

        setFollowingCount(
          followingRes.data.count
        );

      } catch (error) {

        console.log(error);

      }
    };

  // ============================
  // FOLLOW / UNFOLLOW
  // ============================

  const handleFollow =
    async () => {

      try {

        if (following) {

          await axios.post(
            "http://localhost:5000/api/follow/unfollow",
            {
              followerId:
                user.id,

              followingId:
                blog.authorId,
            }
          );

          setFollowing(false);

        } else {

          await axios.post(
            "http://localhost:5000/api/follow/follow",
            {
              followerId:
                user.id,

              followingId:
                blog.authorId,
            }
          );

          setFollowing(true);

        }

        fetchFollowCounts();

      } catch (error) {

        console.log(error);

      }
    };

  // ============================
  // SHARE BLOG
  // ============================

  const handleShare =
    async () => {

      const shareData = {

        title:
          blog.title,

        text:
          blog.description,

        url:
          window.location.href,

      };

      try {

        if (
          navigator.share
        ) {

          await navigator.share(
            shareData
          );

        } else {

          navigator.clipboard.writeText(
            window.location.href
          );

          alert(
            "Blog link copied 🚀"
          );

        }

      } catch (error) {

        console.log(error);

      }
    };

  // ============================
  // LIKE BLOG
  // ============================

 const handleLike = async () => {

  try {

    const response =
      await axios.put(

        `http://localhost:5000/api/blogs/${id}/like`,

        {

          userId:
            user.id,

          userName:
            user.fullName,

        }

      );

    setBlog((prev) => ({

      ...prev,

      likes:
        response.data.likes,

      dislikes:
        response.data.dislikes,

      likedBy:
        response.data.likedBy,

      dislikedBy:
        response.data.dislikedBy,

    }));

  } catch (error) {

    console.log(error);

  }
};

  // ============================
  // DISLIKE BLOG
  // ============================

  const handleDislike = async () => {

  try {

    const response =
      await axios.put(

        `http://localhost:5000/api/blogs/${id}/dislike`,

        {

          userId:
            user.id,

          userName:
            user.fullName,

        }

      );

    setBlog((prev) => ({

      ...prev,

      likes:
        response.data.likes,

      dislikes:
        response.data.dislikes,

      likedBy:
        response.data.likedBy,

      dislikedBy:
        response.data.dislikedBy,

    }));

  } catch (error) {

    console.log(error);

  }
};

  // ============================
  // COMMENT BLOG
  // ============================

  const handleComment =
    async () => {

      if (!comment)
        return;

      try {

        const response =
          await axios.post(

            `http://localhost:5000/api/blogs/${id}/comment`,

            {

              user:
                user?.fullName ||
                "User",

              text:
                comment,

              userId:
                user.id,

              userName:
                user.fullName,

            }

          );

        setBlog({

          ...blog,

          comments:
            response.data.comments,

        });

        setComment("");

      } catch (error) {

        console.log(error);

      }
    };

  // ============================
  // FETCH BLOG
  // ============================

  useEffect(() => {

    fetchBlog();

  }, []);

  // ============================
  // FOLLOW EFFECTS
  // ============================

  useEffect(() => {

    if (blog) {

      fetchFollowCounts();

    }

    if (blog && user) {

      checkFollowStatus();

    }

  }, [blog, user, following]);

  // ============================
  // LOADING
  // ============================

  if (!blog) {

    return (

      <div className="min-h-screen bg-[#0f172a] flex justify-center items-center text-white text-3xl font-bold">

        Loading...

      </div>

    );
  }

  return (

    <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] px-5 py-20">

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          max-w-5xl
          mx-auto
          bg-white/5
          border
          border-white/10
          backdrop-blur-2xl
          rounded-[40px]
          p-6
          sm:p-10
        "
      >

        {/* CATEGORY */}
        <div className="flex justify-center">

          <span className="px-5 py-2 rounded-full bg-cyan-300 text-black font-bold text-sm">

            {blog.category}

          </span>

        </div>

        {/* TITLE */}
        <h1 className="text-4xl sm:text-6xl font-black text-center text-white leading-tight mt-8">

          {blog.title}

        </h1>

        {/* AUTHOR */}
        <div className="flex flex-col items-center mt-5">

          <p className="text-center text-gray-400 text-lg">

            By {blog.authorName}

          </p>

          {/* FOLLOWERS */}
          <div className="flex gap-10 mt-5">

            <div className="text-center">

              <h2 className="text-cyan-300 text-2xl font-black">

                {followersCount}

              </h2>

              <p className="text-gray-400 text-sm">

                Followers

              </p>

            </div>

            <div className="text-center">

              <h2 className="text-cyan-300 text-2xl font-black">

                {followingCount}

              </h2>

              <p className="text-gray-400 text-sm">

                Following

              </p>

            </div>

          </div>

          {/* FOLLOW BUTTON */}
          {
            user?.id !==
              blog.authorId && (

              <button
                onClick={
                  handleFollow
                }
                className={`
                  mt-5
                  flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  rounded-2xl
                  font-bold
                  transition-all
                  hover:scale-105

                  ${
                    following
                      ? "bg-white/10 text-white"
                      : "bg-cyan-300 text-black"
                  }
                `}
              >

                <UserPlus size={20} />

                {
                  following
                    ? "Following"
                    : "Follow"
                }

              </button>

            )
          }

        </div>

        {/* IMAGE */}
        <div className="mt-10 overflow-hidden rounded-3xl">

          <img
            src={blog.image}
            alt={blog.title}
            className="
              w-full
              h-[250px]
              sm:h-[500px]
              object-cover
              hover:scale-105
              transition-all
              duration-700
            "
          />

        </div>

        {/* DESCRIPTION */}
        <p className="text-gray-300 text-xl leading-relaxed mt-10 text-center max-w-3xl mx-auto">

          {blog.description}

        </p>

        {/* CONTENT */}
        <div
          className="
            mt-14
            text-gray-200
            leading-[2]
            text-lg
            whitespace-pre-line
          "
        >

          {blog.content}

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-6 mt-14 justify-center flex-wrap">

          {/* LIKE */}
          <button
  onClick={handleLike}
  className={`
    flex
    items-center
    gap-2
    px-6
    py-3
    rounded-2xl
    font-bold
    transition-all
    duration-300
    hover:scale-105

    ${
      blog?.likedBy?.includes(
        user?.id
      )
        ? "bg-green-500 text-white shadow-lg shadow-green-500/40"
        : "bg-white/10 text-white"
    }
  `}
>

  <ThumbsUp size={20} />

  {blog.likes}

</button>

          {/* DISLIKE */}
          <button
  onClick={handleDislike}
  className={`
    flex
    items-center
    gap-2
    px-6
    py-3
    rounded-2xl
    font-bold
    transition-all
    duration-300
    hover:scale-105

    ${
      blog?.dislikedBy?.includes(
        user?.id
      )
        ? "bg-red-500 text-white shadow-lg shadow-red-500/40"
        : "bg-white/10 text-white"
    }
  `}
>

  <ThumbsDown size={20} />

  {blog.dislikes}

</button>

          {/* SHARE */}
          <button
            onClick={
              handleShare
            }
            className="
              flex
              items-center
              gap-2
              px-6
              py-3
              rounded-2xl
              font-bold
              bg-cyan-300
              text-black
              hover:scale-105
              transition-all
            "
          >

            <Share2 size={20} />

            Share

          </button>

        </div>

        {/* COMMENTS */}
        <div className="mt-20">

          <div className="flex items-center gap-3 mb-8">

            <MessageCircle className="text-cyan-300" />

            <h2 className="text-3xl font-bold text-white">

              Comments

            </h2>

          </div>

          {/* COMMENT INPUT */}
          <div className="flex flex-col sm:flex-row gap-4">

            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              className="
                flex-1
                px-5
                py-4
                rounded-2xl
                bg-white/10
                border
                border-white/10
                text-white
                outline-none
              "
            />

            <button
              onClick={
                handleComment
              }
              className="
                px-8
                py-4
                rounded-2xl
                bg-cyan-300
                text-black
                font-bold
                hover:scale-105
                transition-all
              "
            >

              Post

            </button>

          </div>

          {/* COMMENTS LIST */}
          <div className="mt-10 space-y-5">

            {
              blog.comments &&
              blog.comments.length > 0 ? (

                blog.comments.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-2xl
                        p-5
                      "
                    >

                      <h3 className="text-cyan-300 font-bold">

                        {item.user}

                      </h3>

                      <p className="text-gray-300 mt-2">

                        {item.text}

                      </p>

                    </div>

                  )
                )

              ) : (

                <p className="text-gray-400">

                  No comments yet 😔

                </p>

              )
            }

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default BlogDetails;