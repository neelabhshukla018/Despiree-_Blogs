import React, { useEffect, useState } from "react";

import axios from "axios";

import { useUser } from "@clerk/clerk-react";

import {
  Trash2,
  Mail,
  FileText,
  ShieldCheck,
} from "lucide-react";

const AdminMessages = () => {

  const { user, isLoaded } = useUser();

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  // ADMIN EMAIL

  const adminEmail =
    "neelabhshukla79@gmail.com";

  // FETCH CONTACTS

  const fetchMessages = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts`
      );

      setMessages(res.data.contacts);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  // DELETE MESSAGE

  const deleteMessage = async (id) => {

    try {

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact/${id}`
      );

      fetchMessages();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    if (
      user?.primaryEmailAddress
        ?.emailAddress === adminEmail
    ) {

      fetchMessages();

    }

  }, [user]);

  // LOADING STATE

  if (!isLoaded) {

    return (

      <div className="
        min-h-screen
        bg-[#020617]
        flex
        items-center
        justify-center
        px-4
      ">

        <div className="
          w-full
          max-w-5xl
          animate-pulse
          space-y-8
        ">

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="
                bg-white/5
                border
                border-white/10
                rounded-[24px]
                p-5
                sm:p-8
                backdrop-blur-xl
              "
            >

              <div className="
                flex
                flex-col
                gap-5
              ">

                <div className="
                  h-10
                  w-48
                  bg-slate-800
                  rounded-xl
                "></div>

                <div className="
                  h-5
                  w-full
                  sm:w-80
                  bg-slate-800
                  rounded-lg
                "></div>

                <div className="
                  h-12
                  w-full
                  sm:w-40
                  bg-red-400/20
                  rounded-2xl
                "></div>

              </div>

            </div>

          ))}

        </div>

      </div>

    );

  }

  // ACCESS DENIED

  if (
    user?.primaryEmailAddress
      ?.emailAddress !== adminEmail
  ) {

    return (

      <div className="
        min-h-screen
        bg-[#020617]
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
      ">

        <div className="
          w-20
          h-20
          sm:w-24
          sm:h-24
          rounded-full
          bg-red-500/10
          flex
          items-center
          justify-center
          text-red-500
          mb-8
        ">

          <ShieldCheck size={45} />

        </div>

        <h1 className="
          text-4xl
          sm:text-5xl
          font-black
          text-red-500
        ">

          Access Denied

        </h1>

        <p className="
          text-gray-400
          text-base
          sm:text-lg
          mt-5
          max-w-xl
        ">

          You are not authorized to access
          the DeSpire Admin Dashboard.

        </p>

      </div>

    );

  }

  return (

    <div className="
      min-h-screen
      bg-[#020617]
      text-white
      px-4
      sm:px-6
      py-14
      sm:py-20
      relative
      overflow-hidden
    ">

      {/* GLOW */}

      <div className="
        absolute
        top-0
        left-0
        w-[250px]
        sm:w-[350px]
        h-[250px]
        sm:h-[350px]
        bg-cyan-500/10
        blur-[120px]
        rounded-full
      "></div>

      <div className="
        absolute
        bottom-0
        right-0
        w-[250px]
        sm:w-[350px]
        h-[250px]
        sm:h-[350px]
        bg-pink-500/10
        blur-[120px]
        rounded-full
      "></div>

      {/* CONTENT */}

      <div className="
        relative
        max-w-7xl
        mx-auto
      ">

        {/* HEADING */}

        <div className="
          mb-14
          text-center
          md:text-left
          flex
          flex-col
          items-center
          md:items-start
        ">

          <div className="
            inline-flex
            items-center
            gap-3
            px-5
            py-3
            rounded-full
            border
            border-cyan-300/20
            bg-cyan-300/10
            text-cyan-300
            font-semibold
            text-sm
            sm:text-base
          ">

            <ShieldCheck size={18} />

            ADMIN DASHBOARD

          </div>

          <h1 className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-black
            mt-8
            leading-tight
          ">

            Manage

            <span className="text-cyan-300">

              {" "}Messages

            </span>

          </h1>

          <p className="
            text-gray-400
            mt-4
            text-sm
            sm:text-lg
            max-w-2xl
          ">

            View, manage and delete
            all DeSpire contact messages.

          </p>

        </div>

        {/* LOADING */}

        {
          loading ? (

            <div className="
              mt-20
              text-center
              text-xl
              sm:text-2xl
              font-bold
              text-cyan-300
            ">

              Loading Messages...

            </div>

          ) : (

            <div className="
              grid
              gap-6
              sm:gap-8
            ">

              {
                messages.length === 0 ? (

                  <div className="
                    text-center
                    text-gray-400
                    text-xl
                    sm:text-2xl
                    mt-20
                  ">

                    No Messages Found

                  </div>

                ) : (

                  messages.map((msg) => (

                    <div
                      key={msg._id}
                      className="
                        bg-white/3
                        border
                        border-white/50
                        rounded-[24px]
                        sm:rounded-[30px]
                        p-4
                        sm:p-6
                        md:p-8
                        backdrop-blur-xl
                        hover:shadow-[0_0_60px_rgba(34,211,238,0.25)] transition-all duration-500]
                        overflow-hidden
                      "
                    >

                      {/* TOP */}

                      <div className="
                        flex
                        flex-col
                        gap-5
                        md:flex-row
                        md:items-center
                        md:justify-between
                        w-full
                      ">

                        {/* LEFT */}

                        <div className="
                          min-w-0
                          w-full
                        ">

                          <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-black
                            text-cyan-300
                            break-words
                          ">

                            {msg.name}

                          </h2>

                          <p className="
                            text-gray-400
                            mt-3
                            flex
                            items-start
                            sm:items-center
                            gap-2
                            text-sm
                            sm:text-base
                            break-all
                          ">

                            <Mail
                              size={18}
                              className="
                                shrink-0
                                mt-[2px]
                              "
                            />

                            {msg.email}

                          </p>

                        </div>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            deleteMessage(msg._id)
                          }
                          className="
                            w-full
                            md:w-auto
                            flex
                            justify-center
                            items-center
                            gap-2
                            bg-red-500/20
                            border
                            border-red-500/20
                            hover:bg-red-500
                            hover:text-white
                            px-6
                            py-3
                            rounded-2xl
                            transition-all
                            duration-300
                          "
                        >

                          <Trash2 size={20} />

                          Delete

                        </button>

                      </div>

                      {/* SUBJECT */}

                      <div className="mt-8">

                        <h3 className="
                          text-lg
                          sm:text-xl
                          font-bold
                        ">

                          Subject

                        </h3>

                        <p className="
                          text-gray-300
                          mt-3
                          text-sm
                          sm:text-base
                          break-words
                        ">

                          {msg.subject}

                        </p>

                      </div>

                      {/* MESSAGE */}

                      <div className="mt-8">

                        <h3 className="
                          text-lg
                          sm:text-xl
                          font-bold
                        ">

                          Message

                        </h3>

                        <p className="
                          text-gray-400
                          mt-3
                          leading-relaxed
                          text-sm
                          sm:text-base
                          break-words
                        ">

                          {msg.message}

                        </p>

                      </div>

                      {/* FILE */}

                      {
                        msg.file && (

                          <div className="mt-8">

                            <a
                              href={msg.file}
                              target="_blank"
                              rel="noreferrer"
                              className="
                                w-full
                                sm:w-fit
                                inline-flex
                                justify-center
                                items-center
                                gap-3
                                px-6
                                py-4
                                rounded-2xl
                                bg-cyan-300
                                text-black
                                font-bold
                                hover:scale-105
                                transition-all
                                duration-300
                              "
                            >

                              <FileText size={22} />

                              Open Attachment

                            </a>

                          </div>

                        )
                      }

                      {/* DATE */}

                      <div className="
                        mt-8
                        text-xs
                        sm:text-sm
                        text-gray-500
                        break-words
                      ">

                        {
                          new Date(
                            msg.createdAt
                          ).toLocaleString()
                        }

                      </div>

                    </div>

                  ))

                )
              }

            </div>

          )
        }

      </div>

    </div>

  );

};

export default AdminMessages;