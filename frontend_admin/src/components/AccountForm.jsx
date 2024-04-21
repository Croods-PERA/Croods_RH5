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
            if (actionType.startsWith("create")) {
                if (actionType === "createLabAssistant") {
                    response = await axios.post(`http://localhost:4000/api/v1/user/other/register/lab_assistant`, formData);
                } else {
                response = await axios.post(`/api/${actionType}`, formData);
                }
            } else {
                response = await axios.delete(`/api/${actionType}`, { data: formData });
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
        // Check if the click occurred outside of the modal content or its children
        if (!e.target.closest(".modal-content")) {
            onClose();
        }
    };
    
    return (
        <div className="modal" onClick={handleClose}>
            <div className="modal-content">
                <form onSubmit={handleFormSubmit}>
                    {/* Render fields based on action type */}
                    {actionType === "createDoctor" && (
                        <>
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                            <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} />
                        </>
                    )}
                    {actionType === "deleteDoctor" && (
                        <>
                            <input type="text" name="doctorId" placeholder="Doctor ID" onChange={handleChange} />
                            {/* Add more fields for deleting doctor accounts */}
                        </>
                    )}
                    {actionType === "createDataAnalyst" && (
                        <>
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </>
                    )}
                    {actionType === "deleteDataAnalyst" && (
                        <>
                            <input type="text" name="dataAnalystId" placeholder="Data Analyst ID" onChange={handleChange} />
                            {/* Add more fields for deleting data analyst accounts */}
                        </>
                    )}
                    {actionType === "createLabAssistant" && (
                        <>
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </>
                    )}
                    {actionType === "deleteLabAssistant" && (
                        <>
                            <input type="text" name="labAssistantId" placeholder="Lab Assistant ID" onChange={handleChange} />
                            {/* Add more fields for deleting doctor accounts */}
                        </>
                    )}
                    {actionType === "createPHI" && (
                        <>
                            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </>
                    )}
                    {actionType === "deletePHI" && (
                        <>
                            <input type="text" name="PHIId" placeholder="PHI ID" onChange={handleChange} />
                            {/* Add more fields for deleting data analyst accounts */}
                        </>
                    )}
                    {/* Add similar conditional rendering for other user types */}
                    <button type="submit">{actionType.startsWith("create") ? "Create Account" : "Delete Account"}</button>
                </form>
            </div>
        </div>
    );
};

export default AccountForm;

