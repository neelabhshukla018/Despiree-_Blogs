import React, {
  useEffect,
  useState,
} from "react";

import {
  useUser,
} from "@clerk/clerk-react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

const SavedBlogs = () => {

  const { user } = useUser();

  const navigate = useNavigate();

  const [
    savedBlogs,
    setSavedBlogs,
  ] = useState([]);

  useEffect(() => {

    const fetchSavedBlogs = async () => {

      try {

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/saved/${user?.id}`
        );

        const data = await response.json();

        if (data.success) {

          setSavedBlogs(
            data.savedBlogs
          );

        } else {

          toast.error(
            data.message ||
            "Failed to load saved blogs"
          );

        }

      } catch (error) {

        console.error(
          "Error fetching saved blogs:",
          error
        );

        toast.error(
          "Unable to load saved blogs"
        );

      }

    };


    if (user) {
      fetchSavedBlogs();
    }

  }, [user]);


  return (

    <div
      className="
        min-h-screen

        bg-gradient-to-br
        from-[#0f172a]
        via-[#111827]
        to-[#1e293b]

        overflow-hidden

        p-8
      "
    >

      <div
        className="
          absolute
          inset-0

          opacity-[0.08]

          bg-[linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)]

          bg-[size:32px_32px]

          pointer-events-none
        "
      />

      <h1
        className="
          text-4xl
          font-bold
          text-white
          mb-12
          text-center
        "
      >
        Saved Blogs
      </h1>


      {

        savedBlogs.length === 0 ? (

          <div
            className="
              relative

              max-w-3xl
              mx-auto

              mt-16

              p-10

              rounded-[32px]

              bg-white/5
              backdrop-blur-xl

              border
              border-pink-300/20

              shadow-2xl

              overflow-hidden

              text-center
            "
          >

            <div
              className="
                absolute
                inset-0

                opacity-10

                bg-[linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]

                bg-[size:32px_32px]
              "
            />


            <div className="relative z-10">

              <div className="text-7xl mb-5">

              </div>


              <h2
                className="
                  text-4xl
                  font-black
                  text-white
                "
              >
                𝙉𝙤 𝙎𝙖𝙫𝙚𝙙 𝘽𝙡𝙤𝙜𝙨 𝙔𝙚𝙩
              </h2>


              <p
                className="
                  mt-4

                  text-gray-400

                  text-lg
                "
              >
                Save your favourite blogs
                and they will appear here.
              </p>


              <button
                onClick={() =>
                  navigate("/blog")
                }
                className="
                  mt-8

                  bg-pink-300
                  text-black

                  px-8
                  py-3

                  rounded-2xl

                  font-bold

                  hover:bg-pink-200
                  hover:scale-105

                  transition-all
                  duration-300
                "
              >
                Explore Blogs
              </button>

            </div>

          </div>

        ) : (

          <div
            className="
              relative

              grid
              md:grid-cols-2
              lg:grid-cols-3

              gap-8
            "
          >

            {

              savedBlogs.map((blog) => (

                <div
                  key={blog._id}

                  onClick={() =>
                    navigate(
                      `/blog/${blog._id}`
                    )
                  }

                  className="
                    relative
                    z-10

                    cursor-pointer

                    bg-white/5

                    border
                    border-white/10

                    rounded-3xl

                    overflow-hidden

                    hover:scale-[1.03]

                    transition-all
                    duration-300

                    shadow-2xl
                    backdrop-blur-lg
                  "
                >

                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="
                      w-full
                      h-60
                      object-cover
                    "
                  />


                  <div className="p-6">

                    <button
                      onClick={async (e) => {

                        e.stopPropagation();

                        try {

                          const response =
                            await fetch(
                              `${import.meta.env.VITE_BACKEND_URL}/api/user/save-blog`,
                              {
                                method: "POST",

                                headers: {
                                  "Content-Type":
                                    "application/json",
                                },

                                body: JSON.stringify({
                                  clerkId:
                                    user.id,

                                  blogId:
                                    blog._id,
                                }),
                              }
                            );


                          const data =
                            await response.json();


                          if (data.success) {

                            setSavedBlogs(
                              savedBlogs.filter(
                                (item) =>
                                  item._id !==
                                  blog._id
                              )
                            );

                            toast.success(
                              "Blog removed from saved blogs"
                            );

                          } else {

                            toast.error(
                              data.message ||
                              "Failed to unsave blog"
                            );

                          }

                        } catch (error) {

                          console.error(
                            "Error unsaving blog:",
                            error
                          );

                          toast.error(
                            "Unable to unsave blog. Please try again."
                          );

                        }

                      }}

                      className="
                        mt-4

                        w-full

                        bg-red-500
                        text-white

                        py-3

                        rounded-2xl

                        font-bold

                        hover:bg-red-600

                        transition-all
                      "
                    >
                      Unsave
                    </button>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

};

export default SavedBlogs;

