import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AccountForm.css"; // Import the CSS file for styling

const AccountForm = ({ actionType, onClose }) => {
    const [formData, setFormData] = useState({});

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (actionType === "createDoctor") {
                response = await axios.post("/api/createDoctor", formData);
            } else if (actionType === "deleteDoctor") {
                response = await axios.delete("/api/deleteDoctor", { data: formData });
            }
            // Handle success response
            toast.success(response.data.message);
            // Clear form data after submission
            setFormData({});
            // Close the form
            onClose();
        } catch (error) {
            // Handle error response
            toast.error(error.response.data.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClose = (e) => {
        // Check if the click occurred outside of the modal content
        if (e.target.className === "modal") {
            onClose();
        }
    };

    return (
        <div className="modal" onClick={handleClose}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <form onSubmit={handleFormSubmit}>
                    {/* Render fields based on action type */}
                    {actionType === "createDoctor" && (
                        <>
                            <input type="text" name="name" placeholder="Doctor Name" onChange={handleChange} />
                            <input type="text" name="specialty" placeholder="Doctor Specialty" onChange={handleChange} />
                            {/* Add more fields for creating doctor accounts */}
                        </>
                    )}
                    {actionType === "deleteDoctor" && (
                        <>
                            <input type="text" name="doctorId" placeholder="Doctor ID" onChange={handleChange} />
                            {/* Add more fields for deleting doctor accounts */}
                        </>
                    )}
                    {/* Add similar conditional rendering for other account types */}
                    <button type="submit">{actionType === "create" ? "Create Account" : "Delete Account"}</button>
                </form>
            </div>
        </div>
    );
};

export default AccountForm;
