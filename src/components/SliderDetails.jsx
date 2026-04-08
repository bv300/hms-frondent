import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SliderDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/slider/${id}/`)
      .then(res => setItem(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="details-page">
      <img
        src={`http://127.0.0.1:8000${item.image}`}
        alt={item.title}
        style={{ width: "300px" }}
      />
      <h1>{item.title}</h1>
      <p>{item.description}</p>
    </div>
  );
}

export default SliderDetails;
