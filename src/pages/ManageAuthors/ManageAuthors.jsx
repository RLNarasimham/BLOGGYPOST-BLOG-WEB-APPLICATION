import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";
import { Link } from "react-router";
import ViewAuthModal from "../../components/ViewAuthModal/ViewAuthModal";
import "./ManageAuthors.css";

const ManageAuthors = () => {
  const [totalAuthors, setTotalAuthors] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [totalComments, setTotalComments] = useState([]);
  const [topContributor, setTopContributor] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    getAllBlogs();
    getAllAuthors();
    getAllComments();
  }, []);

  const getAllAuthors = () => {
    api
      .get("/authors")
      .then((response) => {
        setTotalAuthors(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong... Unable to fetch Authors!");
      });
  };

  const getAllBlogs = () => {
    api
      .get("/blogs")
      .then((response) => {
        setTotalBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong... Unable to fetch Blogs!");
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
        alert("Something Went Wrong.. Unable to fetch Comments!");
      });
  };

  const findTopContributor = (authors, blogs) => {
    const blogCount = {};

    blogs.forEach((blog) => {
      if (blogCount[blog.authorId]) {
        blogCount[blog.authorId]++;
      } else {
        blogCount[blog.authorId] = 1;
      }
    });

    let highestCount = 0;
    let topAuthorId = null;

    for (let authorId in blogCount) {
      if (blogCount[authorId] > highestCount) {
        highestCount = blogCount[authorId];
        topAuthorId = Number(authorId);
      }
    }

    const topAuthor = totalAuthors.find(
      (author) => Number(author.id) === topAuthorId,
    );

    if (topAuthor) {
      setTopContributor(`${topAuthor.name} (${highestCount} Blogs)`);
    } else {
      setTopContributor("No Authors");
    }
  };

  const deleteAuthor = (author) => {
    const confirmDeleteAuthor = window.confirm(
      `Are you sure you want to delete the Author ${author.name}?`,
    );

    if (!confirmDeleteAuthor) return;

    api
      .delete(`/authors/${author.id}`)
      .then(() => {
        alert("Author has been Deleted successfully!!");
        getAllAuthors();
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong..Unable to Delete Author!!");
      });
  };

  const filteredAuthors = totalAuthors.filter((author) =>
    author.name.toLowerCase().includes(searchAuthor.toLowerCase()),
  );

  useEffect(() => {
    if (totalBlogs.length > 0 && totalAuthors.length > 0) {
      findTopContributor(totalAuthors, totalBlogs);
    }
  }, [totalBlogs, totalAuthors]);

  return (
    <div className="container-fluid">
      <h2 className="text-center p-lg-3 p-md-2 p-1">
        <span className="badge text-bg-success">ADMIN PANEL</span>
      </h2>
      <h3 className="fw-bold text-center p-md-2 p-1">
        <span className="word_span">Manage</span> Authors
      </h3>
      <p className="manage_auth_para text-center">
        <span className="word_span">View</span> all registered authors,{" "}
        <span className="word_span">monitor</span> their published blogs,{" "}
        <span className="word_span">track</span> reader engagement, and keep the
        BloggyPost platform organized.
      </p>

      <div className="text-center">
        <h3 className="p-lg-3 p-2">
          <span className="word_span fw-bold">Statistics</span> Cards
        </h3>
        <div className="row">
          <div className="col-xl-3 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card h-100 text-center w-75 adm_stat_card">
              <i className="bi bi-people-fill text-primary display-5"></i>
              <hr className="border-3 w-100 border-primary opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  <span className="word_span">Total Authors</span>
                </h4>
                <h3 className="card-text fw-semibold">{totalAuthors.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card h-100 text-center w-75 adm_stat_card">
              <i className="bi bi-file-earmark-text-fill text-primary display-5"></i>
              <hr className="border-3 w-100 border-primary opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  <span className="word_span"> Total Blogs Written</span>
                </h4>
                <h3 className="card-text fw-semibold">{totalBlogs.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card h-100 text-center w-75 adm_stat_card">
              <i className="bi bi-chat-left-text-fill text-primary display-5"></i>
              <hr className="border-3 w-100 border-primary opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  <span className="word_span">Total Comments Received</span>
                </h4>
                <h3 className="card-text fw-semibold">
                  {totalComments.length}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-xl-3 col-sm-6 p-2 d-flex justify-content-center align-items-center">
            <div className="card h-100 text-center w-75 adm_stat_card">
              <i className="bi bi-trophy-fill text-primary display-5"></i>
              <hr className="border-3 w-100 border-primary opacity-100 my-2" />
              <div className="card-body">
                <h4 className="card-title fw-bold">
                  <span className="word_span">Top Contributor</span>
                </h4>
                <p className="card-text fs-5 fw-bold">{topContributor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center p-2">
        <h3 className="p-lg-3 p-2">
          <span className="word_span fw-bold">Find</span> Authors
        </h3>
        <p className="manage_auth_para">
          <span className="word_span">Search</span> authors by{" "}
          <span className="word_span">name</span> to quickly locate and manage
          their accounts.
        </p>
        <input
          type="text"
          className="form-control text-primary"
          placeholder="Search authors by name..."
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
      </div>

      <div className="text-center">
        {totalAuthors.length > 0 ? (
          filteredAuthors.length > 0 ? (
            <table className="table table-hover table-bordered text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Author</th>
                  <th scope="col">Email ID</th>
                  <th scope="col">No. of Blogs</th>
                  <th scope="col">No. of Comments</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAuthors.map((author) => {
                  const authorBlogs = totalBlogs.filter(
                    (blog) => Number(blog.authorId) === Number(author.id),
                  );
                  const blogIds = authorBlogs.map(
                    (authorBlog) => authorBlog.id,
                  );

                  const authorComments = totalComments.filter((comment) =>
                    blogIds.includes(String(comment.blogId)),
                  );

                  return (
                    <tr key={author.id}>
                      <td className="fw-bold">{author.id}</td>
                      <td className="fst-italic fw-bold text-primary">
                        {author.name}
                      </td>
                      <td className="fw-semibold">{author.email}</td>
                      <td>{authorBlogs.length}</td>
                      <td>{authorComments.length}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => {
                              setSelectedAuthor(author);
                              setShowViewModal(true);
                            }}
                          >
                            View
                          </button>
                          <Link
                            to={`/admin/authors/edit/${author.id}`}
                            className="text-decoration-none"
                          >
                            <button className="btn btn-warning btn-sm">
                              Edit
                            </button>
                          </Link>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteAuthor(author)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-4 my-3 border rounded bg-light">
              <h3 className="fw-bold text-danger">No Authors Found</h3>
              <p className="fw-semibold text-muted">
                There are no authors matching your search criteria. Try
                searching with a different name.
              </p>
            </div>
          )
        ) : (
          <h1>No Authors have registered yet!!</h1>
        )}
      </div>

      <ViewAuthModal
        author={selectedAuthor}
        show={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedAuthor(null);
        }}
      />
    </div>
  );
};

export default ManageAuthors;
