import { useEffect, useState } from "react";
import axios from "axios";

function ProfileIcon() {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/ProfileIcon/")
      .then((res) => setIcons(res.data));
  }, []);

  return (
    <div>
      <h2>Profile Pictures</h2>
      {icons.map((icon) => (
        <img
          key={icon.id}
          src={`http://127.0.0.1:8000${icon.image}`}
          style={{ width: "120px", borderRadius: "50%", margin: "10px", objectFit: "contain", height: "73px"}}
          alt="profile"
        />
      ))}
    </div>
  );
}

export default ProfileIcon;
