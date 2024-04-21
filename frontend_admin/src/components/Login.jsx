import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios"; // Temporarily commented out axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Temporarily removed axios request
      // Replace this with your backend authentication logic
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/other/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Simulating successful login
      // const res = { data: { message: "Login successful" } };

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");

      // Redirect to appropriate dashboard based on user role
      if (isAuthenticated) {
        switch (role) {
          case "Admin":
            navigateTo("/admin-dashboard");
            break;
          case "Data_Analyst":
            navigateTo("/data-analyst-dashboard");
            break;
          case "Lab_Assistant":
            navigateTo("/kidney_test_report");
            break;
          case "Doctor":
            navigateTo("/doctor-dashboard");
            break;
          case "PHI":
            navigateTo("/phi-dashboard");
            break;
          default:
            navigateTo("/");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // Temporarily removed error handling
      // Replace this with your error handling logic
      console.error(error);
    }
  };

  return (
    <>
      <section className="container form-component">
        <img src="/logo.png" alt="logo" className="logo" />
        <br />
        <h1 className="form-title">WELCOME TO HEAL TRACK</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Removed role selection */}
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Data_Analyst">Data Analyst</option>
            <option value="Lab_Assistant">Lab Entry</option>
            <option value="Doctor">Doctor</option>
            <option value="PHI">PHI</option>
          </select>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
