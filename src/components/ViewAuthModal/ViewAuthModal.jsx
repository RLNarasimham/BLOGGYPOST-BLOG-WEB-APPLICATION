import React from "react";

const ViewAuthModal = ({ author, show, onClose }) => {
  if (!author && !show) return null;

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Author Details</h1>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="p-2 fs-5">
                <span className="fw-bold">Name:</span>{" "}
                <span className="text-primary fw-semibold fst-italic">
                  {author.name}
                </span>
              </p>
              <p className="p-2 fs-5">
                <span className="fw-bold">Email:</span>{" "}
                <span className="text-primary fw-semibold fst-italic">
                  {author.email}
                </span>
              </p>
              <p className="p-2 fs-5">
                <span className="fw-bold">Role:</span>{" "}
                <span className="text-primary fw-semibold fst-italic">
                  {author.role || "author"}
                </span>
              </p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAuthModal;
