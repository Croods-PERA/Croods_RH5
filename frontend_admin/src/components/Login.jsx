import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
// import axios from "axios"; // Temporarily commented out axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Temporarily removed axios request
      // Replace this with your backend authentication logic
      // const res = await axios.post(
      //   "http://localhost:4000/api/v1/user/login",
      //   { email, password, confirmPassword },
      //   {
      //     withCredentials: true,
      //     headers: { "Content-Type": "application/json" },
      //   }
      // );

      // Simulating successful login
      const res = { data: { message: "Login successful" } };

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Determine role based on email address
      const emailDomain = email.split("@")[1];
      let userRole = "";

      switch (emailDomain) {
        case "admin.com":
          userRole = "admin";
          break;
        case "dataanalyst.com":
          userRole = "dataAnalyst";
          break;
        case "labentry.com":
          userRole = "labEntry";
          break;
        case "doctor.com":
          userRole = "doctor";
          break;
        case "phi.com":
          userRole = "phi";
          break;
        default:
          // If email domain doesn't match any known roles, display error message
          toast.error("Invalid email address or role");
          return;
      }

      setRole(userRole);

      // Redirect based on user role
      switch (userRole) {
        case "admin":
          navigateTo("/admin-dashboard");
          break;
        case "dataAnalyst":
          navigateTo("/data-analyst-dashboard");
          break;
        case "labEntry":
          navigateTo("/lab-entry-dashboard");
          break;
        case "doctor":
          navigateTo("/doctor-dashboard");
          break;
        case "phi":
          navigateTo("/phi-dashboard");
          break;
        default:
          navigateTo("/");
      }
    } catch (error) {
      // Temporarily removed error handling
      // Replace this with your error handling logic
      console.error(error);
    }
  };

  if (isAuthenticated) {
    // Redirect to appropriate dashboard based on user role if already authenticated
    switch (role) {
      case "admin":
        return <Navigate to="/admin-dashboard" />;
      case "dataAnalyst":
        return <Navigate to="/data-analyst-dashboard" />;
      case "labEntry":
        return <Navigate to="/lab-entry-dashboard" />;
      case "doctor":
        return <Navigate to="/doctor-dashboard" />;
      case "phi":
        return <Navigate to="/phi-dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }

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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Removed role selection */}
          {/* <select value={role} onChange={(e) => setRole(e.target.value)}> */}
          {/*   <option value="">Select Role</option> */}
          {/*   <option value="admin">Admin</option> */}
          {/*   <option value="dataAnalyst">Data Analyst</option> */}
          {/*   <option value="labEntry">Lab Entry</option> */}
          {/*   <option value="doctor">Doctor</option> */}
          {/*   <option value="phi">PHI</option> */}
          {/* </select> */}
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
