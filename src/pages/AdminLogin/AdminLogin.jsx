import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router";

const AdminLogin = () => {
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCurrentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    getAdmins();
  });

  const getAdmins = () => {
    api
      .get("/admins")
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const admin = admins.find(
      (admin) => admin.email === email && admin.password === password,
    );

    if (admin) {
      setCurrentUser(admin);
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Credentials...!!");
    }
  };
  return (
    <div className="container-fluid h-100 p-0 bg-secondary-subtle">
      <div className="row g-0">
        <div className="col-md-6 col-12 p-2 d-flex justify-content-center align-items-center flex-column border border-2 border-opacity-75 border-primary">
          <h2 className="p-2">
            <span className="badge text-bg-success">ADMIN PORTAL</span>
          </h2>
          <h3 className="fw-bold fs-4 text-center">
            Manage <span className="text-primary">Bloggy</span>Post with
            Confidence
          </h3>
          <p className="fw-semibold fs-5 text-center">
            Access the{" "}
            <span className="word_span">Administrator dashboard</span> to manage
            blogs, oversee authors, and maintain an organized blogging platform
            with ease.
          </p>
          <div className="p-md-2 p-1">
            <h3 className="fw-bold fs-4 text-center">
              ⭐ <i className="bi bi-journal-richtext text-primary"></i>{" "}
              <span className="word_span">Manage</span> All Blogs ⭐
            </h3>
            <p className="fs-5 fw-semibold text-center">
              Review, edit, and manage every blog published across the platform.
            </p>
          </div>
          <div className="p-md-2 p-1">
            <h3 className="fw-bold fs-4 text-center">
              ⭐ <i className="bi bi-people-fill text-primary"></i>{" "}
              <span className="word_span">Manage</span> Authors ⭐
            </h3>
            <p className="fs-5 fw-semibold text-center">
              View and manage registered authors to keep the platform well
              organized.
            </p>
          </div>
          <div className="p-md-2 p-1">
            <h3 className="fw-bold fs-4 text-center">
              ⭐ <i className="bi bi-shield-check text-primary"></i>{" "}
              <span className="word_span">Platform</span> Administration ⭐
            </h3>
            <p className="fs-5 fw-semibold text-center">
              Maintain a smooth blogging experience through efficient role-based
              management.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-12 p-2 d-flex justify-content-center align-items-center flex-column border border-2 border-opacity-75 border-primary">
          <h2 className="p-2 fw-bold">
            <span className="word_span">Admin</span> Login
          </h2>
          <p className="fw-semibold fs-5 text-center">
            <span className="word_span">Sign in</span> to access the BloggyPost
            administration dashboard.
          </p>
          <form className="w-75 text-center" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                placeholder="Enter your admin email"
                id="emailAdInput"
                className="form-control"
                name="email"
                onChange={handleEmailChange}
              />
              <label htmlFor="emailAdInput">Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                placeholder="Enter your password"
                id="passwordInput"
                className="form-control"
                name="password"
                onChange={handlePasswordChange}
              />
              <label htmlFor="passwordInput">Password</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <hr className="border-4 border-primary opacity-100 w-75" />
          <div>
            <h6 className="p-lg-2 p-1 text-center">
              <span className="text-danger">
                Authorized Administrators Only.
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
