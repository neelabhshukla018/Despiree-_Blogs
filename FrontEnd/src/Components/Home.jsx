import React from "react";

import Navbar from "./Navbar";
import Herosection from "./Herosection";
import Footer from "./Footer";
import Blog from "./Blog";

const Home = () => {
  return (
    <main className="bg-[#020617] overflow-hidden">

      <Navbar />

      <Herosection />

      <Blog />

      <Footer />

    </main>
  );
};

export default Home;