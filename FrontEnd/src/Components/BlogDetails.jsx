import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, UserPlus } from "lucide-react";
import Navbar from "./Navbar";

// CLEAN MARKDOWN FUNCTION
const cleanText = (text) => {
  if (!text) return "";
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#{1,6}\s/g, "")
    .replace(/^\s*[-•]\s/gm, "")
    .replace(/^\s*\d+\.\s/gm, "");
};

const BlogDetails = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [following, setFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [saved, setSaved] = useState(false);



  // ============================
  // FETCH BLOG
  // ============================
  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`
      );
      setBlog(response.data.blog);
    } catch (error) {
      console.log(error);
    }
  };

  

  // ============================
  // CHECK FOLLOW STATUS
  // ============================
  const checkFollowStatus = async () => {
    if (!user || !blog) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/follow/check/${user.id}/${blog.authorId}`
      );
      setFollowing(response.data.following);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
const handleScroll = () => {
const totalHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

```
const currentScroll = window.scrollY;

const percentage = (currentScroll / totalHeight) * 100;

setProgress(percentage);
```

};

window.addEventListener("scroll", handleScroll);

return () => {
window.removeEventListener("scroll", handleScroll);
};
}, []);


  // ============================
  // FETCH FOLLOW COUNTS
  // ============================
  const fetchFollowCounts = async () => {
    if (!blog) return;
    try {
      const followersRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/follow/followers/${blog.authorId}`
      );
      setFollowersCount(followersRes.data.count);

      const followingRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/follow/following/${blog.authorId}`
      );
      setFollowingCount(followingRes.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
const handleScroll = () => {
const totalHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

```
const currentScroll = window.scrollY;

const percentage = (currentScroll / totalHeight) * 100;

setProgress(percentage);
```

};

window.addEventListener("scroll", handleScroll);

return () => {
window.removeEventListener("scroll", handleScroll);
};
}, []);


  // ============================
  // FOLLOW / UNFOLLOW
  // ============================
  const handleFollow = async () => {
    try {
      if (following) {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/follow/unfollow`,
          { followerId: user.id, followingId: blog.authorId }
        );
        setFollowing(false);
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/follow/follow`,
          { followerId: user.id, followingId: blog.authorId }
        );
        setFollowing(true);
      }
      fetchFollowCounts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
const handleScroll = () => {
const totalHeight =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

```
const currentScroll = window.scrollY;

const percentage = (currentScroll / totalHeight) * 100;

setProgress(percentage);
```

};

window.addEventListener("scroll", handleScroll);

return () => {
window.removeEventListener("scroll", handleScroll);
};
}, []);


  // ============================
  // SHARE BLOG
  // ============================
  const handleShare = async () => {
    const shareData = {
      title: blog.title,
      text: blog.description,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Blog link copied 🚀");
      }
    } catch (error) {
      console.log(error);
    }
  };


  // ============================
// SAVE BLOG
// ============================
const handleSaveBlog = async () => {

  if (!user) {

    alert(
      "Please login to save blogs"
    );

    return;

  }

  try {

    const response =
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/save-blog`,
        {
          clerkId: user.id,
          blogId: blog._id,
        }
      );

    setSaved(
      response.data.saved
    );

    alert(
      response.data.saved
        ? "⭐ Blog Saved"
        : "⭐ Blog Removed"
    );

  } catch (error) {

    console.log(error);

    alert(
      "Error saving blog"
    );

  }

};
useEffect(() => {
  const checkSaved = async () => {
    if (!user || !blog) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/saved/${user.id}`
      );

      const isSaved = res.data.savedBlogs.some(
        (item) => item._id === blog._id
      );

      setSaved(isSaved);

    } catch (error) {
      console.log(error);
    }
  };

  checkSaved();
}, [user, blog]);


  // ============================
  // LIKE BLOG
  // ============================
  const handleLike = async () => {
    if (!user) { alert("Please login first"); return; }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}/like`,
        { userId: user.id, userName: user.fullName }
      );
      if (response.data.success) {
        setBlog((prev) => ({
          ...prev,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
          likedBy: response.data.likedBy || [],
          dislikedBy: response.data.dislikedBy || [],
        }));
      }
    } catch (error) {
      console.log("LIKE ERROR:", error.response?.data || error.message);
    }
  };

  // ============================
  // DISLIKE BLOG
  // ============================
  const handleDislike = async () => {
    if (!user) { alert("Please login first"); return; }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}/dislike`,
        { userId: user.id, userName: user.fullName }
      );
      if (response.data.success) {
        setBlog((prev) => ({
          ...prev,
          likes: response.data.likes,
          dislikes: response.data.dislikes,
          likedBy: response.data.likedBy || [],
          dislikedBy: response.data.dislikedBy || [],
        }));
      }
    } catch (error) {
      console.log("DISLIKE ERROR:", error.response?.data || error.message);
    }
  };

  // ============================
  // COMMENT BLOG
  // ============================
  const handleComment = async () => {
    if (!comment) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}/comment`,
        {
          user: user?.fullName || "User",
          text: comment,
          userId: user.id,
          userName: user.fullName,
        }
      );
      setBlog({ ...blog, comments: response.data.comments });
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  // ============================
  // EFFECTS
  // ============================
  useEffect(() => { fetchBlog(); }, []);

  useEffect(() => {
    if (blog) { fetchFollowCounts(); }
    if (blog && user) { checkFollowStatus(); }
  }, [blog, user, following]);

  // ============================
// DELETE COMMENT
// ============================
const handleDeleteComment = async (commentId) => {
  try {

    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}/comment/${commentId}`,
      {
        data: {
          userId: user.id,
        },
      }
    );

    setBlog({
      ...blog,
      comments: response.data.comments,
    });

  } catch (error) {
    console.log(error);
  }
};

  // ============================
  // LOADING
  // ============================
