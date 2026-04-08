import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import StudentsForm from "./components/Students_form";
import StudentsList from "./components/Students_list";
import PatientForm from "./components/Patience";
import PatientList from "./components/PatienceComplaint";
import ProfileIcon from "./components/ProfileIcon";
import SliderDetails from "./components/SliderDetails";
import DoctorList from "./components/DoctorList";
import Doctor from "./components/Doctor";
import DoctorForm from "./components/DoctorForm";
import Appointment from "./components/Appointment";
import Appointmentlist from "./components/Appointment_list";
import MedicineStock from "./components/MedicineStock";
import MedicineSale from "./components/MedicineSale";
import DepartmentList from "./components/DepartmentList";
import DepartmentForm from "./components/Department";
import Login from "./components/Login";
import Register from "./components/Register";
import LogoutButton from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import Billing from "./components/Billing";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
  <Routes>
    {/* Default redirect */}
    <Route index element={<Navigate to="/receptionist/home" />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    {/* Auth */}
    <Route path="/login/:role" element={<Login />} />
    <Route path="/register/:role" element={<Register />} />
    <Route path="/logout" element={<LogoutButton />} />

    {/* Unauthorized – TOP LEVEL */}
    <Route path="/unauthorized" element={<Unauthorized />} />

    {/* ADMIN */}
    <Route
      path="/receptionist"
      element={
        <ProtectedRoute allowedRoles={["receptionist"]}>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="home" element={<Home />} />
      <Route path="students_form" element={<StudentsForm />} />
      <Route path="students_list" element={<StudentsList />} />
      <Route path="add-patient" element={<PatientForm />} />
      <Route path="patients" element={<PatientList />} />
      <Route path="ProfileIcon" element={<ProfileIcon />} />
      <Route path="slider/:id" element={<SliderDetails />} />
      <Route path="Doctor" element={<Doctor />} />
      <Route path="DoctorList" element={<DoctorList />} />
      <Route path="add-doctor" element={<DoctorForm />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path="appointment-list" element={<Appointmentlist />} />
      <Route path="MedicineStock" element={<MedicineStock />} />
      <Route path="MedicineSale" element={<MedicineSale />} />
      <Route path="billing" element={<Billing />} />
      <Route path="departments" element={<DepartmentList />} />
      <Route path="add-department" element={<DepartmentForm />} />
    </Route>

    {/* DOCTOR */}
    <Route
      path="/doctor"
      element={
        <ProtectedRoute allowedRoles={["doctor"]}>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="home" element={<Home />} />
      <Route path="appointments" element={<Appointmentlist />} />
    </Route>

    {/* STAFF */}
    <Route
      path="/staff"
      element={
        <ProtectedRoute allowedRoles={["receptionist"]}>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="home" element={<Home />} />
    </Route>

    {/* PHARMACY */}
    <Route
      path="/pharmacy"
      element={
        <ProtectedRoute allowedRoles={["pharmacy"]}>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="home" element={<Home />} />
      <Route path="stock" element={<MedicineStock />} />
      <Route path="sale" element={<MedicineSale />} />
      <Route path="billing" element={<Billing />} />
    </Route>

    {/* PATIENT */}
    <Route
      path="/patient"
      element={
        <ProtectedRoute allowedRoles={["patient"]}>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="home" element={<Home />} />
      <Route path="appointment" element={<Appointment />} />
      
    </Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;
