import React, { Component } from 'react';
import { Link } from "react-router-dom";

class About extends Component {

  render() {
    return (
      <div className="About">
        <h1>Welcome to the Dictionary Management App</h1>
        <h3>You can a new dictionary or review <Link to="/dictionaries">existing ones</Link>.</h3>
      </div>
    );
  }
}

export default About;
