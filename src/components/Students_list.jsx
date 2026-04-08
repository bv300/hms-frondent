import {useEffect,useState} from "react";
import axios from "axios";

function Students_list() {
    const [students, setStudents ] =useState([]);

    useEffect(() => {
         axios.get("http://127.0.0.1:8000/api/Students_list")
        .then(res => setStudents(res.data))
        .catch(err => console.error(err));
    },[]);
    return (
        <div>
            <ul>
                {students.map((s) => (
                    <li key={s.id}>{s.name} - {s.age}</li>
                    ))}
            </ul>
        </div>
    );
}
export default Students_list