import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";

function Layout() {
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [icon, setIcon] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // profile fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  /* ================= AUTH ================= */
  const role = (localStorage.getItem("role") || "").toLowerCase();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const base = role ? `/${role}` : "/receptionist";

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    axios
      .get("http://127.0.0.1:8000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setIcon(res.data.profile_image || null);
        setFullName(res.data.full_name || "");
        setPhone(res.data.phone || "");
        setAddress(res.data.address || "");
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ================= MENU ================= */
  const toggleMenu = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);

  /* ================= LOGOUT ================= */
  // const handleLogout = async () => {
  //   try {
  //     await axios.post("http://127.0.0.1:8000/api/logout/");
  //   } catch { }
  //   localStorage.clear();
  //   navigate("/login/receptionist");
  // };
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    }

    // clear frontend state
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login/receptionist");
  };

  /* ================= SAVE PROFILE (FIXED) ================= */
  const handleProfileSave = async (e) => {
    const file = e?.target?.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));

    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("access");

    //  CRITICAL FIX → NEVER SEND Bearer null
    if (!token) {
      setMessage("Session expired. Please login again.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    if (file) formData.append("profile_image", file);
    formData.append("full_name", fullName);
    formData.append("phone", phone);
    formData.append("address", address);

    try {
      const res = await axios.patch(
        "http://127.0.0.1:8000/api/profile/",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // update UI from backend response
      setIcon(res.data.profile_image || icon);

      //  only update preview if image uploaded
      if (file) {
        setPreview(URL.createObjectURL(file));
      }

      setMessage("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setMessage("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>HMS</h2>
          <p>Hospital Management</p>
        </div>

        <ul>
          {/* COMMON */}
          <div className="list">
            <Link to={`${base}/home`} className="nav-link">
              Home
            </Link>
          </div>

          {/* PATIENT */}
          {role === "patient" && (
            <div className="list">
              <Link to="/patient/appointment" className="nav-link">
                My Appointment
              </Link>
            </div>
          )}

          {/* DOCTOR */}
          {role === "doctor" && (
            <div className="list">
              <Link to="/doctor/appointments" className="nav-link">
                Appointment List
              </Link>
            </div>
          )}

          {/* PHARMACY */}
          {role === "pharmacy" && (
            <>
              <div className="list">
                <Link to="/pharmacy/stock" className="nav-link">
                  Medicine Stock
                </Link>
              </div>
              <div className="list">
                <Link to="/pharmacy/sale" className="nav-link">
                  Medicine Sale
                </Link>
              </div>
              <div className="list">
                <Link to="/pharmacy/billing" className="nav-link">
                  Billing
                </Link>
              </div>
            </>
          )}

          {/* RECEPTIONIST (ALL) */}
          {role === "receptionist" && (
            <>
              <div className="list">
                <span
                  className="nav-link dropdown-btn"
                  onClick={() => toggleMenu("department")}
                >
                  Department ▾
                </span>
                {openMenu === "department" && (
                  <div className="dropdown">
                    <Link to={`${base}/departments`} className="dropdown-link">
                      Department List
                    </Link>
                    <Link to={`${base}/add-department`} className="dropdown-link">
                      Add Department
                    </Link>
                  </div>
                )}
              </div>

              <div className="list">
                <span
                  className="nav-link dropdown-btn"
                  onClick={() => toggleMenu("doctor")}
                >
                  Doctor ▾
                </span>
                {openMenu === "doctor" && (
                  <div className="dropdown">
                    <Link to={`${base}/DoctorList`} className="dropdown-link">
                      Doctor List
                    </Link>
                    <Link to={`${base}/add-doctor`} className="dropdown-link">
                      Add Doctor
                    </Link>
                  </div>
                )}
              </div>

              <div className="list">
                <span
                  className="nav-link dropdown-btn"
                  onClick={() => toggleMenu("patient")}
                >
                  Patient ▾
                </span>
                {openMenu === "patient" && (
                  <div className="dropdown">
                    <Link to={`${base}/patients`} className="dropdown-link">
                      Patient List
                    </Link>
                    <Link to={`${base}/add-patient`} className="dropdown-link">
                      Add Patient
                    </Link>
                  </div>
                )}
              </div>

              <div className="list">
                <span
                  className="nav-link dropdown-btn"
                  onClick={() => toggleMenu("appointment")}
                >
                  Appointment ▾
                </span>
                {openMenu === "appointment" && (
                  <div className="dropdown">
                    <Link to={`${base}/appointment`} className="dropdown-link">
                      New Appointment
                    </Link>
                    <Link to={`${base}/appointment-list`} className="dropdown-link">
                      Appointment List
                    </Link>
                  </div>
                )}
              </div>

              <div className="list">
                <span
                  className="nav-link dropdown-btn"
                  onClick={() => toggleMenu("medicine")}
                >
                  Medicine ▾
                </span>
                {openMenu === "medicine" && (
                  <div className="dropdown">
                    <Link to={`${base}/MedicineStock`} className="dropdown-link">
                      Medicine Stock
                    </Link>
                    <Link to={`${base}/MedicineSale`} className="dropdown-link">
                      Medicine Sale
                    </Link>
                    <Link to={`${base}/billing`} className="dropdown-link">
                      Billing
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="content">
        <div className="ma-flex">
          {/* PROFILE ICON */}
          <div className="done-pro">
            <div className="right-pro">
              <div className="profile">
                <img
                  src={icon || "/default-avatar.png"}
                  alt="Profile"
                  className="profile-img"
                  onClick={() => setShowPopup(true)}
                />
              </div>
            </div>
          </div>

          {/* PROFILE POPUP */}
          {showPopup && (
            <div
              className="popup-overlay"
              onClick={() => {
                setShowPopup(false);
                setIsEditing(false);
              }}
            >
              <div
                className="popup-box"
                onClick={(e) => e.stopPropagation()}
              >
                <span
                  className="close-btn"
                  onClick={() => {
                    setShowPopup(false);
                    setIsEditing(false);
                  }}
                >
                  <MdClose />
                </span>
                <div
                  className="popup-profile-wrapper"
                  onClick={() => isEditing && fileInputRef.current.click()}
                >
                  <img src={preview || icon || "/default-avatar.png"} alt="Profile" />
                  <div className="change-overlay">Change</div>
                </div>

                <h3>{user?.email}</h3>
                <p>Role: {role}</p>
                <div className="profile-field">
                  <label>Name</label>
                  <input
                    placeholder="Full Name"
                    value={fullName}
                    disabled={!isEditing}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="profile-field">
                  <label>Phone</label>
                  <input
                    placeholder="Phone"
                    value={phone}
                    disabled={!isEditing}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="profile-field">
                  <label>Address</label>
                  <textarea
                    placeholder="Address"
                    value={address}
                    disabled={!isEditing}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {loading && <p>Saving...</p>}
                {message && <p className="status-msg">{message}</p>}
                <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleProfileSave}
                />
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                ) : (
                  <button onClick={(e) => {
                    handleProfileSave(e);
                    setIsEditing(false);
                  }}>
                    Save Changes
                  </button>
                )}
                {/* <button onClick={handleProfileSave}>Save</button> */}
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>

                {/* <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleProfileSave}
                />
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                ) : (
                  <button onClick={(e) => {
                    handleProfileSave(e);
                    setIsEditing(false);
                  }}>
                    Save Changes
                  </button>
                )} */}
              </div>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;