if (!blog) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#020617]">
      <div className="max-w-5xl w-full mx-auto p-6 sm:p-10 animate-pulse">

        <div className="h-8 w-40 bg-white/10 rounded-full mx-auto mb-8"></div>

        <div className="h-14 bg-white/10 rounded-xl w-full mb-4"></div>
        <div className="h-14 bg-white/10 rounded-xl w-3/4 mx-auto mb-10"></div>

        <div className="h-[300px] sm:h-[500px] bg-white/10 rounded-3xl mb-10"></div>

        <div className="space-y-4">
          <div className="h-5 bg-white/10 rounded"></div>
          <div className="h-5 bg-white/10 rounded"></div>
          <div className="h-5 bg-white/10 rounded w-11/12"></div>
          <div className="h-5 bg-white/10 rounded w-10/12"></div>
          <div className="h-5 bg-white/10 rounded"></div>
          <div className="h-5 bg-white/10 rounded w-9/12"></div>
        </div>

      </div>
    </div>
  );
}

  return (
  <section
  className="
    min-h-screen
    px-5
    py-20

    bg-[#020617]

    bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]

    bg-[size:40px_40px]
  "
>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-6 sm:p-10"
      >

        {/* CATEGORY */}
        <div className="flex justify-center">
          <span className="px-5 py-2 rounded-full bg-cyan-300 text-black font-bold text-sm">
            {blog.category}
          </span>
        </div>
<motion.h1
  initial={{
    opacity: 0,
    clipPath: "inset(0 100% 0 0)",
  }}
  animate={{
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
  }}
  transition={{
    duration: 1.5,
    ease: "easeInOut",
  }}
  className="
    text-4xl
    sm:text-5xl
    md:text-6xl
    lg:text-6xl

    font-black
    text-center

    mt-6
    sm:mt-8

    leading-tight
    sm:leading-tight

    px-2
    sm:px-4

    break-words

    bg-gradient-to-r
    from-cyan-300
    via-white
    to-purple-400
    bg-clip-text
    text-transparent
  "
>
  {cleanText(blog.title)}
</motion.h1>

        {/* AUTHOR */}
        <div className="flex flex-col items-center mt-5">
          <p className="text-center text-gray-200 text-lg">By {blog.authorName}</p>

          {/* FOLLOWERS */}
          <div className="flex gap-10 mt-5">
            <div className="text-center">
              <h2 className="text-cyan-300 text-2xl font-black">{followersCount}</h2>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>
            <div className="text-center">
              <h2 className="text-cyan-300 text-2xl font-black">{followingCount}</h2>
              <p className="text-gray-400 text-sm">Following</p>
            </div>
          </div>

          {/* FOLLOW BUTTON */}
          {user?.id !== blog.authorId && (
            <button
              onClick={handleFollow}
              className={`mt-5 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 ${
                following ? "bg-white/10 text-white" : "bg-cyan-300 text-black"
              }`}
            >
              <UserPlus size={20} />
              {following ? "Following" : "Follow"}
            </button>
          )}
        </div>

        {/* IMAGE */}
        <div className="mt-10 overflow-hidden rounded-3xl">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[250px] sm:h-[500px] object-cover hover:scale-105 transition-all duration-700"
          />
        </div>

<motion.p
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.5, delay: 0.7 }}
  className="
    text-center
    max-w-4xl
    mx-auto
    mt-10
    text-xl
    sm:text-2xl
    text-slate-300
    leading-loose
    italic
  "
