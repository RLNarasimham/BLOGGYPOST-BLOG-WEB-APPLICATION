import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import website_logo from "../../assets/BloggyPost_logo.svg";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-light border-bottom border-primary border-5">
      <div className="container justify-content-between">
        <Link
          className="navbar-brand fs-4 fw-semibold"
          to="/"
          onClick={closeMenu}
        >
          <img src={website_logo} alt="Website Logo" className="me-2" />
          <span className="text-primary">Bloggy</span>Post
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""} flex-grow-0`}
          id="navbarMenu"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/blogs" className="nav-link" onClick={closeMenu}>
                Blogs
              </Link>
            </li>

            {!currentUser && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={closeMenu}>
                    Author Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/register" className="nav-link" onClick={closeMenu}>
                    Register
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/admin/login"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Admin Login
                  </Link>
                </li>
              </>
            )}

            {currentUser?.role === "author" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/author/dashboard"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/author/blogs"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    My Blogs
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/author/add"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Add Blog
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link mx-auto d-block text-center btn border-0"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {currentUser?.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link
                    to="/admin/dashboard"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/admin/blogs"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Manage Blogs
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    to="/admin/authors"
                    className="nav-link"
                    onClick={closeMenu}
                  >
                    Manage Authors
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link mx-auto d-block text-center btn border-0"
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
