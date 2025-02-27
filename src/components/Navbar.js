import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContest";

// Navbar Component - Displays navigation links based on authentication status
const Navbar = () => {
  // Extracting authentication state and logout function from context
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">
          Library System
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto gap-4">
            <li className="nav-item">
              <Link className="nav-link text-light fw-semibold" to="/">
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light fw-semibold" to="/manageBooks">
                    Manage Books
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-light fw-semibold"
                    to="/userRentals"
                  >
                    User Rentals
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger fw-bold px-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-light fw-semibold" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
