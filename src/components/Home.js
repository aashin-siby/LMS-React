import React from "react";
import { Link } from "react-router-dom";
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
         
          <div className="mt-4">
            <Link to="/admin" className="btn btn-primary btn-lg me-3">
              Go to Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
