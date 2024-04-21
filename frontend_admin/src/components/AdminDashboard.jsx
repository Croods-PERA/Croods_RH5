import React, { useState } from "react";
import AccountForm from "./AccountForm";
import "./AdminDashboard.css"; // Import the CSS file for styling

const AdminDashboard = () => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleCloseModal = () => {
        setSelectedOption(null); // Set selectedOption to null to close the modal
    };

    return (
        <section className="container entry-component">
            <img src="/logo.png" alt="logo" className="logo" />
            <div className="admin-dashboard-container">
                <h1>Dashboard</h1>
                <br />
                <div className="button-box">
                    <div className="button-group1">
                        <button onClick={() => handleOptionClick("createDoctor")}>Create Doctor Account</button>
                        <button onClick={() => handleOptionClick("deleteDoctor")}>Delete Doctor Account</button>
                    </div>
                    <div className="button-group2">
                        <button onClick={() => handleOptionClick("createDataAnalyst")}>Create Data Analyst Account</button>
                        <button onClick={() => handleOptionClick("deleteDataAnalyst")}>Delete Data Analyst Account</button>
                    </div>
                    <div className="button-group3">
                        <button onClick={() => handleOptionClick("createLabAssistant")}>Create Lab Assistant Account</button>
                        <button onClick={() => handleOptionClick("deleteLabAssistant")}>Delete Lab Assistant Account</button>
                    </div>
                    <div className="button-group4">
                        <button onClick={() => handleOptionClick("createPHI")}>Create PHI Account</button>
                        <button onClick={() => handleOptionClick("deletePHI")}>Delete PHI Account</button>
                    </div>
                </div>
                <div className="form-container">
                    {/* Pass the correct actionType for each option */}
                    {selectedOption && <AccountForm actionType={selectedOption} onClose={handleCloseModal} />}
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
