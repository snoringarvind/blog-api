import React from "react";
import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <Link className="card" to={{ pathname: `/catalog/blog/${blog._id}` }}>
      <div className="card-title">{blog.title}</div>
      <div className="card-content">{blog.content}</div>
    </Link>
  );
};

export default Card;
