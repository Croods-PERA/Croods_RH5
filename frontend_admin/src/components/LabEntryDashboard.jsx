import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LabEntryDashboard.css";

const LabEntryDashboard = () => {
    // State variables
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [testResult, setTestResult] = useState(""); // You may need more state variables for test results fields

    // Function to handle search
    const handleSearch = () => {
        // If a patient is selected, no need to search
        if (!selectedPatient) {
            // For demonstration purposes, let's assume we have some static patient data
            const staticPatients = [
                { id: 1, phone: "123-456-7890", name: "John Doe" },
                { id: 2, phone: "456-789-0123", name: "Jane Smith" },
                { id: 3, phone: "789-012-3456", name: "Alice Johnson" },
            ];

            // Filter patients based on search query
            const filteredPatients = staticPatients.filter(patient =>
                patient.phone.includes(searchQuery) // Assuming searchQuery is a partial phone number
            );

            // Set searchResults state with the filtered results
            setSearchResults(filteredPatients);
        }
    };

    // Function to handle selecting a patient
    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        // Set the searchQuery to the selected patient's phone number
        setSearchQuery(patient.phone);
        // Clear the search results since we have selected a patient
        setSearchResults([]);
    };

    // Function to handle submitting test results
    const handleSubmitTestResults = async () => {
        try {
            // Assuming test results are stored in an object
            const testResultsData = {
                testId: selectedPatient.id, // Assuming testId is stored in the patient object
                testResults: testResult // Assuming testResult is a string containing the test results
                // Add more fields if needed
            };

            // Send a POST request to the backend API to submit test results
            const response = await axios.post(
                "http://localhost:4000/api/submit-test-results",
                testResultsData,
                { withCredentials: true } // Add credentials if needed
            );

            // Display success message using Toastify
        toast.success("Test Results submitted successfully");
        // Optionally, reset the test result state
        setTestResult("");
    } catch (error) {
        // Display error message using Toastify
        toast.error("Error submitting test results");
        console.error("Error submitting test results:", error);
        }
    };

    return (
        <section className="container entry-component">
        <img src="/logo.png" alt="logo" className="logo" />
        <br />
        <h1 className="form-title">ADD TEST RESULTS</h1>
        <div className="lab-entry-dashboard-container">
            {/* Search for patient */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for a patient..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {/* Display search results */}
            <ul className="search-results">
                {searchResults.map((patient) => (
                    <li key={patient.id} onClick={() => handleSelectPatient(patient)}>
                        {patient.phone}
                    </li>
                ))}
            </ul>

            {/* Display form with relevant fields for test results */}
            {selectedPatient && (
                <div className="test-results-container">
                    {/* Render 10 input fields for test results */}
                    {Array.from({ length: 10 }, (_, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Test Result ${index + 1}`}
                        />
                    ))}
                    <button onClick={handleSubmitTestResults}>Submit Test Results</button>
                </div>
            )}
        </div>
    </section>
    );
};

export default LabEntryDashboard;