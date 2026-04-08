import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";


function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const [otp, setOtp] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    if (["doctor", "pharmacy"].includes(updated.role)) {
      setOtpRequired(true);
    } else {
      setOtpRequired(false);
      setOtp("");
      setOtpSent(false);
    }
  };

  const requestOTP = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/request_staff_otp/", {
        email: form.email,
        role: form.role,
      });
      setOtpSent(true);
      setMessage("OTP sent to receptionist");
    } catch (err) {
      setMessage(err.response?.data?.error || "OTP request failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); //  clear previous error

    try {
      await axios.post("http://127.0.0.1:8000/api/register_user/", {
        email: form.email,
        password: form.password,
        role: form.role,
        otp: otp || "",
      });

      setMessage(""); // success → no error
      navigate(`/login/${form.role}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Registration failed");
    }
  };


  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "50px auto" }}>
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
      <h2 style={{ textAlign: "center" }}>REGISTER</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />


      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      >
        <option value="doctor">Doctor</option>
        <option value="pharmacy">Pharmacy</option>
        <option value="patient">Patient</option>
      </select>

      {otpRequired && !otpSent && (
        <button
          type="button"
          onClick={requestOTP}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        >
          Send OTP
        </button>
      )}

      {otpRequired && otpSent && (
        <input
          placeholder="Enter OTP (from receptionist)"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />
      )}

      <button style={{ width: "100%", padding: 10 }}>
        Register
      </button>

      {message && (
        <p style={{ color: "red", textAlign: "center" }}>{message}</p>
      )}
    </form>
  );
}

export default Register;


