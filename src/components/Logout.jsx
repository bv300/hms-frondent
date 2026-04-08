import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove stored auth data
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    // optional: localStorage.clear();

    navigate("/login/receptionist");
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
