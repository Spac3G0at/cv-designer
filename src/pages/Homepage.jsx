import React from "react";
import { Link } from "react-router";

const Homepage = () => {
  return (
    <div>
      <p>Home</p>
      <Link to="/cv-editor">CV</Link>
    </div>
  );
};

export default Homepage;
