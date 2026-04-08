import { useEffect, useState } from "react";
import axios from "axios";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = () => {
    axios
      .get("http://127.0.0.1:8000/departments/")
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="dpartpadding">
      <div className="department-page">
        <div className="departmenth2">
          <h2>Departments <TfiLayoutMenuSeparated /></h2>
        </div>


        <table className="department-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No departments available
                </td>
              </tr>
            ) : (
              departments.map((dep) => (
                <tr key={dep.id}>
                  <td>{dep.name}</td>
                  <td className="auto-cell">{dep.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepartmentList;

