import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    if (allowedRole === "admin") {
      return <Navigate to="/admin/login" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  if (currentUser.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
