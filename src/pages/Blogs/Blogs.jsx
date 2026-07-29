import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";
import { Link } from "react-router";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");

  useEffect(() => {
    getBlogs();
    getCategories();
    getAuthors();
  }, []);

  const getBlogs = () => {
    axios
      .get(`/blogs`)
      .then((response) => setBlogs(response.data))
      .catch((error) => {
        console.log(error);
        alert(
          "Something Went Wrong... Unable to fetch Blogs data from database!!",
        );
      });
  };

  const getCategories = () => {
    axios
      .get("/categories")
      .then((response) => {
        const categoryData = Array.isArray(response.data) ? response.data : [];
        setCategories(categoryData);
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Something Went Wrong... Unable to fetch Categories data from database!!",
        );
      });
  };

  const getAuthors = () => {
    axios
      .get(`/authors`)
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Something Went Wrong... Unable to fetch Authors data from database!!",
        );
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

  return (
    <div className="container-fluid h-100 p-0 bg-secondary-subtle">
      <div className="p-2 border-bottom border-primary border-opacity-75 border-4">
        <h2 className="text-center fw-bold p-2">
          <span className="text-primary">Explore</span> Blogs
        </h2>
        <p className="fs-5 fw-semibold text-center p-2">
          <span className="word_span">Discover</span> insightful articles across
          a <span className="word_span">variety</span> of categories,{" "}
          <span className="word_span">learn</span> from talented authors, and{" "}
          <span className="word_span">explore</span> ideas that{" "}
          <span className="word_span">inspire</span>,{" "}
          <span className="word_span">educate</span>, and{" "}
          <span className="word_span">inform</span>.
        </p>
      </div>
      <div className="p-2">
        <h3 className="fw-bold text-center p-2">
          <span className="word_span">Find</span> the{" "}
          <span className="word_span">Right</span> Blog
        </h3>
        <p className="fw-semibold fs-5 text-center">
          <span className="word_span">Filter</span> blogs by{" "}
          <span className="word_span">category</span> or{" "}
          <span className="word_span">author</span> to quickly{" "}
          <span className="word_span">discover</span> content that matches your
          interests.
        </p>
      </div>

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
            onChange={(event) => {
              setSelectedAuthor(event.target.value);
            }}
          >
            <option value="all">All Authors</option>

            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-0">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((filteredBlog) => {
            const author = authors.find((author) => {
              return Number(author.id) === Number(filteredBlog.authorId);
            });

            return (
              <div className="col-lg-4 col-sm-6 p-4" key={filteredBlog.id}>
                <div className="card h-100 card_lat_blogs">
                  <img
                    src={filteredBlog.image}
                    alt={filteredBlog.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="fw-bold text-primary text-center card-title">
                      {filteredBlog.title}
                    </h5>
                    <hr className="border-5 border-info opacity-100" />
                    <div className="card-text">
                      <h6 className="text-bg-info text-center p-lg-2 p-1 rounded">
                        {filteredBlog.category}
                      </h6>
                      <hr className="border-5 border-info opacity-100 w-100" />
                      <p className="fw-semibold">{filteredBlog.excerpt}</p>
                      <hr className="border-5 border-info opacity-100 w-100" />

                      <h6>
                        <span className="fst-italic text-primary">Author:</span>{" "}
                        {author?.name}
                      </h6>

                      <h6>
                        <span className="fst-italic text-primary">
                          Published:
                        </span>{" "}
                        {filteredBlog.publishedAt}
                      </h6>

                      <Link
                        to={`/blogs/${filteredBlog.id}`}
                        className="d-flex justify-content-center text-decoration-none p-2"
                      >
                        <button className="btn btn-primary">
                          Read More{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                            />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <p className="text-danger fs-3 fw-bold">
              No Blogs Found with the given Category and Author
            </p>
            <h3 className="fw-bold fs-4">
              Please <span className="word_span">Check</span> the Filters
              Applied!!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
