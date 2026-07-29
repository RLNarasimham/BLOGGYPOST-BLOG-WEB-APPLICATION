import React, { useState, useEffect, useContext } from "react";
import "./MyBlogs.css";
import axios from "axios";
import api from "../../api";
import { Link } from "react-router";
import { AuthContext } from "../../context/AuthContext";

const MyBlogs = () => {
  const { currentUser } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    getAuthBlogs();
    getComments();
  }, []);

  const getAuthBlogs = () => {
    axios
      .get(`/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const deleteAuthBlog = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to Delete this Blog??",
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .delete(`/blogs/${id}`)
      .then(() => {
        alert("Blog has been Deleted Successfully!!");
        getAuthBlogs();
      })
      .catch((error) => {
        console.log(error);
        alert("Somewthing Went Wrong..!!! Blog could not be deleted!!");
      });
  };

  const getComments = () => {
    axios
      .get("/comments")
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => console.log(error));
  };

  const currentAuthBlogs = blogs.filter(
    (blog) => Number(blog.authorId) === Number(currentUser.id),
  );

  const authorBlogIds = currentAuthBlogs.map((blog) => Number(blog.id));

  const totalComntsReceived = comments.filter((comment) =>
    authorBlogIds.includes(Number(comment.blogId)),
  );

  const authorCategories = [
    ...new Set(currentAuthBlogs.map((blog) => blog.category)),
  ];

  const filteredAuthBlogs = currentAuthBlogs.filter((blog) => {
    const categoryMatch =
      selectedCategory === "all" || blog.category === selectedCategory;
    return categoryMatch;
  });
  console.log("SELECTED CATEGORY: ", selectedCategory);
  console.log("FILTERED BLOGS: ", filteredAuthBlogs);

  return (
    <div className="container-fluid">
      <h2 className="text-center p-lg-3 p-md-2 p-1">
        <span className="badge text-bg-success">AUTHOR WORKSPACE</span>
      </h2>
      <h3 className="fw-bold text-center p-md-2 p-1">
        <span className="word_span">Manage</span> Your Blogs
      </h3>
      <p className="my_blogs_para">
        View <span className="word_span">organize, update,</span> and{" "}
        <span className="word_span">manage</span> all the blogs you've published
        on BloggyPost. Track your content, keep it up to date, and engage with
        readers through your articles.
      </p>

      <div className="row">
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-center flex-column p-md-3 p-2">
          <div className="card h-100 w-75">
            <i className="bi bi-journal-richtext text-primary display-5 text-center"></i>
            <hr className="border-3 w-100 border-primary opacity-100 my-2" />
            <div className="card-body">
              <h4 className="card-title fw-bold text-center">
                <span className="word_span">Total Number</span> Of Blogs
              </h4>
              <h3 className="card-text fw-semibold text-center">
                {currentAuthBlogs.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-center flex-column p-md-3 p-2">
          <div className="card h-100 w-75">
            <i className="bi bi-tags text-primary display-5 text-center"></i>
            <hr className="border-3 w-100 border-primary opacity-100 my-2" />
            <div className="card-body">
              <h4 className="card-title fw-bold text-center">
                <span className="word_span">Categories</span> Used
              </h4>
              <h3 className="card-text fw-semibold text-center">
                {authorCategories.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-items-center flex-column p-md-3 p-2">
          <div className="card h-100 w-75">
            <i className="bi bi-chat-left-text text-primary display-5 text-center"></i>
            <hr className="border-3 w-100 border-primary opacity-100 my-2" />
            <div className="card-body">
              <h4 className="card-title fw-bold text-center">
                <span className="word_span">Comments</span> Received
              </h4>
              <h3 className="card-text fw-semibold text-center">
                {totalComntsReceived.length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <h3 className="fw-bold text-center p-md-2 p-1">
        <span className="word_span">Find</span> Your Blog
      </h3>
      <p className="my_blogs_para text-center">
        <span className="word_span">Quickly locate</span> your published
        articles by selecting a category.
      </p>
      <select
        value={selectedCategory}
        onChange={(event) => {
          setSelectedCategory(event.target.value);
        }}
        className="form-select w-25 mx-auto m-2 text-primary"
      >
        <option value="all">All Categories</option>
        {authorCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="row g-0">
        {filteredAuthBlogs.length > 0 ? (
          filteredAuthBlogs.map((blog) => {
            return (
              <div className="col-lg-4 col-md-6 p-2" key={blog.id}>
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
                        {currentUser.name}
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
                            to={`/author/edit/${blog.id}`}
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

export default MyBlogs;

/* {
      "id": "3",
      "title": "The Future of Artificial Intelligence in Everyday Life",
      "category": "Technology",
      "authorId": 3,
      "image": "https://images.unsplash.com/photo-1744640326166-433469d102f2?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "excerpt": "Artificial Intelligence is becoming part of our daily routine in more ways than ever before.",
      "content": "Artificial Intelligence is powering recommendation systems, voice assistants, healthcare applications, and smart automation tools. Businesses use AI to improve customer service, analyze data, and automate repetitive tasks. As AI technology continues to evolve, developers must understand ethical considerations, privacy concerns, and responsible AI practices. Learning AI fundamentals today can open exciting career opportunities in the future.",
      "publishedAt": "2026-07-09"
    }*/
