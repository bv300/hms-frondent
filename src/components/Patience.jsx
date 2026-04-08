import { useState } from "react";
import axios from "axios";

function PatientForm({ refresh }) {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    phone: "",
    address: "",
    prescription: "",
    image: null,
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setPatient({ ...patient, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (patient.age < 1) {
      alert("Age must be greater than 0");
      return;
    }

    const formData = new FormData();
    Object.keys(patient).forEach((key) => {
      if (patient[key] !== null) {
        formData.append(key, patient[key]);
      }
    });

    axios
      .post("http://127.0.0.1:8000/patients/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Patient added successfully");
        setPatient({
          name: "",
          age: "",
          phone: "",
          address: "",
          prescription: "",
          image: null,
        });
        refresh && refresh();
      })
      .catch((err) => console.error(err.response?.data || err));
  };

  return (
    <div className="pform">
      <form onSubmit={handleSubmit} className="patient-form">
        <h2>Add Patient</h2>

        <input name="name" placeholder="Name" value={patient.name} onChange={handleChange} required />

        <input
          name="age"
          type="number"
          placeholder="Age"
          min="1"
          value={patient.age}
          onChange={(e) =>
            setPatient({ ...patient, age: Number(e.target.value) })
          }
          required
        />

        <input name="phone" placeholder="Phone" value={patient.phone} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={patient.address} onChange={handleChange} required />

        <textarea
          name="prescription"
          placeholder="Prescription"
          value={patient.prescription}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <div className="pbut">
          <button type="submit">Save Patient</button>
        </div>
      </form>
    </div>
  );
}

export default PatientForm;

