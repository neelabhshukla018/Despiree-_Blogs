import React, {
  useEffect,
  useState
} from 'react'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'

import {
  UserButton,
  useUser
} from "@clerk/clerk-react"

import {
  Bell
} from "lucide-react"

const Navbar = () => {

  const navigate = useNavigate()

  const { isSignedIn, user } =
    useUser()

  const [menuOpen,
    setMenuOpen] =
    useState(false)

  // NOTIFICATIONS
  const [notifications,
    setNotifications] =
    useState([])

  const [showNotifications,
    setShowNotifications] =
    useState(false)

// ============================
// FETCH NOTIFICATIONS
// ============================

const fetchNotifications =
  async () => {

    try {

      if (!user) return

      const response =
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/notifications/${user.id}`
        )

      setNotifications(
        response.data
      )

    } catch (error) {

      console.log(error)

    }
  }

  // ============================
  // FETCH ON LOAD
  // ============================

  useEffect(() => {

    if (user) {

      fetchNotifications()

    }

  }, [user])

  return (

    <header className="w-full px-3 sm:px-4 md:px-6 py-3 bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b] backdrop-blur-lg border-b border-white/10 shadow-xl z-50 relative">

      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto bg-gray-100 rounded-2xl border border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.25)] px-4 sm:px-6 md:px-8 py-4">

        {/* TOP ROW */}
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
          >

            <img
              src="/Hero-section/Navbar/Header_logo.png"
              alt="DeSpire Logo"
              className="w-28 sm:w-32 md:w-40 lg:w-44 object-contain"
            />

          </div>

          {/* DESKTOP NAVBAR */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-black font-semibold text-base">

            <button
              onClick={() => navigate('/')}
              className="hover:text-[#2563EB] transition duration-300"
            >
              Home
            </button>

            <button
              onClick={() => navigate('/blog')}
              className="hover:text-[#2563EB] transition duration-300"
            >
              Blogs
            </button>

            <button
              onClick={() => navigate('/about')}
              className="hover:text-[#2563EB] transition duration-300"
            >
              About
            </button>

            <button
              onClick={() => navigate('/create-blog')}
              className="hover:text-[#2563EB] transition duration-300"
            >
              Create Your's
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="hover:text-[#2563EB] transition duration-300"
            >
              Contact 
            </button>

{
  user?.primaryEmailAddress
    ?.emailAddress ===
  "neelabhshukla79@gmail.com" && (

    <button
      onClick={() =>
        navigate('/admin/messages')
      }
      className="
        hover:text-cyan-300
        transition
        duration-300
      "
    >

      Admin

    </button>

  )
}




          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 sm:gap-4 relative">

           {/* NOTIFICATION BELL */}
{
  isSignedIn && (

    <div className="relative">

      <button
       onClick={async () => {

  const newState =
    !showNotifications

  setShowNotifications(
    newState
  )

  // ONLY WHEN OPENING
  if (newState) {

    try {

      setTimeout(async () => {

        const response =
          await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/notifications/read/${user.id}`
          )

        setNotifications(
          response.data.notifications
        )

      }, 800)

    } catch (error) {

      console.log(error)

    }

  }

}}

      
        className="
          relative
          flex
          items-center
          justify-center

          w-10
          h-10
          sm:w-11
          sm:h-11

          rounded-2xl

          bg-gradient-to-br
          from-violet-500
          via-purple-500
          to-pink-500

          text-white

          shadow-lg
          shadow-purple-500/30

          hover:scale-110
          hover:shadow-purple-500/50

          transition-all
          duration-300
        "
      >

        <Bell
          size={20}
          className="
            animate-pulse
          "
        />

        {/* UNREAD BADGE */}
        {
          notifications.filter(
            (n) => !n.read
          ).length > 0 && (

            <span
              className="
                absolute
                -top-1
                -right-1

                bg-red-500
                text-white

                text-[10px]
                sm:text-xs

                min-w-[18px]
                h-[18px]

                sm:min-w-[20px]
                sm:h-5

                px-1

                rounded-full

                flex
                items-center
                justify-center

                font-bold

                border-2
                border-white

                shadow-lg
              "
            >

              {
                notifications.filter(
                  (n) => !n.read
                ).length
              }

            </span>

          )
        }

      </button>

      {/* DROPDOWN */}
      {
        showNotifications && (

          <div
            className="
              absolute
              right-[-70px]
              sm:right-0
              mt-4

              w-[260px]
              sm:w-[340px]

              max-h-[400px]
              overflow-y-auto

              bg-[#0f172a]

              border
              border-purple-400/20

              rounded-3xl

              p-4

              z-50

              shadow-[0_10px_40px_rgba(0,0,0,0.5)]
              backdrop-blur-xl
            "
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">

              <h2
                className="
                  text-white
                  font-bold
                  text-lg
                "
              >

                Notifications

              </h2>

              <span
                className="
                  text-purple-300
                  text-sm
                  font-semibold
                "
              >

                {
                  notifications.filter(
                    (n) => !n.read
                  ).length
                } New

              </span>

            </div>

            {/* NOTIFICATIONS */}
            {
              notifications.length > 0 ? (

                notifications.map(
                  (item) => (

                    <div
                      key={item._id}
                      className={`
                        p-4
                        rounded-2xl
                        mb-3
                        transition-all
                        duration-300
                        cursor-pointer
                        border

                        ${
                          item.read
                            ? "bg-white/5 border-white/5"
                            : "bg-purple-500/10 border-purple-500/20"
                        }

                        hover:bg-white/10
                      `}
                    >

                      <p
                        className="
                          text-gray-300
                          text-sm
                          leading-relaxed
                        "
                      >

                        {item.message}

                      </p>

                    </div>

                  )
                )

              ) : (

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center

                    py-10
                  "
                >

                  <Bell
                    size={40}
                    className="
                      text-purple-400
                      mb-3
                    "
                  />

                  <p
                    className="
                      text-gray-400
                      text-sm
                    "
                  >

                    No notifications yet...

                  </p>

                </div>

              )
            }

          </div>

        )
      }

    </div>

  )
}

            {/* DESKTOP BUTTONS */}
            {
              !isSignedIn ? (

                <button
                  onClick={() => navigate('/login')}
                  className="hidden lg:block border border-gray-300 px-5 py-2.5 rounded-xl text-black font-medium hover:bg-cyan-300 transition duration-300"
                >
                  Get Started
                </button>

              ) : (

                <div className="hidden lg:flex items-center gap-3">

                  <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-cyan-300 text-black px-5 py-2.5 rounded-xl font-semibold hover:scale-105 transition duration-300 shadow-lg"
                  >
                    Dashboard
                  </button>

                </div>

              )
            }

            {/* USER BUTTON */}
            {
              isSignedIn && (

                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-9 h-9 sm:w-10 sm:h-10 rounded-2xl border-2 border-cyan-400 shadow-xl"
                    }
                  }}
                />

              )
            }

            {/* HAMBURGER */}
            <button
              onClick={() =>
                setMenuOpen(
                  !menuOpen
                )
              }
              className="lg:hidden flex flex-col gap-1.5 ml-1"
            >

              <span className="w-6 h-[2px] bg-black rounded-full"></span>
              <span className="w-6 h-[2px] bg-black rounded-full"></span>
              <span className="w-6 h-[2px] bg-black rounded-full"></span>

            </button>

          </div>

        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-[500px] mt-5" : "max-h-0"
          }`}
        >

          <div className="flex flex-col gap-5 pt-4 text-black font-medium">

            <button
              onClick={() => {
                navigate('/')
                setMenuOpen(false)
              }}
              className="text-left hover:text-[#2563EB] transition"
            >
              Home
            </button>

            <button
              onClick={() => {
                navigate('/blog')
                setMenuOpen(false)
              }}
              className="text-left hover:text-[#2563EB] transition"
            >
              Blogs
            </button>

            <button
              onClick={() => {
                navigate('/about')
                setMenuOpen(false)
              }}
              className="text-left hover:text-[#2563EB] transition"
            >
              About Us
            </button>

            <button
              onClick={() => {
                navigate('/create-blog')
                setMenuOpen(false)
              }}
              className="text-left hover:text-[#2563EB] transition"
            >
              Create Your's
            </button>

            <button
              onClick={() => {
                navigate('/contact')
                setMenuOpen(false)
              }}
              className="text-left hover:text-[#2563EB] transition"
            >
              Contact us
            </button>

           {/* MOBILE BUTTON */}

{
  !isSignedIn ? (

    <button
      onClick={() => {

        navigate('/login')

        setMenuOpen(false)

      }}
      className="
        border
        border-gray-300
        px-5
        py-3
        rounded-xl
        hover:bg-cyan-300
        transition
        duration-300
      "
    >

      Get Started

    </button>

  ) : (

    <div className="flex flex-col gap-4">

      {/* ADMIN */}

      {
        user?.primaryEmailAddress
          ?.emailAddress ===
        "neelabhshukla79@gmail.com" && (

          <button
            onClick={() => {

              navigate('/admin/messages')

              setMenuOpen(false)

            }}
            className="
              text-left
              hover:text-cyan-300
              transition
            "
          >

            Admin

          </button>

        )
      }

      {/* DASHBOARD */}

      <button
        onClick={() => {

          navigate('/dashboard')

          setMenuOpen(false)

        }}
        className="
          bg-cyan-300
          text-black
          px-5
          py-3
          rounded-xl
          font-semibold
          transition
          duration-300
        "
      >

        Dashboard

      </button>

    </div>

  )
}

          </div>

        </div>

      </div>

    </header>

  )
}

export default Navbar