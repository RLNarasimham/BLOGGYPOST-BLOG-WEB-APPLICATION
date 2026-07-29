import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import api from "../../api";

const EditBlog = () => {
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
    getBlog();
    getCategories();
  }, [id]);

  const getBlog = () => {
    axios
      .get(`/blogs/${id}`)
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
      .get(`/categories`)
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

  const handleCancel = () => {
    const confirmLeave = window.confirm(
      "You have unsaved changes..... Are you sure you want to leave?",
    );
    if (!confirmLeave) return;
    navigate("/author/blogs");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/blogs/${id}`, blog)
      .then((res) => {
        alert("blog updated successfully");
        navigate("/author/blogs");
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
              <span className="badge text-bg-success">AUTHOR WORKSPACE</span>
            </h2>
            <h3 className="fw-bold fs-3 p-lg-2 p-1">
              <span className="word_span">Edit</span> Your Blog
            </h3>
            <p className="fw-semibold fs-5 p-lg-2 p-1">
              Keep your content <span className="word_span">accurate</span>,{" "}
              <span className="word_span">relevant</span>, and{" "}
              <span className="word_span">engaging</span> by updating your blog
              whenever needed. Edit your articles to reflect new ideas, improve
              readability, or provide the latest information for your readers on
              BloggyPost.
            </p>
          </div>
          <div>
            <div>
              <h3 className="edit_form_heading">
                <i className="bi bi-pencil-square text-primary"></i>{" "}
                <span className="word_span">Improve</span> Your Content{" "}
                <i className="bi bi-pencil-square text-primary"></i>
              </h3>
              <p className="fw-semibold p-lg-2 p-1 feature_desc">
                <span className="word_span">Refine</span> your blog by updating
                titles, descriptions, images, or content to provide an even
                better reading experience.
              </p>
            </div>

            <div>
              <h3 className="edit_form_heading">
                <i className="bi bi-arrow-repeat text-primary"></i>{" "}
                <span className="word_span">Keep</span> Information Updated{" "}
                <i className="bi bi-arrow-repeat text-primary"></i>
              </h3>
              <p className="feature_desc">
                <span className="word_span">Refresh</span> outdated information
                and ensure your readers always receive accurate and valuable
                content.
              </p>
            </div>

            <div>
              <h3 className="edit_form_heading">
                <i className="bi bi-tags text-primary"></i>{" "}
                <span className="word_span">Update</span> Categories{" "}
                <i className="bi bi-tags text-primary"></i>
              </h3>
              <p className="feature_desc">
                <span className="word_span">Move</span> your article to the most
                suitable category so readers can easily discover your content.
              </p>
            </div>

            <div>
              <h3 className="edit_form_heading">
                <i className="bi bi-stars text-primary"></i>{" "}
                <span className="word_span">Enhance</span> Reader Experience{" "}
                <i className="bi bi-stars text-primary"></i>
              </h3>
              <p className="feature_desc">
                <span className="word_span">Small</span> improvements to your
                blogs can make them clearer, more engaging, and easier to
                understand.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-2 d-flex justify-content-center align-items-center flex-column border border-primary border-opacity-75 border-2">
          <h3 className="fw-bold p-lg-2 p-1">
            <span className="word_span">Edit</span> Blog
          </h3>
          <p className="fw-semibold text-center p-lg-2 p-1 fs-5">
            <span className="word_span">Update</span> your article details below
            and save your changes.
          </p>
          <form onSubmit={handleSubmit} className="w-75">
            <div className="form-floating mb-2">
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                placeholder="Update blog title"
                id="blogTitle"
                className="form-control"
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
                placeholder="Update cover image URL"
                name="image"
                value={blog.image}
                onChange={handleChange}
                id="coverImgUrl"
                className="form-control"
              />
              <label htmlFor="coverImgUrl" className="blog_form_label">
                Cover Image URL
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="text"
                placeholder="Update the short description of your blog..."
                id="blogExcerpt"
                name="excerpt"
                value={blog.excerpt}
                onChange={handleChange}
                className="form-control"
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
                placeholder="Update your complete blog content here..."
                id="blogContent"
                className="form-control"
              ></textarea>
              <label htmlFor="blogContent" className="blog_form_textarea">
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

export default EditBlog;
