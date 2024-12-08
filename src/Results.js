import React, { useEffect } from 'react';
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Results = () => {
    const location = useLocation();
    const { state } = location || {};
    const [userData, setUserData] = useState(state || {});
    const navigate = useNavigate();
    const [results, setResults] = useState(null);
    // Function to be run immediately on mount
    const getResults = async () => {
        try {
            const updatedUserData = {
                ...userData,
                ["notes"]: aggregatedNotes,
                ["feelings"]: aggregatedFeelings
                
                };
            const response = await axios.get('http://localhost:5000/users-notes', updatedUserData);
            console.log(response1);
            if (response.status == 200) {
                console.log("Preferences saved successfully!");
                navigate('/homepage', { state: userData });
            } else {
                console.error("Failed to save preferences.");
            }
        } catch (error) {
            console.error("Error saving preferences:", error);
        }
    };

    // useEffect hook to call the function once when the component is mounted
    useEffect(() => {
        runOnMount();
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div>
        <h1>Scent Sense Results</h1>
        </div>
    );
};

export default Results;