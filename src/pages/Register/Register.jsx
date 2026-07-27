import React from "react";
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="container-fluid h-100 p-0 bg-secondary-subtle">
      <div className="row g-0">
        <div className="col-md-6 col-12 p-md-3 p-2 d-flex justify-content-center flex-column border border-opacity-75 border-2 border-primary">
          <h2 className="text-center">
            <span className="badge text-bg-success">AUTHOR COMMUNITY</span>
          </h2>
          <h3 className="fw-bold text-center fs-4">
            Join <span className="text-primary">Bloggy</span>Post as an Author
          </h3>
          <p className="fw-semibold fst-italic text-center fs-5">
            Create your free author account and start sharing your ideas,
            experiences, and knowledge with readers through engaging blog posts.
          </p>
          <div className="p-md-2 p-1">
            <h3 className="fw-bold text-center fs-4">
              ⭐ <i className="bi bi-pencil-square text-primary"></i>{" "}
              <span className="word_span">Write</span> &{" "}
              <span className="word_span">Publish</span> Blogs ⭐
            </h3>
            <p className="fw-semibold fs-5 text-center">
              Create and publish engaging blog posts across multiple categories.
            </p>
          </div>
          <div className="p-md-2 p-1">
            <h3 className="fw-bold text-center fs-4">
              ⭐ <i className="bi bi-journal-text text-primary"></i>{" "}
              <span className="fst-italic text-primary">Manage</span> Your
              Content ⭐
            </h3>
            <p className="fw-semibold fs-5 text-center">
              Update, edit, or remove your blogs whenever you need.
            </p>
          </div>
          <div className="p-md-2 p-1">
            <h3 className="fw-bold text-center fs-4">
              ⭐ <i className="bi bi-chat-left-text text-primary"></i>{" "}
              <span className="word_span">Connect</span> with Readers ⭐
            </h3>
            <p className="fw-semibold fs-5 text-center">
              Read comments from readers and engage through meaningful
              discussions.
            </p>
          </div>
        </div>

        <div className="col-md-6 col-12 p-2 d-flex justify-content-center align-items-center flex-column border border-2 border-primary border-opacity-75">
          <h3 className="fw-bold fs-3">
            <span className="text-primary">Author</span> Registration
          </h3>
          <p className="fw-semibold fs-5 text-center">
            <span className="word_span">Create</span> your account to begin
            publishing blogs on BloggyPost.
          </p>
          <form className="w-75">
            <div className="form-floating mb-3">
              <input
                type="text"
                placeholder="Enter your full name"
                className="form-control"
                id="fullNameInput"
              />
              <label htmlFor="fullNameInput">Full Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                placeholder="Enter your email"
                id="emailAdInput"
                className="form-control"
              />
              <label htmlFor="emailAdInput">Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                placeholder="Create a password"
                id="passwordInput"
                className="form-control"
              />
              <label htmlFor="passwordInput">Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                placeholder="Confirm your password"
                id="confPassInput"
                className="form-control"
              />
              <label htmlFor="confPassInput">Confirm Password</label>
            </div>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </form>
          <hr className="border-4 border-primary opacity-100 w-75" />
          <div>
            <h6 className="p-lg-2 p-1">
              Already have an{" "}
              <span className="text-primary fw-bold">Account</span>?{" "}
              <Link
                to="/login"
                className="badge text-bg-success p-2 text-decoration-none"
              >
                Login Here
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
