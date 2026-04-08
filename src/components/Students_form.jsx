import { useState } from "react";
import axios from "axios";

function Students_form() {

  const[formData,setFormData] = useState({name:"", age:""});
  const [message,setMessage] = useState("");

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e)=>{
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/api/add_student",formData)
    .then(res => {
      setMessage("Student added successfully!")
    })
    .catch(err => {
      setMessage("Error adding student");
    })
  };

  

  return (
    <div className="less">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text"  name="name" placeholder="Enter name" value={formData.name} onChange={handleChange}/><br />
        <input type="text" name="age" placeholder="Enter age" value={formData.age} onChange={handleChange}/><br />
        <button type="submit">Add</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Students_form;
