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

  const [savedBlogs, setSavedBlogs] =
  useState([]);

  const [showProCard, setShowProCard] =
  useState(false);

  const [userData, setUserData] =
  useState(null);

  

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

const fetchSavedBlogs = async () => {

  try {

    if (!user?.id) return;

    const response =
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/saved/${user.id}`
      );

    const data =
      await response.json();

    if (data.success) {

      setSavedBlogs(
        data.savedBlogs
      );

    }

  } catch (error) {

    console.log(error);

  }

};

// RUN FETCH
useEffect(() => {

  fetchBlogs();

  fetchSavedBlogs();

}, [email, user]);

useEffect(() => {

  if (!user?.id) return;

  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/user/${user.id}`
  )
    .then((res) => res.json())
    .then((data) => {

      console.log("USER DATA:", data);

      setUserData(data);

    })
    .catch(console.log);

}, [user]);

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

  const handlePayment = async () => {
  try {

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
      {
        method: "POST",
      }
    );

    const data = await response.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // replace with your test key id
      amount: data.order.amount,
      currency: data.order.currency,
      name: "DeSpire",
      description: "DeSpire Pro Membership",
      order_id: data.order.id,

    handler: async function (
  response
) {

  try {

    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/payment/success`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          userId: user?.id,

          razorpay_payment_id:
            response.razorpay_payment_id,

          razorpay_order_id:
            response.razorpay_order_id,

          razorpay_signature:
            response.razorpay_signature,
        }),
      }
    );

    alert(
      " Welcome to DevSpire Pro!"
    );

    window.location.reload();

  } catch (error) {

    console.log(error);

    alert(
      "Payment succeeded but activation failed."
    );

  }

},
    };

    const rzp =
      new window.Razorpay(
        options
      );

    rzp.open();

  } catch (error) {

    console.log(error);

  }
};

console.log(savedBlogs);

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
  className={`
    w-20
    h-20

    md:w-24
    md:h-24

    rounded-2xl
    md:rounded-full

    object-cover

    border-4

${
  userData?.isPro
    ? "border-amber-200"
    : "border-cyan-300"
}
  `}
/>

<div>

  <div className="flex items-center gap-2 flex-wrap">

    <h1
      className="
        text-1xl
        md:text-4xl
        font-bold
        text-white
      "
    >
      Welcome,  {user?.fullName}
    </h1>

    {userData?.isPro && (

<div className="flex items-center gap-1">

  <span
    className="
      px-2.5
      py-1

      rounded-full

      bg-yellow-300

      text-black

      text-[10px]
      md:text-xs

      font-bold

      uppercase
    "
  >
    𝑷𝑹𝑶
  </span>

  {userData?.isPro && (

<span
  className="
    md:hidden

    ml-4

   text-orange-500

    text-[15px]

    font-semibold
  "
>
    ♾️ 𝘼𝙄 𝙂𝙚𝙣𝙚𝙧𝙖𝙩𝙞𝙤𝙣𝙨
</span>

  )}

</div>

    )}

  </div>

  <p className="text-gray-300 mt-2">
    {email}
  </p>

{userData?.isPro ? (

  <>
    <p className="
      hidden
      md:block
      text-orange-500
      text-sm
      font-semibold
      mt-1
    ">
      ♾️ 𝘼𝙄 𝙂𝙚𝙣𝙚𝙧𝙖𝙩𝙞𝙤𝙣𝙨
    </p>
  </>

) : (

 <div className="mt-2 flex flex-col md:flex-row  md:items-center gap-1 md:gap-8">

  <p className="text-cyan-300 text-sm font-semibold">
    Free AI Blogs Left:{" "}
    {Math.max(0, 5 - (userData?.freeBlogsUsed || 0))}
    /5
  </p>

  <p className="text-pink-300 text-sm font-semibold md:text-right">
    Free AI Covers Left:{" "}
    {Math.max(0, 5 - (userData?.freeImagesUsed || 0))}
    /5
  </p>

</div>

)}
</div>
          </div>

          {/* CREATE BLOG BUTTON */}
<div className="
  flex
  flex-col
  sm:flex-row
  gap-3
  w-full
  sm:w-auto
">

{!userData?.isPro && (

  <div
    className="relative"
    onMouseEnter={() =>
      setShowProCard(true)
    }
    onMouseLeave={() =>
      setShowProCard(false)
    }
  >

    <button
      onClick={handlePayment}
      className="
        w-full
        sm:w-auto

        bg-gradient-to-r
        from-amber-500
        to-yellow-100

        text-black

        px-4
        py-2.5

        sm:px-8
        sm:py-4

        rounded-xl
        sm:rounded-2xl

        text-sm
        sm:text-base

        font-bold

        hover:scale-105

        transition-all
        duration-300

        shadow-lg
      "
    >
      𝙂𝙚𝙩 𝘿𝙚𝙎𝙥𝙞𝙧𝙚 𝙋𝙧𝙤 +
    </button>

  {showProCard && (

    <div

  className="
    hidden
    md:block

    absolute
    top-full
    right-0
    mt-3

    w-[280px]

    z-50

    p-4

    rounded-3xl

    bg-[#0f172a]
    border
    border-cyan-400/20

    shadow-[0_15px_40px_rgba(34,211,238,0.15)]
  "
>

      <h3
        className="
          text-lg
          font-bold
          text-cyan-300
          mb-2
        "
      >
         DeSpire Pro
      </h3>

      <p
        className="
          text-xs
          text-gray-100
          mb-4
        "
      >
        Generate unlimited AI blogs and unlock premium features.
      </p>

      <div className="space-y-2">

       <p className="text-base text-cyan-200">
          𝑼𝒏𝒍𝒊𝒎𝒊𝒕𝒆𝒅 𝑨𝑰 𝑩𝒍𝒐𝒈𝒔
        </p>

            <p className="text-base text-cyan-200">
          𝑼𝒏𝒍𝒊𝒎𝒊𝒕𝒆𝒅 𝑨𝑰 𝑰𝒎𝒂𝒈𝒆 𝑮𝒆𝒏𝒆𝒓𝒂𝒕𝒊𝒐𝒏
        </p>

        <p className="text-base text-cyan-200">
         𝑵𝒐 𝑼𝒔𝒂𝒈𝒆 𝑳𝒊𝒎𝒊𝒕𝒔
        </p>

        <p className="text-base text-cyan-200">
           𝑷𝑹𝑶 𝑩𝒂𝒅𝒈𝒆
        </p>

        <p className="text-base text-cyan-200">
           𝑭𝒖𝒕𝒖𝒓𝒆 𝑷𝒓𝒆𝒎𝒊𝒖𝒎 𝑭𝒆𝒂𝒕𝒖𝒓𝒆𝒔
        </p>

      </div>

      <div
        className="
          mt-4
          text-center

          bg-cyan-500/10

          border
          border-cyan-400/20

          rounded-2xl

          py-3
        "
      >

        <p className="text-gray-400 text-xs">
          Lifetime Access
        </p>

        <h4
          className="
            text-3xl
            font-black
            text-cyan-300
          "
        >
           ₹49
          </h4>

        </div>

      </div>

    )}

  </div>

)}

<div className="flex gap-3 w-full sm:w-auto">

  {/* CREATE BLOG */}
  <button
    onClick={() =>
      navigate("/create-blog")
    }
    className="
      flex-1
      sm:flex-none

      bg-cyan-300
      text-black

      px-4
      py-3

      rounded-xl

      text-sm

      font-bold

      hover:scale-105
      hover:bg-cyan-400

      transition
      duration-300

      shadow-2xl
    "
  >
    + 𝘾𝙧𝙚𝙖𝙩𝙚 𝘽𝙡𝙤𝙜
  </button>

  {/* SAVED BLOGS */}
  <button
    onClick={() =>
      navigate("/saved-blogs")
    }
    className="
      flex-1
      sm:flex-none

      bg-pink-300
      text-black

      px-4
      py-3

      rounded-xl

      text-sm

      font-bold

      hover:scale-105
      hover:bg-pink-200

      transition
      duration-300

      shadow-lg
    "
  >
    ❤️ 𝙎𝙖𝙫𝙚𝙙 𝘽𝙡𝙤𝙜𝙨
  </button>

</div>

</div>



        </div>


        {/* BLOG COUNT */}
        <div className="mt-14 text-center sm:text-left">

          <h2 className="text-6xl font-black text-cyan-300">

            {blogs.length}

          </h2>

          <p className="text-gray-400 mt-2 text-lg ">

            Blogs Published

          </p>

        </div>

        {/* BLOG SECTION */}
        <div className="mt-12">

          <h2 className="text-4xl text-center font-bold text-cyan-500 mb-10">

          𝘽𝙡𝙤𝙜𝙨 𝘽𝙮 𝙔𝙤𝙪 

          </h2>

          {

            blogs.length === 0 ? (

              <div className="bg-white/5 border border-white/20 rounded-3xl p-14 text-center backdrop-blur-lg">

                <h3 className="text-3xl font-bold text-white">

                  No Blogs Yet

                </h3>

                <p className="text-gray-400 mt-4 text-lg">

                  𝑺𝒕𝒂𝒓𝒕 𝒄𝒓𝒆𝒂𝒕𝒊𝒏𝒈 𝒚𝒐𝒖𝒓 𝒇𝒊𝒓𝒔𝒕 𝒂𝒎𝒂𝒛𝒊𝒏𝒈 𝒃𝒍𝒐𝒈.

                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {blogs.map((blog) => (

<div
  key={blog._id}
  onClick={() =>
    navigate(`/blog/${blog._id}`)
  }
  className="
    cursor-pointer

    bg-white/5
    border
    border-white/10

    rounded-3xl

    overflow-hidden

    hover:scale-[1.03]

    transition
    duration-300

    shadow-2xl
    backdrop-blur-lg
  "
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
                      <p className="text-orange-200 text-sm mt-4">

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
  onClick={(e) => { e.stopPropagation(); 
  
  if (blog?._id) { navigate( `/edit-blog/${blog._id}` ); 
  }
   }} 
   className=" flex-1 bg-cyan-300 text-black py-3 rounded-xl font-bold hover:scale-105 transition duration-300 " > Edit
   
    </button>
   
    {/* DELETE */}
    
     <button onClick={(e) => { e.stopPropagation(); deleteBlog( blog?._id ); }} 
     
     className=" flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:scale-105 transition duration-300 " > Delete 
     
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