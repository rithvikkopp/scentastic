import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Results = () => {
    const location = useLocation();
    const { state } = location || {};
    const [userData, setUserData] = useState(state || {});
    const navigate = useNavigate();
    const [results, setResults] = useState(null); // State to store response data
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    // Function to be run immediately on mount
    const getResults = async () => {
        try {
            const response = await axios.put('http://localhost:5000/users-results', userData);
            if (response.status == 200) {
                console.log("Preferences saved successfully!");
                setResults(response.data);
            } else {
                console.error("Failed to save preferences.");
            }
        } catch (error) {
            console.error("Error saving preferences:", error);
        }
    };
    const handleGoToSearch = () => {
        navigate('/search', { state: userData });
    }
    const handleGoToProfile = () => {
    navigate('/homepage', { state: userData });
    }
    const showDupes = async (item) => {
        setIsLoading(true);
        try {
            const response = await axios.put('http://localhost:5000/dupes-list', { id: item });
            if (response.status === 200) {
                console.log("Dupes fetched successfully!");
                console.log(item);
                console.log(response);
                setModalData(response.data[0]);
                setIsModalOpen(true); // Open the modal
            } else {
                console.error("Failed to fetch dupes.");
            }
        } catch (error) {
            console.error("Error fetching dupes:", error);
            setError("Error fetching dupes.");
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect hook to call the function once when the component is mounted
    useEffect(() => {
        getResults();
    }, []); // Empty dependency array ensures it runs only once

    return (
        <div>
          <h1>Scent Sense Results</h1>
          <button style={{backgroundColor:"lightGreen"}} onClick={handleGoToSearch}>Go To Search!</button>
          <button style={{backgroundColor:"lightGreen"}} onClick={handleGoToProfile}>Go To Profile!</button>
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {results && results.length > 0 ? (
            <div>
              <h2>Response Data:</h2>
              <ul>
                {results.map((result, index) => (
                  <li key={index}>
                    <p><strong>Perfume Name:</strong> {result.Name}</p>
                    <p><strong>Brand:</strong> {result.Brand}</p>
                    <p><strong>Match Score:</strong> {result.MatchScore }</p>
                    <button onClick={() => showDupes(result.PerfumeID)}>Show Dupes</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            !isLoading && <p>No data found</p>
          )}
          {isModalOpen && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h2>Duplicate Results</h2>
                        {modalData && modalData.length > 0 ? (
                            <ul>
                                {modalData.map((dupe, index) => (
                                    <li key={index}>
                                        <p><strong>Dupe Name:</strong> {dupe.DupePerfumeName}</p>
                                        <p><strong>Dupe Price:</strong> {dupe.Price2}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No dupes found.</p>
                        )}
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
      );
    };

    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modal: {
            background: '#fff',
            padding: '20px',
            borderRadius: '5px',
            width: '80%',
            maxWidth: '500px',
            maxHeight: '80vh', // Limit the modal's height
            overflowY: 'auto', // Enable vertical scrolling
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
        },
    };
    

export default Results;