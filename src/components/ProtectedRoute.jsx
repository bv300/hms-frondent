import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, children }) {
  const role = (localStorage.getItem("role") || "").toLowerCase();

  if (!role) {
    return <Navigate to="/login/receptionist" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;

