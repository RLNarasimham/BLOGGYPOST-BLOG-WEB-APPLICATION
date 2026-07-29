import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";
import hero_section_image from "../../assets/images/hero_section_image.jpg";
import technology_image from "../../assets/images/technology_image.jpg";
import education_image from "../../assets/images/education_image.jpg";
import programming_image from "../../assets/images/programming_image.jpg";
import travel_image from "../../assets/images/travel_image.jpg";
import lifestyle_image from "../../assets/images/lifestyle_image.jpg";
import "./Home.css";
import { Link } from "react-router";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getBlogs();
  }, []);

  useEffect(() => {
    getAuthors();
  }, []);

  const getBlogs = () => {
    axios
      .get("/blogs")
      .then((response) => {
        setBlogs(response.data);

        const sortedLatestBlogs = [...response.data].sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
        );

        const latestFiveBlogs = sortedLatestBlogs.slice(0, 5);

        setLatestBlogs(latestFiveBlogs);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong... Unable to fetch Latest Blogs !");
      });
  };

  const getAuthors = () => {
    axios
      .get("/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong... Unable to fetch Latest Blogs !");
      });
  };

  return (
    <div>
      <section className="container p-lg-2 p-md-3 p-4 hero">
        <div className="text-center hero_heading">
          <span className="fst-italic text-primary fw-bold discover_span">
            Discover
          </span>{" "}
          Ideas,{" "}
          <span className="fst-italic text-primary fw-bold share_span">
            Share
          </span>{" "}
          Knowledge,{" "}
          <span className="fst-italic text-primary fw-bold stay_span">
            Stay
          </span>{" "}
          Inspired with{" "}
          <div className="fw-bold brand_name_div">
            <span className="text-primary">Bloggy</span>
            Post.
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-12 p-3 fw-bold d-flex align-items-center justify-content-center">
            <p className="fs-3 hero_subhead">
              Explore{" "}
              <span className="fst-italic text-primary">insightful</span> blogs
              across <span className="fst-italic text-primary">multiple</span>{" "}
              categories, learn from{" "}
              <span className="fst-italic text-primary">passionate</span>{" "}
              authors, and engage with{" "}
              <span className="fst-italic text-primary">meaningful</span>{" "}
              discussions—all in{" "}
              <span className="fst-italic text-primary">one</span> place.
            </p>
          </div>

          <div className="col-lg-6 col-12 p-3">
            <img src={hero_section_image} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-2 col-12 mx-auto p-3 d-flex justify-content-center">
            <Link to="/blogs" className="text-decoration-none">
              <button className="btn btn-primary">Explore Blogs</button>
            </Link>
          </div>

          <div className="col-md-2 col-12 mx-auto p-3 d-flex justify-content-center">
            <Link to="/register" className="text-decoration-none">
              <button className="btn btn-warning">Become an Author</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container p-lg-2 p-md-3 p-4">
        <h2 className="text-center text-primary fw-bold p-lg-3 p-md-2 p-1">
          Explore Featured Categories
        </h2>
        <p className="fw-semibold fs-4">
          Browse blogs across a variety of topics and discover insightful
          articles written by passionate authors. Choose a category that
          interests you and start exploring.
        </p>

        <div className="row">
          <div className="col-lg-4 col-md-6 col-12 p-4">
            <div className="card h-100 card_feat_cat">
              <img
                src={technology_image}
                alt="Technology Category Card Image"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title text-center text-primary fw-bold">
                  Technology
                </h5>
                <hr className="border-5 border-primary w-100 opacity-100 " />
                <p className="card-text fw-semibold">
                  Stay updated with the latest trends, innovations, software,
                  AI, and emerging technologies shaping the future.
                </p>
                <Link
                  to="/blogs"
                  className="d-flex justify-content-center text-decoration-none"
                >
                  <button className="btn btn-primary">Explore</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-12 p-4">
            <div className="card h-100 card_feat_cat">
              <img
                src={education_image}
                className="card-img-top"
                alt="Education Category Card Image"
              />
              <div className="card-body">
                <h5 className="card-title text-center text-primary fw-bold">
                  Education
                </h5>
                <hr className="border-5 opacity-100 w-100 border-primary" />
                <p className="card-text fw-semibold">
                  Explore learning resources, study tips, career guidance, and
                  educational insights to support lifelong learning.
                </p>
                <Link
                  to="/blogs"
                  className="d-flex justify-content-center text-decoration-none"
                >
                  <button className="btn btn-primary">Explore</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 p-4">
            <div className="card h-100 card_feat_cat">
              <img
                src={programming_image}
                alt="Programming Category Card Image"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title text-center text-primary fw-bold">
                  Programming
                </h5>
                <hr className="border-5 opacity-100 w-100 border-primary" />
                <p className="card-text fw-semibold">
                  Discover coding tutorials, development practices,
                  problem-solving techniques, and modern programming concepts.
                </p>
                <Link
                  to="/blogs"
                  className="d-flex justify-content-center text-decoration-none"
                >
                  <button className="btn btn-primary">Explore</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 p-4">
            <div className="card h-100 card_feat_cat">
              <img
                src={travel_image}
                alt="Travel Category Card Image"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title text-center text-primary fw-bold">
                  Travel
                </h5>
                <hr className="border-5 opacity-100 w-100 border-primary" />
                <p className="card-text fw-semibold">
                  Read travel experiences, destination guides, practical tips,
                  and inspiring stories from around the world.
                </p>
                <Link
                  to="/blogs"
                  className="d-flex justify-content-center text-decoration-none"
                >
                  <button className="btn btn-primary">Explore</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-12 p-4">
            <div className="card h-100 card_feat_cat">
              <img src={lifestyle_image} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title text-center text-primary fw-bold">
                  Lifestyle
                </h5>
                <hr className="border-5 opacity-100 w-100 border-primary" />
                <p className="card-text fw-semibold">
                  Explore articles on health, productivity, personal growth,
                  wellness, and everyday living.
                </p>
                <Link
                  to="/blogs"
                  className="d-flex justify-content-center text-decoration-none"
                >
                  <button className="btn btn-primary">Explore</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container p-lg-2 p-md-3 p-4">
        <h2 className="text-center text-primary fw-bold p-lg-3 p-md-2 p-1">
          Latest Blogs
        </h2>
        <p className="fw-semibold fs-4 text-center">
          Stay up to date with our{" "}
          <span className="fst-italic fw-bold text-primary">newest</span> blog
          posts. Explore{" "}
          <span className="fst-italic fw-bold text-primary">fresh</span>{" "}
          insights,{" "}
          <span className="fst-italic fw-bold text-primary">practical</span>{" "}
          guides, and{" "}
          <span className="fst-italic fw-bold text-primary">inspiring</span>{" "}
          stories shared by our authors across a variety of categories.
        </p>

        <div className="row">
          {latestBlogs.map((latestBlog) => {
            const latestBlogAuthor = authors.find(
              (author) => Number(author.id) === Number(latestBlog.authorId),
            );

            return (
              <div className="col-lg-4 col-md-6 col-12 p-4" key={latestBlog.id}>
                <div className="card h-100 card_lat_blogs">
                  <img
                    src={latestBlog.image}
                    alt={`${latestBlog.title} Image`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="fw-bold text-primary text-center card-title">
                      {latestBlog.title}
                    </h5>
                    <hr className="border-5 border-info opacity-100 w-100" />
                    <div className="card-text">
                      <h6 className="text-bg-info text-center p-lg-2 p-1 rounded">
                        {latestBlog.category}
                      </h6>
                      <hr className="border-5 border-info opacity-100 w-100" />

                      <p className="fw-semibold">{latestBlog.excerpt}</p>
                      <hr className="border-5 border-info opacity-100 w-100" />

                      <h6>
                        <span className="fst-italic text-primary">Author:</span>{" "}
                        {latestBlogAuthor?.name || "Unknown"}
                      </h6>

                      <h6>
                        <span className="fst-italic text-primary">
                          Published: {latestBlog.publishedAt}
                        </span>
                      </h6>

                      <Link
                        to={`/blogs/${latestBlog.id}`}
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
          })}
        </div>
      </section>

      <section className="container p-lg-2 p-md-3 p-4">
        <h2 className="text-center text-primary fw-bold p-lg-3 p-md-2 p-1">
          Why Choose BloggyPost?
        </h2>
        <p className="fw-semibold fs-4">
          BloggyPost is a modern role-based blogging platform designed to make
          discovering, publishing, and managing blogs simple and engaging.
          Whether you're a reader, an author, or an administrator, BloggyPost
          offers a seamless experience for exploring knowledge and sharing
          ideas.
        </p>
        <div className="row">
          <div className="col-md-6 col-12 p-1">
            <div data-aos="fade-right" className="card h-100">
              <div className="card-body">
                <h4 className="card-title text-center fst-italic text-success fw-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-journal-richtext"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.5 3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047L11 4.75V7a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 7v-.5s1.54-1.274 1.639-1.208M5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                  </svg>{" "}
                  Explore Quality Blogs
                </h4>
                <hr className="border-4 border-success opacity-75 w-100" />
                <p className="card-text fw-semibold">
                  Browse insightful blogs across multiple categories and
                  discover valuable content shared by passionate authors.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-12 p-1">
            <div data-aos="fade-left" className="card h-100">
              <div className="card-body">
                <h4 className="card-title text-center fst-italic text-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-funnel-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                  </svg>{" "}
                  Smart Category & Author Filters
                </h4>
                <hr className="border-4 border-info opacity-75 w-100" />
                <p className="card-text fw-semibold">
                  Quickly find blogs that match your interests using category
                  and author-based filtering.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-12 p-1">
            <div data-aos="fade-right" className="card h-100">
              <div className="card-body">
                <h4 className="card-title text-center fst-italic text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>{" "}
                  Empower Authors
                </h4>
                <hr className="border-4 border-primary opacity-75 w-100" />
                <p className="fw-semibold card-text">
                  Authors can create, edit, manage, and publish their own blogs
                  while interacting with readers through comments.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-12 p-1">
            <div data-aos="fade-left" className="card h-100">
              <div className="card-body">
                <h4 className="card-title text-center fst-italic text-warning">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-shield-fill-check"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"
                    />
                  </svg>{" "}
                  Role-Based Administration
                </h4>
                <hr className="border-4 border-warning opacity-75 w-100" />
                <p className="fw-semibold card-text">
                  Admins can efficiently manage blogs and authors, ensuring a
                  well-organized and engaging blogging platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container p-lg-2 p-md-3 p-4">
        <h2 className="text-center text-primary fw-bold p-lg-3 p-md-2 p-1">
          Join the Conversation.
        </h2>
        <p className="fw-semibold fs-4">
          Every blog begins with an idea. Explore articles from different
          authors, share your thoughts through comments, or start your own
          blogging journey by becoming an author on BloggyPost.
        </p>
        <div className="row">
          <div className="col-md-4 col-12 text-center mx-auto p-3 d-flex justify-content-center">
            <Link to="/blogs">
              <button className="btn btn-info">Browse Latest Blogs</button>
            </Link>
          </div>
          <div className="col-md-4 col-12 mx-auto text-center p-3 d-flex justify-content-center">
            <Link to="/login">
              <button className="btn btn-success">Author Login</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
