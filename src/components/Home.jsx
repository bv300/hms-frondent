import React, { useState, useEffect } from "react";
import axios from "axios";
import HospitalIntro from "./HospitalIntrom";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { Link } from "react-router-dom";
function Home() {

  const [items, setItems] = useState([]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  },);



  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/slider/")
      .then(res => {
        setItems(
          res.data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            img: `http://127.0.0.1:8000${item.image}`
          }))
        );
      })
      .catch(err => console.error(err));
  }, []);


  const nextSlide = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setItems(prev => [...prev.slice(1), prev[0]]);
      setAnimating(false);
    }, 300);
  };

  // const prevSlide = () => {
  //   if (animating) return;
  //   setAnimating(true);
  //   setTimeout(() => {
  //     setItems(prev => [
  //       prev[prev.length - 1],
  //       ...prev.slice(0, prev.length - 1),
  //     ]);
  //     setAnimating(false);
  //   }, 300);
  // };

  return (
    <div className="everyone">
      <>
        <HospitalIntro />
        {/* Your other components like departments, doctors, etc */}
      </>
      <div className="contain">
        <div className={`slid ${animating ? "animating" : ""}`}>

          {items.map(item => (
            <div
              key={item.id}
              className="item"
            >
              <div className="coverlet">
                <img src={item.img} alt={item.title} className="slider-img" />
              </div>
              <div className="con">
                <div className="namz">{item.title}</div>
                <div className="des">{item.description}</div>



                {/* <Link to="appointment" className="see-more">
                  See more
                </Link> */}


              </div>
            </div>
          ))}

          {/* <div className="button">
            <button onClick={prevSlide} className="prev"><FaArrowLeft /></button>
            <button onClick={nextSlide} className="next"><FaArrowRight /></button>
          </div> */}

        </div>
      </div>
    </div>
  );
}

export default Home;
