import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Homepage = ({ switchToLogin }) => {
  const location = useLocation();
  const { state } = location || {};
  const [userData, setUserData] = useState(state || {});
  const navigate = useNavigate();

  const [newUserID, setNewUserId] = useState("");
  const [pass, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");

  const handleNewUserIDChange = (e) => setNewUserId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  // const handleFirstNameChange = (e) => setFirstName(e.target.value);
  // const handleLastNameChange = (e) => setLastName(e.target.value);

  // const handleCancelUserId = () => setUserId("");
  // const handleCancelPassword = () => setPassword("");
  // const handleCancelFirstName = () => setFirstName("");
  // const handleCancelLastName = () => setLastName("");
  
  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(userData);
    try {
      if (pass === userData.password) {
        const response = await axios.delete('http://localhost:5000/users', {
          params: {
            userId: userData.userId,
          },
        });
        alert(response.data);
        navigate('/', { state: userData });
      } else {
        alert("Incorrect password.");
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      if (pass == userData.password) {
        const updatedUserData = {
          ...userData,
          ["newUserID"]: newUserID,
          
        };
        const response = await axios.put('http://localhost:5000/users', updatedUserData);
        setUserData(prevData => ({
          ...prevData,
          userID: newUserID
        }));
        alert(response.data);
        navigate('/', { state: userData });
      } else {
        alert("Incorrect password.")
      }
      
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  };

  const handleGoToQuiz = () => {
    navigate('/quiz', { state: userData });
  }

  return (
    <div style={{height: "100vh", display:"flex", alignItems: "center",flexDirection:"column", justifyContent:"space-evenly"}}>
        {/* <UpdateComponent/> */}
        {/* <DeleteComponent/> */}
        <div style={{background:"#D1F1ED", display:"flex", flexDirection:"column"}}>
          <label>
            Enter your password to modify or delete your account:
            <input type="text" value={pass} onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div style={{display:"flex"}}>
          <h2>Enter your new username here:</h2>
          <input type="text" value={newUserID} onChange={handleNewUserIDChange}/>
          <button onClick={handleUpdate}>Update your Username</button>
        </div>
        
        <button style={{backgroundColor:"red"}} onClick={handleDelete}>Delete your Account</button>

        <button style={{backgroundColor:"green"}} onClick={handleGoToQuiz}>Take Quiz again!</button>
    </div>
  );
};

export default Homepage;
