import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import './Dashboard.css';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDoctorSubscription = async (e) => {
    e.preventDefault();
    try {
      // Send doctor subscription request to the backend
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/doctors/subscribe",
        { name: doctorName, specialty: doctorSpecialty },
        { withCredentials: true }
      );
      // Display success message
      toast.success(data.message);
      // Clear form inputs
      setDoctorName("");
      setDoctorSpecialty("");
    } catch (error) {
      // Display error message
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/user.png" alt="userImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
            </div>
          </div>
          <div className="secondBox">
            <form onSubmit={handleDoctorSubscription}>
              <input
                type="text"
                placeholder="Doctor Name"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Specialty"
                value={doctorSpecialty}
                onChange={(e) => setDoctorSpecialty(e.target.value)}
              />
              <button type="submit">Subscribe Doctor</button>
            </form>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          {/* <h5>Appointments</h5> */}
          {/* Appointment table */}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
