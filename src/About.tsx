import React from "react";
import { Link } from "react-router-dom";

let About = () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">About</h1>
        <p className="lead">
        this page 
        </p>
        <hr className="my-4" />
        <Link to="/forumThreads" className="btn btn-lg btn-dark" role="button">
          View Posts
        </Link>
      </div>
    </div>
  </div>
);

export default About;
