import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  // STEP 1: Send OTP
  const sendOTP = () => {
    axios
      .post("http://127.0.0.1:8000/api/forgot_password/", { email })
      .then(() => {
        setOtpSent(true);
        setMessage("OTP sent to email");
      })
      .catch(() => setMessage("User not found"));
  };

  // STEP 2: Reset Password
  const resetPassword = () => {
    axios
      .post("http://127.0.0.1:8000/api/reset_password/", {
        email,
        otp,
        password,
      })
      .then(() => {
        setMessage("Password reset successful");

        //  Redirect after 2 seconds
        setTimeout(() => {
          navigate("/login/receptionist"); // or dynamic role
        }, 2000);
      })
      .catch(() => {
        setMessage("Invalid or expired OTP");
      });
  };

  return (
    <div style={{ maxWidth: 400, margin: "60px auto" }}>
      <button
        onClick={() => navigate("/login/receptionist")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "20px"
        }}
      >
        <FaArrowLeft />
      </button>
      <h2 style={{ textAlign: "center" }}>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      {!otpSent && (
        <button onClick={sendOTP} style={{ width: "100%", padding: 10 }}>
          Send OTP
        </button>
      )}

      {otpSent && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          />

          <button
            onClick={resetPassword}
            style={{ width: "100%", padding: 10, marginTop: 10 }}
          >
            Reset Password
          </button>
        </>
      )}

      {message && (
        <p style={{ textAlign: "center", marginTop: 10 }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ForgotPassword;


