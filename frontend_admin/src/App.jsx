import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LabEntryDashboard from "./components/LabEntryDashboard";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/lab-entry-dashboard" element={<LabEntryDashboard />} />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
