import { useEffect, useState } from "react";
import axios from "axios";
import { LuBookUser } from "react-icons/lu";


/* ===================== PATIENT MODAL ===================== */
function PatientModal({ open, initialName, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: initialName || "",
    age: "",
    phone: "",
    address: "",
    prescription: "",
  });

  useEffect(() => {
    setForm(f => ({ ...f, name: initialName || "" }));
  }, [initialName]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setSaving(true);
      const res = await axios.post("http://127.0.0.1:8000/patients/", form);
      onSaved(res.data);
    } catch {
      setError("Failed to save patient");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add New Patient</h3>
        {error && <p className="error">{error}</p>}

        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
        <textarea name="prescription" value={form.prescription} onChange={handleChange} placeholder="Prescription" />

        <div className="modal-actions">
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save & Continue"}
          </button>
          <button onClick={onClose} className="secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ===================== APPOINTMENT ===================== */
export default function Appointment() {
  const [patients, setPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [slots, setSlots] = useState([]);

  const [patientQuery, setPatientQuery] = useState("");
  const [patientLocked, setPatientLocked] = useState(false);
  const [matchedPatients, setMatchedPatients] = useState([]);

  const [appointment, setAppointment] = useState({
    patient: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [showPatientModal, setShowPatientModal] = useState(false);
  const [modalInitialName, setModalInitialName] = useState("");
  const [error, setError] = useState("");

  /* ---------- Load Data ---------- */
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/patients/").then(r => setPatients(r.data));
    axios.get("http://127.0.0.1:8000/departments/").then(r => setDepartments(r.data));
    axios.get("http://127.0.0.1:8000/doctors/").then(r => setDoctors(r.data));
  }, []);

  useEffect(() => {
    setFilteredDoctors(
      doctors.filter(d => String(d.department) === String(appointment.department))
    );
  }, [appointment.department, doctors]);

  useEffect(() => {
    if (appointment.doctor && appointment.date) {
      axios
        .get(`http://127.0.0.1:8000/doctors/${appointment.doctor}/slots/?date=${appointment.date}`)
        .then(r => setSlots(r.data.slots || []));
    } else {
      setSlots([]);
    }
  }, [appointment.doctor, appointment.date]);

  useEffect(() => {
    if (!patientQuery || patientLocked) {
      setMatchedPatients([]);
      return;
    }
    setMatchedPatients(
      patients.filter(p =>
        p.name.toLowerCase().includes(patientQuery.toLowerCase())
      )
    );
  }, [patientQuery, patients, patientLocked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    let patientId = appointment.patient;

    if (!patientId && patientQuery) {
      const existing = patients.find(
        p => p.name.toLowerCase() === patientQuery.toLowerCase()
      );
      if (existing) {
        patientId = existing.id;
        setAppointment(a => ({ ...a, patient: patientId }));
      } else {
        setModalInitialName(patientQuery);
        setShowPatientModal(true);
        return;
      }
    }

    if (!patientId) return setError("Select patient");
    if (!appointment.doctor || !appointment.time)
      return setError("Complete all fields");

    await axios.post("http://127.0.0.1:8000/appointments/", {
      patient: patientId,
      doctor: appointment.doctor,
      date: `${appointment.date}T${appointment.time}:00`,
    });

    alert
      ("✅ Appointment booked");
    setAppointment({ patient: "", department: "", doctor: "", date: "", time: "" });
    setPatientQuery("");
    setPatientLocked(false);
  };

  const handlePatientSaved = (p) => {
    setShowPatientModal(false);
    setPatients(prev => [...prev, p]);
    setAppointment(a => ({ ...a, patient: p.id }));
    setPatientQuery(p.name);
    setPatientLocked(true);
  };

  return (
    <div className="appointment-page">
      <div className="appointment-card">
        <h2>Book Appointment <LuBookUser /></h2>
        {error && <p className="error">{error}</p>}

        {/* Patient */}
        <div className="field-group">
          <label>Patient Name</label>
          <div className="patient-input-wrapper">
            <input
              value={patientQuery}
              disabled={patientLocked}
              placeholder="Type patient name"
              onChange={e => {
                setPatientQuery(e.target.value);
                setAppointment(a => ({ ...a, patient: "" }));
              }}
            />
            {patientLocked && (
              <button
                type="button"
                className="change-btn"
                onClick={() => {
                  setPatientLocked(false);
                  setPatientQuery("");
                  setAppointment(a => ({ ...a, patient: "" }));
                }}
              >
                Change
              </button>
            )}
          </div>

          {matchedPatients.length > 0 && (
            <ul className="suggestions">
              {matchedPatients.map(p => (
                <li
                  key={p.id}
                  onClick={() => {
                    setPatientQuery(p.name);
                    setAppointment(a => ({ ...a, patient: p.id }));
                    setPatientLocked(true);
                    setMatchedPatients([]);
                  }}
                >
                  {p.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="row">
          <select onChange={e => setAppointment(a => ({ ...a, department: e.target.value }))}>
            <option value="">Department</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <select onChange={e => setAppointment(a => ({ ...a, doctor: e.target.value }))}>
            <option value="">Doctor</option>
            {filteredDoctors.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <input type="date" onChange={e => setAppointment(a => ({ ...a, date: e.target.value }))} />
          <select onChange={e => setAppointment(a => ({ ...a, time: e.target.value }))}>
            <option value="">Time</option>
            {slots.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <button className="confirm-btn" onClick={handleSubmit}>
          Confirm Appointment
        </button>
      </div>

      <PatientModal
        open={showPatientModal}
        initialName={modalInitialName}
        onClose={() => setShowPatientModal(false)}
        onSaved={handlePatientSaved}
      />
    </div>
  );
}

