import React, { useEffect, useState } from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { SiTicktick } from "react-icons/si";
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
function HospitalIntro() {
  const hospitalIntro = {
    name: "HMS Hospital",
    tagline: "Caring for Life, Every Day",
    description:
      "HMS Hospital is committed to providing high-quality healthcare services with experienced doctors, modern facilities, and patient-centered care.",
    highlights: [
      "24/7 Emergency Services",
      "Experienced Doctors",
      "Advanced Medical Equipment",
      "Affordable Treatment",
    ],
    stats: {
      doctors: 30,
      departments: 15,
      beds: 200,
      years: 10,
    },
  };

  //  Counter states
  const [doctors, setDoctors] = useState(0);
  const [departments, setDepartments] = useState(0);
  const [beds, setBeds] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    animateCount(setDoctors, hospitalIntro.stats.doctors, 1200);
    animateCount(setDepartments, hospitalIntro.stats.departments, 1200);
    animateCount(setBeds, hospitalIntro.stats.beds, 1500);
    animateCount(setYears, hospitalIntro.stats.years, 1000);
  }, [hospitalIntro.stats.doctors, hospitalIntro.stats.departments, hospitalIntro.stats.beds, hospitalIntro.stats.years]);

  //  Reusable counter function
  const animateCount = (setter, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setter(target);
        clearInterval(counter);
      } else {
        setter(Math.ceil(start));
      }
    }, 16);
  };

  return (
    <div className="hospital-intro">
      <div className="hi">
        <h1>{hospitalIntro.name}</h1>
        <h3>{hospitalIntro.tagline}</h3>

        <p>{hospitalIntro.description}</p>

        <div className="intro-stats">
          <div>
            <strong>{doctors}+</strong>
            <span>Doctors <FaUserDoctor /></span>
          </div>
          <div>
            <strong>{departments}+</strong>
            <span>Departments <TfiLayoutMenuSeparated /></span>
          </div>
          <div>
            <strong>{beds}+</strong>
            <span>Beds <FaBed /></span>
          </div>
          <div>
            <strong>{years}+</strong>
            <span>Years Experience <GrUserExpert /></span>
          </div>
        </div>

        <ul className="intro-highlights">
          {hospitalIntro.highlights.map((item, index) => (
            <li key={index}> <SiTicktick /> {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HospitalIntro;
