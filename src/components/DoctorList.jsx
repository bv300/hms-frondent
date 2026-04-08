import { useEffect, useState } from "react";
import axios from "axios";
import Doctor from "./Doctor";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = () => {
    axios
      .get("http://127.0.0.1:8000/doctors/")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const groupedDoctors = doctors.reduce((acc, doctor) => {
    const dept = doctor.department_name;
    acc[dept] = acc[dept] || [];
    acc[dept].push(doctor);
    return acc;
  }, {});

  return (
    <div className="Doctor_list">
      <h1>Doctors</h1><br />
      {Object.keys(groupedDoctors).map((department) => (
        <div key={department} className="department-block">
          <h2>{department} Department</h2>

          <table className="doctor-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Qualification</th>
                <th>Specialization</th>
                <th>Availability</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {groupedDoctors[department].map((doctor) => (
                <Doctor
                  key={doctor.id}
                  doctor={doctor}
                  refresh={fetchDoctors}
                  as="tr"   //  important
                />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default DoctorList;

