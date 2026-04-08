import { useEffect, useState } from "react";
import axios from "axios";

function PatientList() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = () => {
    axios
      .get("http://127.0.0.1:8000/patients/")
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="patient-list">
      <div className="patienctreco">
        <h2>Patient Records</h2>
      </div>

      <div className="patient-table">
        <div className="patient-header">
          <span className="pphoto">Photo</span>
          <span className="pnameA">Name</span>
          <span className="page">Age</span>
          <span className="pphone">Phone</span>
          <span className="paddress">Address</span>
          <span className="pprescriptions">Prescription</span>
        </div>

        {patients.map((patient) => (
          <div key={patient.id} className="patient-row">
            <span className="pimage">
              {patient.image && (
                <img
                  src={`http://127.0.0.1:8000${patient.image}`}
                  alt={patient.name}
                  width="50"
                />
              )}
            </span>
            <div className="pname">
               <span >{patient.name}</span>
            </div>
            <div className="pageA">
              <span >{patient.age}</span>
            </div>
            <div className="paphone">
              <span >{patient.phone}</span>
            </div>
            <div className="paddress">
              <span >{patient.address}</span>
            </div>
            <div className="pprescriptionsa">
              <span >{patient.prescription}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientList;


