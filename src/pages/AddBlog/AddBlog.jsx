import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import api from "../../api";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import "./AddBlog.css";

const AddBlog = () => {
  const { currentUser } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    image: "",
    excerpt: "",
    content: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    api
      .get(`/categories`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      ...blog,
      authorId: currentUser.id,
      publishedAt: new Date().toLocaleString("en-IN"),
    };

    api
      .post(`/blogs`, newBlog)
      .then(() => {
        alert("Blog published successfully!!");
        navigate("/author/blogs");
      })
      .catch((error) => console.log(error));
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
              <span className="word_span">Create</span> a New Blog
            </h3>
            <p className="fw-semibold fs-5 p-lg-2 p-1">
              <span className="word_span">Share</span> your knowledge,
              experiences, and ideas with{" "}
              <span className="word_span">Readers</span> around the world.{" "}
              <span className="word_span">Create</span> engaging blog posts that
              inform, inspire, and make a lasting impact through{" "}
              <span className="word_span">Bloggy</span>
              Post.
            </p>
          </div>
          <div>
            <div>
              <h3 className="add_blog_heading">
                <i className="bi bi-pencil-square text-primary"></i>{" "}
                <span className="word_span">Write</span> Meaningful Content{" "}
                <i className="bi bi-pencil-square text-primary"></i>
              </h3>
              <p className="fw-semibold p-lg-2 p-1 feature_desc">
                <span className="word_span">Craft</span> clear, informative, and
                engaging articles that provide value to your readers.
              </p>
            </div>
            <div>
              <h3 className="add_blog_heading">
                <i className="bi bi-images text-primary"></i>{" "}
                <span className="word_span">Add</span> Eye-Catching Images{" "}
                <i className="bi bi-images text-primary"></i>
              </h3>
              <p className="feature_desc">
                <span className="word_span">Include</span> a relevant cover
                image to make your blog visually appealing and more engaging.
              </p>
            </div>
            <div>
              <h3 className="add_blog_heading">
                <i className="bi bi-tags text-primary"></i>{" "}
                <span className="word_span">Choose</span> the Right Category{" "}
                <i className="bi bi-tags text-primary"></i>
              </h3>
              <p className="feature_desc">
                <span className="word_span">Organize</span> your blog under the
                appropriate category so readers can easily discover your
                content.
              </p>
            </div>
            <div>
              <h3 className="add_blog_heading">
                <i className="bi bi-globe2 text-primary"></i>{" "}
                <span className="word_span">Reach</span> Your Audience{" "}
                <i className="bi bi-globe2 text-primary"></i>
              </h3>
              <p className="feature_desc">
                <span className="word_span">Publish</span> blogs that educate,
                inspire, and encourage meaningful discussions within the
                BloggyPost community.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 p-2 d-flex justify-content-center align-items-center flex-column border border-primary border-opacity-75 border-2">
          <h3 className="fw-bold p-lg-2 p-1">
            <span className="word_span">Create</span> New Blog
          </h3>
          <p className="fw-semibold text-center p-lg-2 p-1 fs-5">
            <span className="word_span">Complete</span> the details below to
            publish a new Blog.
          </p>
          <form onSubmit={handleSubmit} className="w-75">
            <div className="form-floating mb-2">
              <input
                type="text"
                name="title"
                value={blog.title}
                onChange={handleChange}
                placeholder="Enter blog title"
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
              <option disabled value="">
                Select Category
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                  className="fw-semibold"
                >
                  {category.name}
                </option>
              ))}
            </select>

            <div className="form-floating mb-2">
              <input
                name="image"
                value={blog.image}
                onChange={handleChange}
                type="url"
                placeholder="Paste blog cover image URL"
                className="form-control"
                id="coverImageUrl"
              />
              <label htmlFor="coverImageUrl" className="blog_form_label">
                Cover Image URL
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                name="excerpt"
                value={blog.excerpt}
                onChange={handleChange}
                type="text"
                placeholder="Write a short summary (Excerpt) of your blog..."
                className="form-control"
                id="blogExcerpt"
              />
              <label htmlFor="blogExcerpt" className="blog_form_label">
                Excerpt of Blog
              </label>
            </div>

            <div className="form-floating mb-2">
              <textarea
                name="content"
                value={blog.content}
                onChange={handleChange}
                placeholder="Write your complete blog content here..."
                className="form-control"
                rows="10"
                id="blogFormTextarea"
              ></textarea>
              <label htmlFor="blogFormTextarea" className="blog_form_textarea">
                Blog Content
              </label>
            </div>

            <div className="d-flex gap-3 jusitfy-content-center mt-2">
              <button type="submit" className="btn btn-primary w-50">
                Publish Blog <i className="bi bi-upload"></i>
              </button>
              <button
                type="button"
                onClick={() =>
                  setBlog({
                    title: "",
                    category: "",
                    image: "",
                    excerpt: "",
                    content: "",
                  })
                }
                className="btn btn-danger w-50"
              >
                Reset <i className="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
