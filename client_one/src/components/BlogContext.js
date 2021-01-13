import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

//actually I didn't need to use the context api
export const BlogContext = createContext();

export const BlogProvider = (props) => {
  const [blogs, setBlogs] = useState([]);

  const blogs_axios = async () => {
    try {
      const response = await axios.get("http://localhost:3000");
      console.log(response.data);
      setBlogs(response.data);
    } catch (err) {
      console.log("err=", err);
    }
  };

  useEffect(() => {
    blogs_axios();
  }, []);
  return (
    <BlogContext.Provider value={{ blogValue: [blogs, setBlogs] }}>
      {props.children}
    </BlogContext.Provider>
  );
};
