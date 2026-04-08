import { useEffect, useState } from "react";
import axios from "axios";
import { GiMedicines } from "react-icons/gi";

function MedicineStock() {
  const [medicines, setMedicines] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    stock: "",
    price: "",
    mfg_date: "",
    expiry_date: "",
  });

  const fetchMedicines = () => {
    axios
      .get("http://127.0.0.1:8000/medicines/")
      .then((res) => setMedicines(res.data));
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.stock < 1) {
      alert("Stock must be at least 1");
      return;
    }

    if (form.price < 1) {
      alert("Price must be greater than 0");
      return;
    }

    if (editingId) {
      axios
        .put(`http://127.0.0.1:8000/medicines/${editingId}/`, form)
        .then(() => {
          fetchMedicines();
          resetForm();
        });
    } else {
      axios
        .post("http://127.0.0.1:8000/medicines/", form)
        .then(() => {
          fetchMedicines();
          resetForm();
        });
    }
  };

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setForm({
      name: medicine.name,
      company: medicine.company,
      stock: medicine.stock,
      price: medicine.price,
      mfg_date: medicine.mfg_date,
      expiry_date: medicine.expiry_date,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      company: "",
      stock: "",
      price: "",
      mfg_date:"",
      expiry_date: "",
    });
  };

  return (
    <div className="mestock">
      <div className="medicine-box">
        <h2>{editingId ? "Edit Medicine" : "Add Medicine"}<GiMedicines /></h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="medicine-form">
          <input
            placeholder="Medicine Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            placeholder="Company Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Stock"
            min="1"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            required
          />

          <input
            type="number"
            placeholder="Price"
            min="1"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />

          <input
            type="date"
            value={form.mfg_date}
            onChange={(e) =>
              setForm({ ...form, mfg_date: e.target.value })
            }
            required
          />

          <input
            type="date"
            value={form.expiry_date}
            onChange={(e) => setForm({ ...form, expiry_date: e.target.value })}
            required
          />

          <button type="submit">
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        {/* TABLE */}
        <h2>Medicine Stock</h2>

        <table className="medicine-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Stock</th>
              <th>Price (₹)</th>
              <th>MFG Date</th>
              <th>Expiry Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No medicines available
                </td>
              </tr>
            ) : (
              medicines.map((m) => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.company}</td>
                  <td>{m.stock}</td>
                  <td>₹{m.price}</td>
                  <td>{m.mfg_date}</td>
                  <td>{m.expiry_date}</td>
                  <td>
                    <button onClick={() => handleEdit(m)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicineStock;
