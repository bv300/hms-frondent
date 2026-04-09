import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import loginImg from "C:\Users\hp\OneDrive\Desktop\reactp\myapp\public\images\loginA.png";
// import "./style.css";

function Login() {
  const navigate = useNavigate();
  const { role: routeRole } = useParams(); // role from URL

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      //  STORE JWT DATA
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      //  REDIRECT BASED ON ROLE
      navigate(`/${res.data.role}/home`);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="alignauto">
      <div className="login-image" >
        <img src={loginImg} alt="login" />
      </div>
      <div className="login-container"  >
        <form className="login-box" onSubmit={handleLogin}>
          <div className="link-login">
            <img src="/images/hmslogo.png" alt="" />
          </div>
          <h2 className="role">{routeRole ? routeRole.toUpperCase() : "USER"} LOGIN</h2>

          {error && <p className="error-msg">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              required
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              style={{ paddingRight: 40 }}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: 16,
                userSelect: "none",
                opacity: loading ? 0.5 : 1,
                pointerEvents: loading ? "none" : "auto",
              }}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </span>
          </div>


          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button><br />

          {/*  EXTRA LINKS */}
          <div className="login-links"><br />
            <div className="linkup">
              <Link to="/forgot-password" className="link">
                Forgot Password?
              </Link>

              <span className="divider"></span><br />

              <Link
                to={`/register/${routeRole || "patient"}`}
                className="link"
              >
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;





