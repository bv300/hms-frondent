import { useEffect, useState } from "react";
import axios from "axios";

function DoctorForm({ refresh }) {
  const [departments, setDepartments] = useState([]);

  const [doctor, setDoctor] = useState({
    name: "",
    department: "",
    qualification: "",
    specialization: "",
    working_hours: "",
    experience: "",
    image: null,
  });

  // Fetch departments
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/departments/")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setDoctor({ ...doctor, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doctor.experience < 1) {
      alert("Experience must be greater than 0");
      return;
    }

    const formData = new FormData();
    Object.keys(doctor).forEach((key) => {
      formData.append(key, doctor[key]);
    });

    axios
      .post("http://127.0.0.1:8000/doctors/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Doctor added successfully");
        refresh && refresh();
        setDoctor({
          name: "",
          department: "",
          qualification: "",
          specialization: "",
          working_hours: "",
          experience: "",
          image: null,
        });
      })
      .catch((err) => console.error(err.response?.data || err));
  };

  return (
    <div className="dact">
      <form onSubmit={handleSubmit} className="doctor-form">
        <div className="add-doctor">
          <h2>Add Doctor</h2>
        </div>

        <input
          name="name"
          placeholder="Doctor Name"
          value={doctor.name}
          onChange={handleChange}
          required
        />

        <select
          name="department"
          value={doctor.department}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>

        <input
          name="qualification"
          placeholder="Qualification"
          value={doctor.qualification}
          onChange={handleChange}
          required
        />

        <input
          name="specialization"
          placeholder="Specialization"
          value={doctor.specialization}
          onChange={handleChange}
          required
        />

        <input
          name="working_hours"
          placeholder="Working Hours"
          value={doctor.working_hours}
          onChange={handleChange}
          required
        />

        <input
          name="experience"
          type="number"
          placeholder="Experience (Years)"
          min="1"
          value={doctor.experience}
          onChange={(e) =>
            setDoctor({ ...doctor, experience: Number(e.target.value) })
          }
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button className="form-btn" type="submit">
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default DoctorForm;

