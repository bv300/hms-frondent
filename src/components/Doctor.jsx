import axios from "axios";

function Doctor({ doctor, refresh, as }) {
  const deleteDoctor = () => {
    axios
      .delete(`http://127.0.0.1:8000/doctors/${doctor.id}/`)
      .then(() => refresh())
      .catch((err) => console.error(err));
  };

  // render as table row
  if (as === "tr") {
    return (
      <tr>
        <td>
          {doctor.image && (
            <img
              src={`http://127.0.0.1:8000${doctor.image}`}
              alt={doctor.name}
              width="50"
            />
          )}
        </td>
        <td>{doctor.name}</td>
        <td>{doctor.department_name}</td>
        <td>{doctor.qualification}</td>
        <td>{doctor.specialization}</td>
        <td>
          {doctor.available_from} – {doctor.available_to}
        </td>
        <td>{doctor.experience} yrs</td>
        <td>
          <button className="delete-btn" onClick={deleteDoctor}>
            Delete
          </button>
        </td>
      </tr>
    );
  }

  return null;
}

export default Doctor;






