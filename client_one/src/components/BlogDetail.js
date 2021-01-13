import React, { useContext, useState, useEffect } from "react";
import { BlogContext } from "./BlogContext";
import axios from "axios";

//actually I didn't need to use the context api

const BlogDetail = (props) => {
  const [blogDetail, setBlogDetail] = useState([]);

  const blog_axios = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/catalog/blog/${props.match.params.id}`
      );
      setBlogDetail(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    blog_axios();
  }, []);

  console.log(blogDetail);
  return (
    <div className="blog-detail">
      <div className="blog-detail-title">{blogDetail.title}</div>
      <div className="blog-detail-content">{blogDetail.content}</div>
    </div>
  );
};

export default BlogDetail;
