import React from "react";
import "../styles/HomePage.css";

//Function which return the homepage
const HomePage = () => {
  return (
    <div className="homepage ">
      <div className="hero-section d-flex align-items-center justify-content-center text-center  bg-light text-dark shadow-lg rounded">
        <div className="hero-text">
          <h1 className="display-4 fw-bold">
            Welcome to the Library Management System
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
