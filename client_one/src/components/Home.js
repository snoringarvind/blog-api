import React from "react";
import { useContext } from "react";
import Card from "./Card";
import { BlogContext } from "./BlogContext";

const Home = () => {
  const { blogValue } = useContext(BlogContext);
  const [blogs] = blogValue;
  return (
    <div className="home">
      {blogs.map((value) => (
        <Card blog={value} key={value._id} />
      ))}
    </div>
  );
};

export default Home;
