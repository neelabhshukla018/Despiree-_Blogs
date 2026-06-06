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

    const [userData, setUserData] =
  useState(null)

    useEffect(() => {

  if (!user) return;

  const syncUser = async () => {

    try {

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/sync`,
        {
          clerkId: user.id,
          name: user.fullName,
          email:
            user.primaryEmailAddress
              ?.emailAddress,
        }
      );

    } catch (error) {

      console.log(
        "User Sync Error:",
        error
      );

    }

  };

  syncUser();

}, [user]);

  const [menuOpen,
    setMenuOpen] =
    useState(false)

const [deferredPrompt,
  setDeferredPrompt] =
  useState(null)

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

  // ============================
// FETCH USER DATA
// ============================

useEffect(() => {

  const fetchUserData =
    async () => {

      try {

        if (!user) return

        const res =
          await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/user/${user.id}`
          )

        setUserData(
          res.data
        )

      } catch (error) {

        console.log(error)

      }

    }

  fetchUserData()

}, [user])

useEffect(() => {

  const handler = (e) => {

    e.preventDefault()

    setDeferredPrompt(e)

  }

  window.addEventListener(
    "beforeinstallprompt",
    handler
  )

  return () => {

    window.removeEventListener(
      "beforeinstallprompt",
      handler
    )

  }

}, [])

const handleInstall =
  async () => {

    if (!deferredPrompt)
      return

    deferredPrompt.prompt()

    await deferredPrompt.userChoice

    setDeferredPrompt(
      null
    )

  }

  return (

    <header className="
w-full
px-3
sm:px-5
md:px-8
py-4
bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]
z-50
relative
">

{/* MAIN NAVBAR */}
<div className="
max-w-[1600px]
justify-between
mx-auto
neo-navbar
px-3
sm:px-6
md:px-8
py-3
text-[#222]
font-bold
">

        {/* TOP ROW */}
        <div className="
flex
items-center
justify-between
gap-8
">

          {/* LOGO */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center cursor-pointer"
          >

            <img
              src="/Hero-section/Navbar/Header_logo.png"
              alt="DeSpire Logo"
              className="w-20 sm:w-28 md:w-40 lg:w-44 object-contain"
            />

          </div>

          {/* DESKTOP NAVBAR */}
       <nav className="
hidden
lg:flex
items-center
gap-5
text-[18px]
font-bold
text-black-800
">

            <button
              onClick={() => navigate('/')}
              className="
neo-nav-btn
relative
transition-all
duration-300
hover:text-[#2563EB]
"
            >
              Home
            </button>

            <button
              onClick={() => navigate('/blog')}
              className="
neo-nav-btn
relative
transition-all
duration-300
hover:text-[#2563EB]
"
            >
              Blogs
            </button>

            <button
              onClick={() => navigate('/about')}
              className="
neo-nav-btn
relative
transition-all
duration-300
hover:text-[#2563EB]
"
            >
              About
            </button>

            <button
              onClick={() => navigate('/create-blog')}
              className="
neo-nav-btn
relative
transition-all
duration-300
hover:text-[#2563EB]
"
            >
              Create
            </button>

            <button
              onClick={() => navigate('/contact')}
           className="
neo-nav-btn
relative
transition-all
duration-300
hover:text-[#2563EB]
"
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
neo-nav-btn
relative
transition-all
duration-300
hover:text-[#2563EB]
">

      Admin

    </button>

  )
}




          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">

           {/* NOTIFICATION BELL */}
{
  isSignedIn && (

    <div className="relative ml-3">

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

          w-8
          h-8
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
  deferredPrompt && (

    <button
      onClick={handleInstall}
className="
px-6
py-3

rounded-[20px]

bg-pink-200

text-black-800
font-semibold

transition-all
duration-300

shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.08)]

hover:-translate-y-[2px]
hover:bg-pink-300

active:translate-y-[1px]
active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.95),inset_4px_4px_8px_rgba(0,0,0,0.08)]
"
    >

      ⬇️App

    </button>

  )
}
            {
              !isSignedIn ? (

                <button
                  onClick={() => navigate('/login')}
                className="
hidden
lg:block

px-5
py-2.5

rounded-[18px]

bg-cyan-200

text-slate-800
font-bold

transition-all
duration-300

shadow-[-6px_-6px_12px_rgba(255,255,255,0.95),6px_6px_12px_rgba(0,0,0,0.08)]

hover:-translate-y-[2px]
hover:shadow-[-8px_-8px_16px_rgba(255,255,255,1),8px_8px_16px_rgba(0,0,0,0.10)]

active:translate-y-[1px]
active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.95),inset_4px_4px_8px_rgba(0,0,0,0.08)]
"
                >
                  Get Started
                </button>

              ) : (

                <div className="hidden lg:flex items-center gap-3">

                  <button
                    onClick={() => navigate('/dashboard')}
 className="
px-6
py-3

rounded-[20px]

bg-cyan-200

text-black-800
font-bold
text-lg

transition-all
duration-300

shadow-[-8px_-8px_16px_rgba(255,255,255,0.9),8px_8px_16px_rgba(0,0,0,0.08)]

hover:-translate-y-[2px]
hover:bg-cyan-300


active:translate-y-[1px]
active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.95),inset_4px_4px_8px_rgba(0,0,0,0.08)]
"
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
avatarBox: `
  w-10
  h-10

  sm:w-8
  sm:h-8

  rounded-2xl

  border-2

  ${
    userData?.isPro
      ? "border-amber-500"
      : "border-cyan-400"
  }

  shadow-xl
`
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