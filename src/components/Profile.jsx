// import { useState } from "react";
// import axios from "axios";

// function Profile() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const updateProfile = async () => {
//     if (!file) {
//       setMessage("Please select an image");
//       return;
//     }

//     const token = localStorage.getItem("access");
//     if (!token) {
//       setMessage("Not authenticated");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("profile_image", file);

//     try {
//       await axios.patch(
//         "http://127.0.0.1:8000/api/profile/",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setMessage("Profile image updated successfully");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       setMessage("Update failed");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto" }}>
//       <h2>Change Profile</h2>

//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       <button onClick={updateProfile} style={{ marginTop: 10 }}>
//         Save Profile Image
//       </button>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Profile;



