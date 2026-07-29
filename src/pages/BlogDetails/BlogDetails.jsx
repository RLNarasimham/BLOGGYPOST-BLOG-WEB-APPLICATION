import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";
import { Link, useParams } from "react-router";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    console.log(id);
    getBlog();
    getComments();
  }, []);

  const getBlog = () => {
    api
      .get(`/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        getAuthor(response.data.authorId);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const getAuthor = (authorId) => {
    api
      .get(`/authors/${authorId}`)
      .then((response) => setAuthor(response.data))
      .catch((error) => alert(error));
  };

  const getComments = () => {
    api
      .get(`/comments?blogId=${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const doesNotStartWithDigit = (name) => {
    return !/^\d/.test(name);
  };

  const addComment = () => {
    if (name.trim() === "" || message.trim() === "") {
      alert("Please enter your name and comment!");
      return;
    } else if (!doesNotStartWithDigit(name.trim())) {
      alert("name should not start with a Digit!! Please check the input!!!! ");
      return;
    }

    const newComment = {
      blogId: Number(id),
      name: name,
      message: message,
    };

    api
      .post(`/comments`, newComment)
      .then(() => {
        getComments();
        setName("");
        setMessage("");
        console.log(newComment);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const publishedDate = new Date(blog.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="container-fluid p-4">
      <p>
        <Link to="/">Home</Link> &gt; <Link to="/blogs">Blogs</Link> &gt;{" "}
        <Link to={`/blogs/${id}`}>Blog Details</Link>
      </p>

      <img
        src={blog.image}
        alt={blog.title}
        className="img-fluid w-100 rounded shadow mb-2 p-2"
      />

      <span className="badge text-bg-success p-2 fs-4 mb-2">
        {blog.category}
      </span>

      <h2 className="word_span p-2">{blog.title}</h2>

      <h4 className="text-muted p-2">
        By <span className="fw-bold fst-italic">{author.name}</span>
      </h4>

      <p className="fs-5 fw-semibold text-success p-2">
        Published on {publishedDate}
      </p>

      <p className="fw-semibold fs-5 p-2">{blog.excerpt}</p>

      <p className="fs-5 fw-medium text-primary p-2">{blog.content}</p>

      <h3 className="fw-bolder text-warning p-2">
        <i className="bi bi-chat text-primary"></i> Reader Discussions{" "}
        <i className="bi bi-chat text-primary"></i>
      </h3>

      {comments.length > 0 ? (
        comments.map((comment) => {
          return (
            <div
              key={comment.id}
              className="border rounded p-2 mb-2 bg-warning-subtle"
            >
              <p className="fw-bold text-primary fs-5">{comment.name}</p>
              <p className="fw-semibold fs-6">{comment.message}</p>
            </div>
          );
        })
      ) : (
        <h6>No Comments Yet..</h6>
      )}

      <hr className="border border-info border-2 opacity-75" />

      <h4 className="text-info fw-bold p-2">
        <i className="bi bi-chat-square-text"></i>{" "}
        <span className="fw-bolder">SHARE</span> YOUR THOUGHTS{" "}
        <i className="bi bi-chat-square-text"></i>
      </h4>
      <input
        type="text"
        className="form-control p-2 mb-2"
        placeholder="Enter your name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <textarea
        className="form-control mb-2 p-2"
        rows="5"
        placeholder="Type your comment.."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      ></textarea>

      <button onClick={addComment} className="btn btn-primary">
        Post Comment
      </button>
    </div>
  );
};

export default BlogDetails;
