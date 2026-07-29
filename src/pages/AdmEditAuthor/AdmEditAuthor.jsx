import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import api from "../../api";

const AdmEditAuthor = () => {
  const [author, setAuthor] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getAuthor(id);
  }, [id]);

  const getAuthor = (authorId) => {
    api
      .get(`/authors/${authorId}`)
      .then((response) => {
        setAuthor(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong.. Unable to fetch Author data!");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthor({ ...author, [name]: value });
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "You have unsaved changes.. Are you sure you want to leave?",
    );

    if (!confirmCancel) return;
    navigate("/admin/authors");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!id) {
      alert("Author ID missing!!");
      return;
    }

    const updatedAuthor = {
      ...author,
      id: id,
    };

    api
      .put(`/authors/${id}`, updatedAuthor)
      .then(() => {
        alert("Author has been updated successfully!");
        navigate("/admin/authors");
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong.. Unable to update the Author details!");
      });
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-md-6 p-2 d-flex justify-content-center align-items-center flex-column border border-primary border-opacity-75 border-2">
          <div className="text-center">
            <h2 className="p-lg-2 p-1">
              <span className="badge text-bg-success">ADMIN PANEL</span>
            </h2>
            <h3 className="fw-bold fs-3 p-lg-2 p-1">
              <span className="word_span">Edit</span> Author Details
            </h3>
            <p className="fw-semibold fs-5 p-lg-2 p-1">
              <span className="word_span">Update</span> the selected author's
              account information to keep the BloggyPost platform accurate and
              well organized.
            </p>
          </div>

          <div>
            <h3 className="edit_form_heading">
              <i className="bi bi-person-lines-fill text-primary"></i>{" "}
              <span className="word_span">Manage</span>
              Author Profile{" "}
              <i className="bi bi-person-lines-fill text-primary"></i>
            </h3>
            <p className="fw-semibold p-lg-2 p-1 feature_desc">
              <span className="word_span">Edit</span> the author's name and
              email address when account details need to be corrected.
            </p>
          </div>

          <div>
            <h3 className="edit_form_heading">
              <i className="bi bi-key-fill text-primary"></i>{" "}
              <span className="word_span">Review</span> Author Profile{" "}
              <i className="bi bi-key-fill text-primary"></i>
            </h3>
            <p className="feature_desc">
              <span className="word_span">Check</span> the author's profile
              information before saving updates to keep records accurate.
            </p>
          </div>

          <div>
            <h3 className="edit_form_heading">
              <i className="bi bi-shield-check text-primary"></i> Keep Blog
              Ownership Linked{" "}
              <i className="bi bi-shield-check text-primary"></i>
            </h3>
            <p className="feature_desc">
              <span className="word_span">Maintain</span> correct author-to-blog
              mapping so published blogs stay connected to the right author.
            </p>
          </div>

          <div>
            <h3 className="edit_form_heading">
              <i className="bi bi-folder-check text-primary"></i>{" "}
              <span className="word_span">Manage</span> Author Records{" "}
              <i className="bi bi-folder-check text-primary"></i>
            </h3>
            <p className="feature_desc">
              <span className="word_span">Keep</span> author data clean and
              consistent for smooth admin management and easy future updates.
            </p>
          </div>
        </div>

        <div className="col-md-6 p-2 d-flex justify-content-center align-items-center flex-column border border-primary border-opacity-75 border-2">
          <h3 className="fw-bold p-lg-2 p-1">
            <span className="word_span">Edit</span> Author
          </h3>
          <p className="fw-semibold text-center p-lg-2 p-1 fs-5">
            <span className="word_span">Make</span> the required changes below
            and save the updated author details.
          </p>
          <form onSubmit={handleSubmit} className="w-75">
            <div className="form-floating mb-2">
              <input
                type="text"
                name="name"
                value={author.name}
                onChange={handleChange}
                placeholder="Enter author name"
                className="form-control"
                id="authorName"
              />
              <label htmlFor="authorName" className="blog_form_label">
                Full Name
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="email"
                name="email"
                value={author.email}
                onChange={handleChange}
                placeholder="Enter author email"
                className="form-control"
                id="authorEmail"
              />
              <label htmlFor="authorEmail" className="blog_form_label">
                Email Address
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="password"
                name="password"
                value={author.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="form-control"
                id="authorPassword"
              />
              <label className="authorPassword" className="blog_form_label">
                Password
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="text"
                value="author"
                placeholder="Author Role"
                className="form-control"
                id="authorRole"
                disabled
              />
              <label htmlFor="authorRole" className="blog_form_label">
                Role
              </label>
            </div>

            <div className="d-flex gap-3 jusitfy-content-center mt-2">
              <button type="submit" className="btn btn-primary w-50">
                Save Changes <i className="bi bi-check-circle"></i>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-danger w-50"
              >
                Cancel <i className="bi bi-x-circle"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdmEditAuthor;
