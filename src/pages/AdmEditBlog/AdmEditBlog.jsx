import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const AdmEditBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    image: "",
    excerpt: "",
    content: "",
  });
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    getBlog(id);
    getCategories();
  }, [id]);

  const getBlog = (blogId) => {
    axios
      .get(`http://localhost:5000/blogs/${blogId}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong...Unable to fetch Blog data!!");
      });
  };

  const getCategories = () => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong...Unable to fetch Categories!!");
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleCancel = (event) => {
    event.preventDefault();

    const confirmCancel = window.confirm(
      "You have unsaved changes.. Are you sure you want to leave?",
    );

    if (!confirmCancel) return;
    navigate("/admin/blogs");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!id) {
      alert("Blog id is missing.");
      return;
    }

    const updatedBlog = {
      ...blog,
      id: id,
    };

    axios
      .put(`http://localhost:5000/blogs/${id}`, updatedBlog)
      .then(() => {
        alert("Blog updated successfully!!");
        navigate("/admin/blogs");
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong...Unable to update the blog !!");
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
              <span className="word_span">Edit</span> Blog Content
            </h3>
            <p className="fw-semibold fs-5 p-lg-2 p-1">
              <span className="word_span">Manage</span> and{" "}
              <span className="word_span">update</span> blog articles across the
              BloggyPost platform.{" "}
              <span className="word_span">As an administrator</span>, you can
              modify blog details, improve content quality, update categories,
              and maintain accurate information for readers.
            </p>
          </div>

          <div>
            <h3 className="edit_form_heading">
              <i className="bi bi-pencil-square text-primary"></i>{" "}
              <span className="word_span">Edit </span>Blog Details{" "}
              <i className="bi bi-pencil-square text-primary"></i>
            </h3>
            <p className="fw-semibold p-lg-2 p-1 feature_desc">
              <span className="word_span">Update</span> blog titles, excerpts,
              categories, cover images, and article content whenever
              improvements are required.
            </p>
          </div>

          <div>
            <h3 className="edit_form_heading">
              <i className="bi bi-check2-circle text-primary"></i>{" "}
              <span className="word_span">Maintain</span> Content Quality{" "}
              <i className="bi bi-check2-circle text-primary"></i>
            </h3>
            <p className="feature_desc">
              <span className="word_span">Correct</span> outdated information,
              improve readability, and ensure every published article meets
              platform standards.
            </p>
          </div>

          <div>
            <h3 className="edit_form_heading">
              <i className="bi bi-tags text-primary"></i>{" "}
              <span className="word_span">Organize</span> Categories{" "}
              <i className="bi bi-tags text-primary"></i>
            </h3>
            <p className="feature_desc">
              <span className="word_span">Assign</span> the appropriate category
              to each blog so readers can easily discover relevant content.
            </p>
          </div>

          <div>
            <h3 className="edit_form_heading">
              <i className="bi bi-shield-check text-primary"></i>{" "}
              <span className="word_span">Platform</span> Administration{" "}
              <i className="bi bi-shield-check text-primary"></i>
            </h3>
            <p className="feature_desc">
              <span className="word_span">Maintain</span> a professional
              blogging platform by reviewing and updating content published by
              all authors.
            </p>
          </div>
        </div>

        <div className="col-md-6 p-2 d-flex justify-content-center align-items-center flex-column border border-primary border-opacity-75 border-2">
          <h3 className="fw-bold p-lg-2 p-1">
            <span className="word_span">Edit </span> Blog
          </h3>
          <p className="fw-semibold text-center p-lg-2 p-1 fs-5">
            <span className="word_span">Update</span> the blog details below and
            save your changes to keep the article accurate and engaging.
          </p>
          <form onSubmit={handleSubmit} className="w-75">
            <div className="form-floating mb-2">
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                placeholder="Update blog title"
                className="form-control"
                id="blogTitle"
              />
              <label htmlFor="blogTitle" className="blog_form_label">
                Blog Title
              </label>
            </div>

            <select
              name="category"
              className="form-select mx-auto m-2 text-primary mb-2 fw-semibold"
              value={blog.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="form-floating mb-2">
              <input
                type="url"
                name="image"
                value={blog.image}
                onChange={handleChange}
                placeholder="Update cover Image URL"
                className="form-control"
                id="blogImage"
              />
              <label htmlFor="blogImage" className="blog_form_label">
                Cover Image URL
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="text"
                name="excerpt"
                value={blog.excerpt}
                onChange={handleChange}
                placeholder="Update the Short Description of your Blog"
                className="form-control"
                id="blogExcerpt"
              />
              <label htmlFor="blogExcerpt" className="blog_form_label">
                Blog Excerpt
              </label>
            </div>

            <div className="form-floating mb-2">
              <textarea
                name="content"
                value={blog.content}
                onChange={handleChange}
                placeholder="Update your complete blog content..."
                className="form-control"
                id="blogContent"
              ></textarea>
              <label htmlFor="blogContent" className="blog_form_label">
                Blog Content
              </label>
            </div>

            <div className="d-flex gap-3 justify-content-center mt-2">
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

export default AdmEditBlog;
