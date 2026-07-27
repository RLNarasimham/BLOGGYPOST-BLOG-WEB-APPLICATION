import React from "react";
import page_not_found_image from "../../assets/images/page_not_found_image.jpg";

const NotFound = () => {
  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center">
          <img
            src={page_not_found_image}
            alt="Page Not Found Image"
            className="img-fluid rounded mb-4"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />

          <h1 className="fs-2 text-danger fw-bold">
            Sorry, the{" "}
            <span className="badge bg-danger text-white mx-1">PAGE</span> you
            are looking for{" "}
            <span className="badge bg-danger text-white mx-1">
              DOES NOT EXIST
            </span>
            !!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
