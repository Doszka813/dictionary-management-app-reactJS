import React from 'react';
import { Link } from "react-router-dom";

const About = () => {

  return (
    <div className="container">
      <h1>Welcome to the Dictionary Management App</h1>
      <h3>You can a new dictionary or review <Link to="/dictionaries">existing ones</Link>.</h3>
    </div>
  )
}

export default About;
