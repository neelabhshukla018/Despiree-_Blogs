import axios from "axios";

const API = "http://localhost:5000/api/blogs";

export const getBlogs = async () => {
  const response = await axios.get(API);

  return response.data;
};