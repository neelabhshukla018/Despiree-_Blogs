import React from 'react'

import {
  Routes,
  Route
} from 'react-router-dom'

import Home from './Components/Home'

import Blog from './Components/Blog'

import Login from './Components/Login'

import Signup from './Components/signup'

import Dashboard from './Components/Dashboard'

import CreateBlog from './Components/CreateBlog'

import EditBlog from './Components/EditBlog'

import BlogDetails from './Components/BlogDetails'

import CustomCursor from './Components/CustomCursor'

import AboutUsPage from "./Components/AboutUsPage";

import ScrollToTop from "./Components/ScrollToTop";


import ContactUs from "./Components/ContactUs";

import AdminMessages from "./Components/AdminMessages";



const App = () => {

  return (

    <>

      {/* CUSTOM CURSOR */}
      <CustomCursor />

      {/* SCROLL TO TOP */}
      <ScrollToTop />

      {/* ROUTES */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* BLOG PAGE */}
        <Route
          path="/blog"
          element={<Blog />}
        />

        {/* BLOG DETAILS */}
        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />

        {/* LOGIN */}
        <Route
          path="/login/*"
          element={<Login />}
        />

        {/* SIGNUP */}
        <Route
          path="/signup/*"
          element={<Signup />}
        />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* CREATE BLOG */}
        <Route
          path="/create-blog"
          element={<CreateBlog />}
        />

        {/* EDIT BLOG */}
        <Route
          path="/edit-blog/:id"
          element={<EditBlog />}
        />

        {/* ABOUT US */}
        <Route
          path="/about"
          element={<AboutUsPage />}
        />


        {/* CONTACT PAGE */}
        <Route
          path="/contact"
          element={<ContactUs />}
        />

        {/* ADMIN MESSAGES */}
        <Route
          path="/admin/messages"
          element={<AdminMessages />}
        />

      </Routes>

    </>
  )
}

export default App