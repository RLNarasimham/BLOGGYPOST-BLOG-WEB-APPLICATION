import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import "./AuthorDashboard.css";

const AuthorDashboard = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  return (
    <div className="container-fluid">
      <div className="text-center">
        <h3 className="p-lg-3 p-2">
          Welcome Back,{" "}
          <span className="word_span fw-bold">{currentUser.name}</span> !
        </h3>
        <p className="fw-semibold fs-5 p-lg-3 p-2">
          <span className="word_span fw-bold">Manage</span> your blogs,{" "}
          <span className="word_span fw-bold">update</span> your published
          articles, and <span className="word_span fw-bold">engage</span> with
          readers through their comments.
        </p>
      </div>

      <div className="text-center">
        <h3 className="p-lg-3 p-2 text-primary fw-bold">Quick Actions</h3>
        <div className="row g-0">
          <div className="col-md-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card p-2 w-75 h-100 auth_dash_card">
              <h4 className="card-title text-white fw-bold h-100">
                <i className="bi bi-plus-circle-fill text-white fs-4"></i>{" "}
                Create New Blog{" "}
                <i className="bi bi-plus-circle-fill text-white fs-4"></i>
              </h4>
              <p className="card-text fw-semibold fs-6">
                Write and publish a new blog for your readers.
              </p>
              <Link to="/author/add" className="text-decoration-none p-1">
                <button className="btn btn-info">Create Blog</button>
              </Link>
            </div>
          </div>
          <div className="col-md-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card p-2 w-75 h-100 auth_dash_card">
              <h4 className="card-title text-white fw-bold h-100">
                <i className="bi bi-journal-richtext text-white fs-4"></i> My
                Blogs <i className="bi bi-journal-richtext text-white fs-4"></i>
              </h4>
              <p className="card-text fw-semibold fs-6">
                View and manage all the blogs you have published.
              </p>
              <Link to="/author/blogs" className="text-decoration-none p-1">
                <button className="btn btn-info">View Blogs</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDashboard;
