import { useState } from "react";
import axios from "axios";

function DepartmentForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/departments/", form)
      .then(() => {
        alert("Department added");
        setForm({ name: "", description: "" });
        refresh && refresh();
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="dpartpadding">
      <form className="department-form" onSubmit={handleSubmit}>
        <h2>Add Department</h2>

        <input
          name="name"
          placeholder="Department Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Department Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Department</button>
      </form>
    </div>
  );
}

export default DepartmentForm;
