import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import NotFound from "./pages/NotFound/NotFound";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AuthorDashboard from "./pages/AuthorDashboard/AuthorDashboard";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import AddBlog from "./pages/AddBlog/AddBlog";
import EditBlog from "./pages/EditBlog/EditBlog";
import ManageBlogs from "./pages/ManageBlogs/ManageBlogs";
import AdmEditBlog from "./pages/AdmEditBlog/AdmEditBlog";
import ManageAuthors from "./pages/ManageAuthors/ManageAuthors";
import AdmEditAuthor from "./pages/AdmEditAuthor/AdmEditAuthor";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ViewAuthModal from "./components/ViewAuthModal/ViewAuthModal";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-out-cubic",
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/blogs"} element={<Blogs />} />
          <Route path={"/blogs/:id"} element={<BlogDetails />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/admin/login"} element={<AdminLogin />} />

          <Route
            path={"/author/dashboard"}
            element={
              <ProtectedRoute allowedRole="author">
                <AuthorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/author/blogs"}
            element={
              <ProtectedRoute allowedRole="author">
                <MyBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/author/add"}
            element={
              <ProtectedRoute allowedRole="author">
                <AddBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/author/edit/:id"}
            element={
              <ProtectedRoute allowedRole="author">
                <EditBlog />
              </ProtectedRoute>
            }
          />

          <Route
            path={"/admin/dashboard"}
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/admin/blogs"}
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/admin/blogs/edit/:id"}
            element={
              <ProtectedRoute allowedRole="admin">
                <AdmEditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/admin/authors"}
            element={
              <ProtectedRoute allowedRole="admin">
                <ManageAuthors />
              </ProtectedRoute>
            }
          />
          <Route
            path={"/admin/authors/edit/:id"}
            element={
              <ProtectedRoute allowedRole="admin">
                <AdmEditAuthor />
              </ProtectedRoute>
            }
          />

          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
