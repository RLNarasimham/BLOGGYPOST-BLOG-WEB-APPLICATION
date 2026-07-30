import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser?.role === "author") {
      navigate("/author/dashboard", { replace: true });
    } else if (currentUser?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.email === "" || formData.password === "") {
      alert("Please fill all Fields before submitting the Form!");
      return;
    }

    api
      .get("/authors")
      .then((response) => {
        const author = response.data.find((author) => {
          return (
            author.email === formData.email &&
            author.password === formData.password &&
            author.role === "author"
          );
        });

        if (author) {
          setCurrentUser(author);
          navigate("/author/dashboard");
        } else {
          alert("Invalid Email or Password!");
        }
      })
      .catch((error) => {
        alert(`Error: ${error}.\nUnable to Login!!!`);
      });
  };

  return (
    <div className="container-fluid h-100 p-0 bg-secondary-subtle">
      <div
        className="row g-0 align-items-stretch h-100"
        style={{ minHeight: "calc(100vh - 56px - 280px)" }}
      >
        <div className="col-md-6 col-12 p-md-3 p-2 d-flex justify-content-center flex-column border border-opacity-75 border-2 border-primary">
          <h1 className="text-center">
            <span className="badge text-bg-success fw-bold">AUTHOR PORTAL</span>
          </h1>
          <h3 className="text-center">
            Welcome Back,{" "}
            <span className="fst-italic text-primary">Author</span>!
          </h3>
          <p className="fs-5 fw-semibold text-center">
            <span className="word_span">Sign in</span> to your{" "}
            <span className="word_span">Bloggy</span>Post account to create new
            blogs, manage your published articles, and connect with readers
            through meaningful discussions.
          </p>
          <div className="p-3 text-center">
            <h5 className="fw-bold">
              ⭐ <i className="bi bi-pencil-square text-primary me-1"></i>
              <span className="text-primary">Publish</span> Blogs ⭐
            </h5>
            <p className="fs-5 fw-semibold">
              {" "}
              Create and publish engaging blog posts with ease.
            </p>
          </div>
          <div className="p-3 text-center">
            <h5 className="fw-bold">
              ⭐ <i className="bi bi-journal-text text-primary me-1"></i>
              <span className="text-primary">Manage</span> Your Articles⭐
            </h5>
            <p className="fs-5 fw-semibold">
              Update, edit, or remove your blogs anytime.
            </p>
          </div>
          <div className="p-3 text-center">
            <h5 className="fw-bold">
              ⭐ <i className="bi bi-chat-left-text text-primary me-1"></i>
              <span className="text-primary">Read</span> Reader Comments⭐
            </h5>
            <p className="fs-5 fw-semibold">
              Stay connected by reading comments on your published blogs.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-12 p-md-3 p-2 d-flex justify-content-center align-items-center flex-column p-3 border border-primary border-opacity-75 border-2">
          <h3 className="text-center">
            <span className="word_span">Author</span> Login
          </h3>
          <p className="fs-5 fw-semibold text-center">
            <span className="word_span">Sign in</span> to continue your blogging
            journey.
          </p>
          <form className="text-center w-75" onSubmit={handleSubmit}>
            <div className="form-floating mb-3 text-center">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email Address..."
                id="emailAdInput"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="emailAdInput">Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password..."
                id="passwordInput"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="passwordInput">Password</label>
            </div>

            <button className="btn btn-primary">Login as Author</button>
            <hr className="border-4 border-primary opacity-100" />
            <p className="fw-semibold mb-2">
              Don't have an <span className="text-primary">Account</span>?{" "}
              <Link
                to="/register"
                className="badge text-bg-success p-2 text-decoration-none"
              >
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
