import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: ""
  });

  const reset = () => {
    axios.post("http://127.0.0.1:8000/api/reset_password/", form)
      .then(() => alert("Password reset successful"));
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Reset Password</h2>

      <input placeholder="Email" onChange={e => setForm({...form,email:e.target.value})} />
      <input placeholder="OTP" onChange={e => setForm({...form,otp:e.target.value})} />
      <input placeholder="New Password" type="password" onChange={e => setForm({...form,password:e.target.value})} />

      <button onClick={reset}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
