import React, { useState, useContext, useEffect } from "react";
import "./ManageBlogs.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";
import axios from "axios";

const ManageBlogs = () => {
  const { currentUser } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  useEffect(() => {
    getAllBlogs();
    getAllCategories();
    getAllAuthors();
  }, []);

  const getAllBlogs = () => {
    axios
      .get("http://localhost:5000/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong.. Unable to fetch Blogs data!!");
      });
  };

  const getAllCategories = () => {
    axios
      .get("http://localhost:5000/categories")
      .then((response) => {
        const categoryData = Array.isArray(response.data) ? response.data : [];
        setCategories(categoryData);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong.. Unable to fetch Categories!!");
      });
  };

  const getAllAuthors = () => {
    axios
      .get("http://localhost:5000/authors")
      .then((response) => {
        const authorData = Array.isArray(response.data) ? response.data : [];
        setAuthors(authorData);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong..Unable to fetch Authors data!!");
      });
  };

  const filteredBlogs = blogs.filter((blog) => {
    const categoryMatch =
      selectedCategory === "all" || blog.category === selectedCategory;

    const authorMatch =
      selectedAuthor === "all" ||
      Number(blog.authorId) === Number(selectedAuthor);

    return categoryMatch && authorMatch;
  });

  const deleteAuthBlog = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog??",
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`http://localhost:5000/blogs/${id}`)
      .then(() => {
        alert("Blog has been deleted successfully!!!");
        getAllBlogs();
      })
      .catch((error) => {
        console.log(error);
        alert("Somewthing Went Wrong..!!! Blog could not be deleted!!");
      });
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center p-lg-3 p-md-2 p-1">
        <span className="badge text-bg-success">ADMIN PANEL</span>
      </h2>
      <h3 className="fw-bold text-center p-md-2 p-1">
        <span className="word_span">Manage</span> Platform Blogs
      </h3>
      <p className="manage_blogs_para">
        <span className="word_span">Monitor, organize,</span> and{" "}
        <span className="word_span">manage</span> every blog published on
        BloggyPost. Filter articles by category or author, review blog details,
        update content when necessary, and maintain a high-quality blogging
        platform.
      </p>

      <h3 className="fw-bold text-center p-md-2 p-1">Find Blogs</h3>
      <p className="manage_blogs_para text-center">
        <span className="word_span">Quickly locate</span> published blogs using
        category and author filters.
      </p>

      <div className="row g-0">
        <div className="col-md-6 p-2">
          <select
            className="form-select w-50 mx-auto m-2 text-primary"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">All Categories</option>

            {categories.map((category) => {
              const categoryName = category?.name || category;

              return (
                <option key={category?.id ?? categoryName} value={categoryName}>
                  {categoryName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-md-6 p-2">
          <select
            className="form-select w-50 mx-auto m-2 text-primary"
            value={selectedAuthor}
            onChange={(event) => setSelectedAuthor(event.target.value)}
          >
            <option value="all">All Authors</option>

            {authors.map((author) => {
              const authorName = author?.name || author;

              return (
                <option
                  key={author?.id ?? authorName}
                  value={author?.id ?? authorName}
                >
                  {authorName}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="row g-0">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => {
            const author = authors.find((author) => {
              return Number(author.id) === Number(blog.authorId);
            });

            return (
              <div className="col-lg-4 col-md-6 p-4" key={blog.id}>
                <div className="card h-100 bg-warning-subtle">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="fw-bold text-primary text-center card-title">
                      {blog.title}
                    </h5>
                    <hr className="border-4 border-primary opacity-75" />
                    <div className="card-text">
                      <h6 className="text-bg-primary text-center p-lg-2 p-1 rounded">
                        {blog.category}
                      </h6>
                      <hr className="border-4 border-primary opacity-75" />
                      <p className="fw-semibold">{blog.excerpt}</p>
                      <hr className="border-4 border-primary opacity-75" />
                      <h6>
                        <span className="word_span">Author:</span>{" "}
                        {author?.name || "Unknown Author"}
                      </h6>
                      <h6>
                        <span className="word_span">Published:</span>{" "}
                        {blog.publishedAt}
                      </h6>
                      <hr className="border-4 border-primary opacity-75" />

                      <div className="row g-0">
                        <div className="col-xl-4 col-md-6 text-center d-flex justify-content-center align-items-center p-2">
                          <Link
                            to={`/blogs/${blog.id}`}
                            className="text-decoration-none"
                          >
                            <button className="btn btn-primary rounded-3">
                              View Details <i className="bi bi-eye"></i>
                            </button>
                          </Link>
                        </div>
                        <div className="col-xl-4 col-md-6 text-center d-flex justify-content-center align-items-center p-2">
                          <Link
                            to={`/admin/blogs/edit/${blog.id}`}
                            className="text-decoration-none"
                          >
                            <button className="btn btn-warning rounded-3">
                              Edit <i className="bi bi-pencil-square"></i>
                            </button>
                          </Link>
                        </div>
                        <div className="col-xl-4 col-md-6 text-center d-flex justify-content-center align-items-center p-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteAuthBlog(blog.id)}
                          >
                            Delete <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="fw-bold text-danger text-center p-3">
            No Blogs Found!!
          </h2>
        )}
      </div>
    </div>
  );
};

export default ManageBlogs;
