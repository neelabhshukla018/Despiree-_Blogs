import React from 'react'

import { useNavigate } from 'react-router-dom'

import {
  Sparkles,
  ArrowRight,
  Users,
  Code2,
  Brain,
  Rocket,
  PenSquare,
  Globe,
} from 'lucide-react'

const AboutUsPage = () => {

  const navigate = useNavigate()

  return (

    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] text-white">

      {/* GRID BACKGROUND */}

      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* SOFT GLOW */}

      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-cyan-400/10 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-blue-500/10 blur-[120px] rounded-full"></div>

      {/* MAIN */}

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 py-16">

        {/* HERO SECTION */}

        <div className="grid lg:grid-cols-2 gap-14 items-center min-h-screen">

          {/* LEFT */}

          <div className="max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* BADGE */}

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
              mb-8
              mx-auto
              lg:mx-0
            ">

              <Sparkles size={18} />

              ABOUT DESPIRE

            </div>

            {/* HEADING */}

           <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-center lg:text-left">

              Just Write 

              <span className="block text-cyan-300">

                Any Title.
              </span>

              

              <span className="block">

                AI Builds
              </span>

              <span className="block text-cyan-300">

                Everything.
              </span>

            </h1>

            {/* DESCRIPTION */}

           <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mt-10 text-center lg:text-left">

              DeSpire is a futuristic AI-powered blogging platform
              designed for creators, developers and storytellers.

              <br /><br />

              Simply type any title like:

              <span className="text-cyan-300 font-semibold">

                {" "}“Top 10 JavaScript Tips”
              </span>

              {" "}or{" "}

              <span className="text-cyan-300 font-semibold">

                “Virat Kohli Captaincy Journey”
              </span>

              — and DeSpire automatically generates complete
              blog content, descriptions, categories,
              layouts and stunning visuals instantly.

            </p>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-5 mt-12">

              <button
                onClick={() => navigate('/blog')}
                className="w-full sm:w-auto bg-cyan-300 text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
              >

                Explore Blogs

              </button>

              <button
                onClick={() => navigate('/create-blog')}
                className="w-full sm:w-auto border border-cyan-300 text-cyan-300 px-10 py-5 rounded-2xl font-black text-lg hover:bg-cyan-300 hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
              >

                Start Creating

                <ArrowRight />

              </button>

            </div>

          </div>

          {/* RIGHT VIDEO GRID */}

          <div className="relative flex justify-center items-center w-full">

            {/* GLOW */}

           <div className="absolute -top-10 -left-20 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-400/10 blur-[120px] rounded-full"></div>

            {/* MAIN CONTAINER */}

            <div
              className="
                relative
                z-10
                w-full
                max-w-[750px]
                rounded-[40px]
                border
                border-white/40
                bg-red/50
                p-4
                sm:p-5
              shadow-[0_0_100px_rgba(34,211,238,0.20),0_0_120px_rgba(59,130,246,0.15)]
                overflow-hidden
                lg:-mt-34
              "
            >

              {/* VIDEO GRID */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* CARD 1 */}

                <div className="relative overflow-hidden rounded-[24px] h-[220px] sm:h-[250px] group">

                  <video
                    src="/About/Video-1.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-black/40"></div>

                  <div className="absolute bottom-5 left-5 z-10">

                    <h2 className="text-2xl font-black">

                      Chase Every Horizon
                    </h2>

                    <p className="text-gray-300 text-sm mt-2">

                      Stories from every journey.
                    </p>

                  </div>

                </div>

                {/* CARD 2 */}

                <div className="relative overflow-hidden rounded-[24px] h-[220px] sm:h-[250px] group">

                  <video
                    src="/About/Video-2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-black/40"></div>

                  <div className="absolute bottom-5 left-5 z-10">

                    <h2 className="text-2xl font-black text-cyan-300">

                    The Cricket Energy 
                    </h2>

                    <p className="text-gray-100 text-sm mt-2">

                      Every match tells a story.
                    </p>

                  </div>

                </div>

                {/* CARD 3 */}

                <div className="relative overflow-hidden rounded-[24px] h-[220px] sm:h-[250px] group">

                  <video
                    src="/About/Video-3.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-black/40"></div>

                  <div className="absolute bottom-5 left-5 z-10">

                    <h2 className="text-2xl font-black">

                      Code The Future
                    </h2>

                    <p className="text-gray-300 text-sm mt-2">

                     Ideas powered by technology.
                    </p>

                  </div>

                </div>

                {/* CARD 4 */}

                <div className="relative overflow-hidden rounded-[24px] h-[220px] sm:h-[250px] group">

                  <video
                    src="/About/Video-4.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                  <div className="absolute inset-0 bg-black/40"></div>

                  <div className="absolute bottom-5 left-5 z-10">

                    <h2 className="text-2xl font-black text-cyan-300">

                      Find Inner Peace
                    </h2>

                    <p className="text-gray-300 text-sm mt-2">

                      Calmness beyond the noise.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* HOW IT WORKS */}

        <div className="mt-28 lg:mt-36">

          <div className="text-center">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black">

              How

              <span className="text-cyan-300">

                {" "}DeSpire Works?
              </span>

            </h2>

            <p className="text-gray-400 text-lg sm:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">

              Create AI-powered blogs within seconds using futuristic automation.

            </p>

          </div>

          {/* STEP GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

            {[
              {
                number: '01',
                title: 'Write Any Title',
                desc: 'Enter any topic or blog idea you want to create.',
              },

              {
                number: '02',
                title: 'AI Generates Everything',
                desc: 'DeSpire automatically creates content, categories and layouts.',
              },

              {
                number: '03',
                title: 'Publish Instantly',
                desc: 'Upload images and publish blogs within seconds.',
              },

              {
                number: '04',
                title: 'Edit Anytime',
                desc: 'Update your blog content, descriptions and categories whenever you want.',
              },

              {
                number: '05',
                title: 'Change Images',
                desc: 'Upload new cover images later and customize your blogs easily.',
              },

              {
                number: '06',
                title: 'Delete & Manage',
                desc: 'Delete blogs anytime and instantly see all changes updated.',
              },
            ].map((step, index) => (

              <div
                key={index}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border border-white/25
                  bg-black/30
                  p-8
                  hover:-translate-y-8
                  transition-all
                  duration-500
                  shadow-[0_0_40px_rgba(0,0,0,0.45)]
                  hover:shadow-[0_0_90px_rgba(59,130,246,0.30)]
                "
              >

                <h1 className="text-6xl font-black text-cyan-500">

                  {step.number}

                </h1>

                <h2 className="text-3xl font-black mt-6">

                  {step.title}

                </h2>

                <p className="text-gray-400 mt-6 text-lg leading-relaxed">

                  {step.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* FEATURES */}

        <div className="mt-28 lg:mt-36">

          <div className="text-center">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black">

              Powerful

              <span className="text-cyan-300">

                {" "}Features
              </span>

            </h2>

            <p className="text-gray-400 text-lg sm:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">

              DeSpire is more than just a blogging platform.

            </p>

          </div>

          {/* FEATURE GRID */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">

            {[
              {
                icon: <Brain size={40} />,
                title: 'AI Blog Generation',
                desc: 'Generate complete blogs automatically using AI.',
              },

              {
                icon: <Rocket size={40} />,
                title: 'Modern Futuristic UI',
                desc: 'Beautiful modern interface with premium animations.',
              },

              {
                icon: <PenSquare size={40} />,
                title: 'Like & Dislike System',
                desc: 'Users can interact with blogs using likes and dislikes.',
              },

              {
                icon: <Users size={40} />,
                title: 'Comments System',
                desc: 'Readers can comment and engage with creators.',
              },

              {
                icon: <Globe size={40} />,
                title: 'Notifications',
                desc: 'Get notified about blog activities and interactions.',
              },

              {
                icon: <Code2 size={40} />,
                title: 'Custom Image Upload',
                desc: 'Upload your own images and personalize blogs easily.',
              },
            ].map((feature, index) => (

              <div
                key={index}
                className="
                  bg-black/20
                  border border-white/10
                  rounded-[32px]
                  overflow-hidden
                  p-8
                  shadow-[0_0_40px_rgba(0,0,0,0.45)]
                  hover:shadow-[0_0_60px_rgba(34,211,238,0.18)]
                  transition-all
                  duration-500
                  hover:-translate-y-3
                "
              >

                <div className="text-cyan-300">

                  {feature.icon}

                </div>

                <h2 className="text-2xl font-black mt-6">

                  {feature.title}

                </h2>

                <p className="text-gray-400 mt-5 text-lg leading-relaxed">

                  {feature.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

      {/* CREATOR SECTION */}

<div className="mt-28 lg:mt-36">

  <div className="
    relative
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-10
    lg:gap-14
    items-center
    bg-black/20
    border
    border-white/10
    rounded-[30px]
    lg:rounded-[40px]
    overflow-hidden
    p-5
    sm:p-8
    lg:p-12
    shadow-[0_0_100px_rgba(34,211,238,0.20),0_0_120px_rgba(59,130,246,0.15)]
  ">

    {/* IMAGE */}

    <div className="w-full flex justify-center">

      <img
        src="/About/about.jpeg"
        alt="Creator"
        className="
          w-full
          max-w-[500px]
          h-[320px]
          sm:h-[500px]
          lg:h-[650px]
          object-cover
          rounded-[24px]
          lg:rounded-[32px]
        "
      />

    </div>

    {/* CONTENT */}

    <div className="text-center lg:text-left">

      {/* BADGE */}

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
        mx-auto
        lg:mx-0
      ">

        <Users size={18} />

        Meet The Creator

      </div>

      {/* HEADING */}

      <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mt-8">

        Built With Passion

        <span className="block text-cyan-300">

          By Neelabh Shukla

        </span>

      </h2>

      {/* DESCRIPTION */}

      <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mt-10">

        DeSpire was created with a vision to redefine
        blogging using Artificial Intelligence and
        futuristic web experiences.

        <br /><br />

        From stunning UI designs to intelligent AI-powered
        content generation, every part of DeSpire focuses
        on helping creators build beautiful blogs effortlessly.

      </p>

      {/* ROLE */}

      <div className="
        flex
        flex-col
        sm:flex-row
        items-center
        justify-center
        lg:justify-start
        gap-6
        mt-10
      ">

        <Code2
          className="text-cyan-300"
          size={35}
        />

        <div className="flex items-center gap-5">

          {/* IMAGE SPACE */}

          <div className="
            w-28
            h-20
            sm:w-36
            sm:h-24
            rounded-[22px]
            overflow-hidden
            border
            border-cyan-300/30
            bg-white/5
            backdrop-blur-xl
            shadow-[0_0_35px_rgba(34,211,238,0.25)]
            flex-shrink-0
            p-[2px]
            hover:scale-105
            transition-all
            duration-300
          ">

            <img
              src="/About/Signature.jpg"
              alt="Neelabh Shukla"
              className="w-full h-full object-cover rounded-[20px]"
            />

          </div>

          {/* TEXT */}

          <span className="
            text-xl
            sm:text-2xl
            lg:text-3xl
            font-black
            bg-gradient-to-r
            from-cyan-300
            via-pink-300
            to-blue-300
            bg-clip-text
            text-transparent
            tracking-wide
            drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]
          ">

            Full Stack Developer & AI Enthusiast

          </span>

        </div>

      </div>

      {/* SOCIAL LINKS */}

      <div className="
        flex
        flex-wrap
        justify-center
        lg:justify-start
        gap-5
        mt-12
      ">

        <a
          href="https://github.com/neelabhshukla018"
          target="_blank"
          rel="noreferrer"
          className="px-8 py-4 rounded-2xl bg-black/20 border border-white/10 hover:border-cyan-300 hover:bg-cyan-300 hover:text-black transition-all duration-300 font-bold"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/neelabh-shukla-45b88a2a5"
          target="_blank"
          rel="noreferrer"
          className="px-8 py-4 rounded-2xl bg-black/20 border border-white/10 hover:border-cyan-300 hover:bg-cyan-300 hover:text-black transition-all duration-300 font-bold"
        >
          LinkedIn
        </a>

        <a
          href="https://www.instagram.com/arjun_dream_1845"
          target="_blank"
          rel="noreferrer"
          className="px-8 py-4 rounded-2xl bg-black/20 border border-white/10 hover:border-cyan-300 hover:bg-cyan-300 hover:text-black transition-all duration-300 font-bold"
        >
          Instagram
        </a>

      </div>

    </div>

  </div>

</div>
        {/* CTA */}

        <div className="mt-28 lg:mt-36">

          <div className="
            relative
            overflow-hidden
            rounded-[40px]
            border border-white/45
            bg-black/30
            p-8 sm:p-10 lg:p-14
            text-center
                      ">

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">

              Ready To Build

              <span className="block text-cyan-300">

                AI Blogs?
              </span>

            </h2>

            <p className="text-gray-400 text-lg sm:text-xl mt-8 max-w-3xl mx-auto leading-relaxed">

              Start your journey with DeSpire and create futuristic
              AI-powered blogs within seconds.

            </p>

            <button
              onClick={() => navigate('/create-blog')}
              className="mt-12 bg-cyan-300 text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
            >

              Start Creating

            </button>

          </div>

        </div>

      </div>

    </div>

  )
}

export default AboutUsPage