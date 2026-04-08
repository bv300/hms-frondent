import { useEffect, useState } from "react";
import axios from "axios";
import { FaClipboardList } from "react-icons/fa";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const url = date
      ? `http://127.0.0.1:8000/appointments/?date=${date}`
      : "http://127.0.0.1:8000/appointments/";

    axios
      .get(url)
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  }, [date]);

  return (
    <div className="appointment-list">
      <h2 className="reco">
        Appointment Records <FaClipboardList />
      </h2>

      {/* DATE SEARCH */}
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <table className="appointment-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Date & Time</th>
          </tr>
        </thead>

        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No appointments found
              </td>
            </tr>
          ) : (
            appointments.map(app => (
              <tr key={app.id}>
                <td><b>{app.token}</b></td>
                <td>{app.patient_name}</td>
                <td>{app.doctor_name}</td>
                <td>{app.department_name}</td>
                <td>{new Date(app.date).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;



