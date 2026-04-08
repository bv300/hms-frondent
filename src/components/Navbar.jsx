import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("active");
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.remove("active");
    }
  };

  // Expose closeSidebar to window for Layout component
  window.closeSidebar = closeSidebar;

  return (
    <nav className="navbar">
      <h2>Hospital</h2>

      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="nav-links">
        <Link to="/login/doctor">Doctor</Link>
        <Link to="/login/staff">Staff</Link>
        <Link to="/login/patient">Patient</Link>
        <Link to="/login/pharmacy">Pharmacy</Link>
      </div>
    </nav>
  );
}

export default Navbar;
