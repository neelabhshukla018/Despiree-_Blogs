import React, { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

import {
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

const ContactUs = () => {

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    subject: "",

    message: "",

  });

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);


  // HANDLE CHANGE

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };


  // HANDLE SUBMIT

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);

      data.append("email", formData.email);

      data.append("subject", formData.subject);

      data.append("message", formData.message);

      if (selectedFile) {

        data.append("file", selectedFile);

      }

      const res = await axios.post(

        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,

        data,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

      );

      // SUCCESS TOAST

      toast.success(
        "Message Sent Successfully 🚀"
      );

      // RESET FORM

      setFormData({

        name: "",

        email: "",

        subject: "",

        message: "",

      });

      setSelectedFile(null);

    } catch (error) {

      console.log(error);

      // ERROR TOAST

      toast.error(
        "Failed To Send Message"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white px-6 py-24">

      {/* GLOW EFFECTS */}

      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-pink-500/10 blur-[120px] rounded-full"></div>

      {/* MAIN CONTAINER */}

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}

        <div className="text-center lg:text-left">

          {/* BADGE */}

          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 font-semibold mx-auto lg:mx-0">

            <Sparkles size={18} />

            CONTACT DESPIRE

          </div>

          {/* HEADING */}

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mt-8">

            Let's Build

            <span className="block text-cyan-300">

              Something Amazing.

            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="text-gray-400 text-lg sm:text-xl leading-relaxed mt-8 max-w-2xl mx-auto lg:mx-0">

            Have an idea, collaboration, or project in mind?
            Feel free to connect with me and let's create futuristic
            digital experiences together.

          </p>

          {/* CONTACT INFO */}

          <div className="mt-12 flex flex-col gap-6">

            {/* EMAIL */}

            <a
              href="mailto:neelabhshukla79@gmail.com"
              className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:border-cyan-300 hover:bg-cyan-300/5 transition-all duration-300 hover:scale-[1.02]"
            >

              <div className="w-14 h-14 rounded-2xl bg-cyan-300/10 flex items-center justify-center text-cyan-300">

                <Mail size={28} />

              </div>

              <div className="text-left">

                <h3 className="text-xl font-bold">

                  Email

                </h3>

                <p className="text-gray-400 hover:text-cyan-300 transition-all duration-300">

                  neelabhshukla79@gmail.com

                </p>

              </div>

            </a>

            {/* PHONE */}

            <a
              href="tel:+917307551612"
              className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:border-pink-300 hover:bg-pink-300/5 transition-all duration-300 hover:scale-[1.02]"
            >

              <div className="w-14 h-14 rounded-2xl bg-pink-300/10 flex items-center justify-center text-pink-300">

                <Phone size={28} />

              </div>

              <div className="text-left">

                <h3 className="text-xl font-bold">

                  Phone

                </h3>

                <p className="text-gray-400 hover:text-pink-300 transition-all duration-300">

                  +91 7307 55 1612

                </p>

              </div>

            </a>

            {/* LOCATION */}

            <a
              href="https://maps.google.com/?q=Lucknow,Uttar Pradesh,India"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl hover:border-blue-300 hover:bg-blue-300/5 transition-all duration-300 hover:scale-[1.02]"
            >

              <div className="w-14 h-14 rounded-2xl bg-blue-300/10 flex items-center justify-center text-blue-300">

                <MapPin size={28} />

              </div>

              <div className="text-left">

                <h3 className="text-xl font-bold">

                  Location

                </h3>

                <p className="text-gray-400 hover:text-blue-300 transition-all duration-300">

                  Lucknow, Uttar Pradesh, India

                </p>

              </div>

            </a>

          </div>

          {/* SOCIAL LINKS */}

          <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-12">

            <a href="https://github.com/neelabhshukla018" target="_blank" rel="noreferrer" className="group w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-300 hover:text-black transition-all duration-300 hover:scale-110">

              <FaGithub size={22} />

            </a>

            <a href="https://www.linkedin.com/in/neelabh-shukla-45b88a2a5" target="_blank" rel="noreferrer" className="group w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110">

              <FaLinkedinIn size={22} />

            </a>

            <a href="https://www.instagram.com/arjun_dream_1845" target="_blank" rel="noreferrer" className="group w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-500 transition-all duration-300 hover:scale-110">

              <FaInstagram size={22} />

            </a>

            <a href="https://x.com/Neelabh01845" target="_blank" rel="noreferrer" className="group w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500 transition-all duration-300 hover:scale-110">

              <FaTwitter size={22} />

            </a>

          </div>

        </div>

        {/* RIGHT FORM */}

        <div className="relative">

          <div className="relative bg-white/5 border border-white/40 rounded-[35px] p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_100px_rgba(34,211,238,0.15)]">

            <h2 className="text-3xl sm:text-4xl font-black mb-8">

              Send A Message

            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyan-300 transition-all duration-300"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyan-300 transition-all duration-300"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyan-300 transition-all duration-300"
              />

              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-cyan-300 transition-all duration-300 resize-none"
              ></textarea>

              {/* FILE UPLOAD */}

              <div className="relative w-full border border-dashed border-cyan-300/30 rounded-2xl bg-black/20 p-6 hover:border-cyan-300 transition-all duration-300">

                <input
                  type="file"
                  accept=".pdf,image/*,video/*"
                  onChange={(e) =>
                    setSelectedFile(
                      e.target.files[0]
                    )
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="flex flex-col items-center justify-center text-center">

                  <div className="w-14 h-14 rounded-2xl bg-cyan-300/10 flex items-center justify-center text-cyan-300 text-2xl">

                    📁

                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white">

                    Upload Files

                  </h3>

                  <p className="text-gray-400 text-sm mt-2">

                    {
                      selectedFile
                        ? selectedFile.name
                        : "PDF, Images, Videos or Documents"
                    }

                  </p>

                </div>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-300 text-black py-5 rounded-2xl font-black text-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(34,211,238,0.30)]"
              >

                {
                  loading
                    ? "Sending..."
                    : "Send Message"
                }

                <Send size={22} />

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ContactUs;