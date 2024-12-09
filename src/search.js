import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dupeData, setDupeData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inspirationData, setInspirationData] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.put("http://localhost:5000/search", { name: searchQuery });

      const normalizedResults = Array.isArray(response.data)
        ? response.data
        : [response.data];
      console.log(response.data);
  
      setResults(normalizedResults); 
    } catch (err) {
      setError(err.response?.data || "An error occurred while searching.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleInspirationClick = async () => {
    try {
      const response = await axios.get("http://localhost:5000/top-reviewer-notes"); 
      setInspirationData(response.data); 
      setIsModalOpen(true); 
    } catch (err) {
      console.error("Error fetching inspiration data:", err);
      setError("Error fetching inspiration data.");
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (results.length > 0) {
      const fetchAdditionalData = async () => {
        try {
          const dataPromises = results.map((result) =>
            axios.put(`http://localhost:5000/dupes`, { id: result.PerfumeID })
          );
      
          const responses = await Promise.all(dataPromises);
      
          console.log('Raw responses:', responses);
      
          const newData = responses.reduce((acc, response, index) => {
            // Extract only the first array from the response
            console.log('avg price ', response);
            const avgDupePrice = response?.data?.[0]?.[0]?.AvgDupePrice || null; // Get AvgDupePrice safely
            acc[results[index].PerfumeID] = avgDupePrice;
            // console.log('avg price ', avgDupePrice);
            return acc;
          }, {});
      
          console.log('Processed new data:', newData);
          setDupeData(newData);
        } catch (err) {
          console.error("Error fetching additional data:", err);
        }
      };

      fetchAdditionalData();
    }
  }, [results]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Search Perfumes</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter perfume name or notes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{ padding: "10px", width: "100%" }}>
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}


      <button
        onClick={handleInspirationClick}
        style={{ padding: "10px", width: "100%", marginTop: "20px" }}
      >
        Need some inspiration?
      </button>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <h2>Top Reviewers' Most Common Notes</h2>
            {inspirationData ? (
              <ul>
                {inspirationData.map((note, index) => (
                  <li key={index} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                    <strong>{note.Note}</strong> - Count: {note.NoteCount}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No inspiration data available</p>
            )}
            <button onClick={closeModal} style={{ marginTop: "20px", padding: "10px" }}>
              Close
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
  {results.length > 0 ? (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {results.map((perfume, index) => (
        <li
          key={index}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <strong>{perfume.Name}</strong>
          <p>{perfume.Price}</p>
          {dupeData[perfume.PerfumeID] ? (
              <p>
                <em>Average Dupe Price: {dupeData[perfume.PerfumeID]}</em>
              </p>
            ) : (
              <p>Average Dupe Price: No Dupe Data for Perfume</p>
            )}
        </li>
      ))}
    </ul>
  ) : (
    !isLoading && <p>No results found</p>
  )}
</div>

    </div>
  );
};

export default Search;
