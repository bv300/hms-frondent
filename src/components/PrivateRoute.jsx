import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login/admin" replace />;
  }

  return children;
}

export default PrivateRoute;
