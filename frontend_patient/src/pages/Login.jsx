import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../main"; // Import the Context from the appropriate file

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:4000/api/v1/user/patient/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(true);
        navigateTo("/dashboard");
        setEmail("");
        setPassword("");
      });
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred");
      }
    }
    

    // Simulate successful login
    // toast.success("Login successful!");
    // setIsAuthenticated(true);
    // navigateTo("/dashboard"); // Navigate to next page
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
  };

  if (isAuthenticated) {
    return <Navigate to = {"/dashboard"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
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
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
              <p style={{ margin: 0, marginRight: "10px", fontSize: "20px" }}>Not Registered?</p>
              <Link
                to={"/register"}
                style={{ textDecoration: "none", color: "#271776ca" }}
              >
                Register Now
              </Link>
            </div>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
