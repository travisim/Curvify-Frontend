import React from "react";
import { Link } from "react-router-dom";

let About = () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">About</h1>
        <p className="lead">
          This project was driven by a realization that for some modules
          (BSP1702) require students to buy a physical textbook for use in the
          finals and the use of a printed pdf copy of the textbook would be
          prohibited. Additionally, since university students are cash strapped,
          bartering for textbooks/notes would be a way to increase liquidity in
          this market place.
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
