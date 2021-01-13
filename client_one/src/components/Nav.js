import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link className="nav-item" to="/catalog/blogs">
        Home
      </Link>
    </div>
  );
};

export default Nav;
