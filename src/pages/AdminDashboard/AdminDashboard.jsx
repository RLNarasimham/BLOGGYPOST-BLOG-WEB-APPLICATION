import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [totalAuthors, setTotalAuthors] = useState([]);
  const [totalComments, setTotalComments] = useState([]);
  const [totalCategories, setTotalCategories] = useState([]);

  useEffect(() => {
    getAllBlogs();
  }, [totalBlogs]);

  useEffect(() => {
    getAllAuthors();
  }, [totalAuthors]);

  useEffect(() => {
    getAllComments();
  }, [totalComments]);

  useEffect(() => {
    getAllCategories();
  }, [totalCategories]);

  const getAllBlogs = () => {
    api
      .get("/blogs")
      .then((response) => {
        setTotalBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong!! Could not fetch Blogs data...!!");
      });
  };

  const getAllAuthors = () => {
    api
      .get("/authors")
      .then((response) => {
        setTotalAuthors(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong!! Could not fetch 'Authors' data...!");
      });
  };

  const getAllComments = () => {
    api
      .get("/comments")
      .then((response) => {
        setTotalComments(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong... Could not Fetch 'Comments' data..!!");
      });
  };

  const getAllCategories = () => {
    api
      .get("/categories")
      .then((response) => {
        setTotalCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong.. Could not fetch 'Categories' data!!");
      });
  };

  return (
    <div className="container-fluid">
      <div className="text-center">
        <h2 className="p-lg-3 p-2">
          <span className="badge text-bg-success">ADMIN CONTROL PANEL</span>
        </h2>
        <h3 className="p-lg-3 p-2">
          Welcome, <span className="word_span fw-bold">{currentUser.name}</span>{" "}
          !
        </h3>
        <p className="fw-semibold fs-5 p-lg-3 p-2">
          <span className="word_span fw-bold">Manage</span> the BloggyPost
          platform with confidence.{" "}
          <span className="word_span fw-bold">Monitor</span> published blogs,{" "}
          <span className="word_span fw-bold">oversee</span> registered authors,{" "}
          <span className="word_span fw-bold">review</span> reader engagement,
          and <span className="word_span fw-bold">maintain</span> a
          well-organized blogging experience for everyone.
        </p>
      </div>

      <div className="text-center">
        <h3 className="p-lg-3 p-2">
          <span className="word_span fw-bold">Statistics</span> Cards
        </h3>
        <div className="row">
          <div className="col-xl-3 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card h-100 text-center w-75 adm_stat_card">
              <i className="bi bi-journal-richtext text-primary display-5"></i>
              <hr className="border-3 w-100 border-primary opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  Total <span className="word_span">Number of Blogs</span>
                </h4>
                <h3 className="card-text fw-semibold">{totalBlogs.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card h-100 text-center w-75 adm_stat_card">
              <i className="bi bi-people-fill text-primary display-5"></i>
              <hr className="border-3 w-100 border-primary opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  Total{" "}
                  <span className="word_span">
                    Number of Registered Authors
                  </span>
                </h4>
                <h3 className="card-text fw-semibold">{totalAuthors.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card h-100 text-center w-75 adm_stat_card">
              <i className="bi bi-chat-left-text-fill text-primary display-5"></i>
              <hr className="border-3 w-100 border-primary opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  Total <span className="word_span">Number of Comments</span>
                </h4>
                <h3 className="card-text fw-semibold">
                  {totalComments.length}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card h-100 text-center w-75 adm_stat_card">
              <i className="bi bi-tags-fill text-primary display-5"></i>
              <hr className="border-3 w-100 border-primary opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  Total <span className="word_span">Number of Categories</span>
                </h4>
                <h3 className="card-text fw-semibold">
                  {totalCategories.length}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="p-lg-3 p-2 text-primary fw-bold">Quick Actions</h3>
        <div className="row">
          <div className="col-lg-4 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card p-2 w-75 h-100 adm_dash_card">
              <i className="bi bi-journal-text text-white display-3"></i>
              <hr className="border-3 w-100 border-white opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold ">Manage Blogs</h4>
                <p className="card-text fw-semibold fs-6">
                  View, search, update, and remove blogs published across the
                  platform.
                </p>
                <Link to="/admin/blogs" className="text-decoration-none">
                  <button className="btn btn-info">View Blogs</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card p-2 w-75 h-100 adm_dash_card">
              <i className="bi bi-people text-white display-3"></i>
              <hr className="border-3 w-100 border-white opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">Manage Authors</h4>
                <p className="card-text fw-semibold fs-6">
                  View registered authors and manage author information.
                </p>
                <Link to="/admin/authors" className="text-decoration-none">
                  <button className="btn btn-info">Manage Authors</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card p-2 w-75 h-100 adm_dash_card">
              <i className="bi bi-chat-left-dots text-white display-3"></i>
              <hr className="border-3 w-100 border-white opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">Review Comments</h4>
                <p className="card-text fw-semibold fs-6">
                  Open any blog to review reader comments and monitor community
                  engagement.
                </p>
                <Link to="/admin/blogs" className="text-decoration-none">
                  <button className="btn btn-info">
                    View Comments on Blogs
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