>
  {cleanText(blog.description)}
</motion.p>
<motion.div
  initial={{
    opacity: 0,
    y: 100,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 1.5,
    delay: 1,
    ease: "easeOut",
  }}
  className="
    mt-10
    sm:mt-14

    w-full
    max-w-none

    border-t
    border-white/20

    pt-6
    sm:pt-8

    lg:max-w-5xl
    lg:mx-auto

    lg:border
    lg:border-cyan-500/20
    lg:bg-white/5
    lg:backdrop-blur-xl
    lg:rounded-[40px]
    lg:p-10
    lg:pt-10
    lg:shadow-[0_0_40px_rgba(34,211,238,0.08)]

    transition-all
    duration-500
  "
>
  <div
    className="
      text-gray-200

      text-base
      sm:text-lg
      lg:text-xl

      leading-8
      sm:leading-[2]

      tracking-normal
      sm:tracking-wide

      whitespace-pre-line
      break-words

      w-full
      px-0
    "
  >
    {cleanText(blog.content)}
  </div>
</motion.div>


        {/* ACTION BUTTONS */}
        <div className="flex gap-6 mt-14 justify-center flex-wrap">

          {/* LIKE */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 ${
              blog?.likedBy?.includes(user?.id)
                ? "bg-green-500 text-white shadow-lg shadow-green-500/40"
                : "bg-white/10 text-white"
            }`}
          >
            <ThumbsUp size={20} />
            {blog.likes}
          </button>

          {/* DISLIKE */}
          <button
            onClick={handleDislike}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 ${
              blog?.dislikedBy?.includes(user?.id)
                ? "bg-red-500 text-white shadow-lg shadow-red-500/40"
                : "bg-white/10 text-white"
            }`}
          >
            <ThumbsDown size={20} />
            {blog.dislikes}
          </button>
  
    
<button
  onClick={handleSaveBlog}
  className="
    flex
    items-center
    gap-2
    px-4
    py-3
    rounded-2xl
    font-bold
    bg-pink-300
    text-black
    hover:bg-pink-400
    hover:scale-105
    transition-all
  "
>
  {saved ? "Unsave ❌" : "Save Blog 📥"}
</button>


          {/* SHARE */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold bg-cyan-300 text-black hover:scale-105 transition-all"
          >
            <Share2 size={20} />
            Share Blog
          </button>

        </div>

        {/* COMMENTS */}
        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <MessageCircle className="text-cyan-300" />
            <h2 className="text-3xl font-bold text-white">Comments</h2>
          </div>

          {/* COMMENT INPUT */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/30 text-white outline-none"
            />
            <button
              onClick={handleComment}
              className="px-8 py-4 rounded-2xl bg-cyan-300 text-black font-bold hover:scale-105 transition-all"
            >
              Post
            </button>
          </div>

          {/* COMMENTS LIST */}

       {/* COMMENTS LIST */}
<div className="mt-10 space-y-5">
  {blog.comments && blog.comments.length > 0 ? (
    blog.comments.map((item, index) => {

      const canDelete =
        item.userId === user?.id ||
        blog.authorId === user?.id;

      return (
        <div
          key={item._id || index}
          className="bg-white/5 border border-white/30 rounded-2xl p-5"
        >
          <h3 className="text-cyan-300 font-bold">
            {item.user}
          </h3>

          <p className="text-gray-300 mt-2">
            {item.text}
          </p>

          {canDelete && (
            <button
              onClick={() =>
                handleDeleteComment(item._id)
              }
              className="mt-3 text-red-400 hover:text-red-300 font-semibold"
            >
              🗑 Delete Comment
            </button>
          )}
        </div>
      );
    })
  ) : (
    <p className="text-gray-400">
      No comments yet 😔
    </p>
  )}
</div>
        </div>

      </motion.div>
    </section>
  );
};

export default BlogDetails;