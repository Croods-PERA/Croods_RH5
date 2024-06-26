import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./Dashboard.css";

const Dashboard = () => {
  const [doctorName, setDoctorName] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");


  const handleDoctorSubscription = async (e) => {
    e.preventDefault();
    try {
      // Send doctor subscription request to the backend
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/patient/add_doctor",
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

  // Sample data for the line chart
  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <>
      <Sidebar />
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/user.png" alt="userImg" />
            <div className="content">
              <div>
                <p>Hello</p>
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
              /><br></br>
              <button type="submit">Add Doctor</button>
            </form>
          </div>
          <div className="thirdBox">
            <p> Doctors</p>
            <h3>10</h3>
          </div>
        </div>
        <div className="banner">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
        <div>
          <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
        <div>
          <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="amt" stroke="#ffc658" />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
      </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
