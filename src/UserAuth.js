import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserAuth = ({ switchToLogin }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleCancelUserId = () => setUserId("");
  const handleCancelPassword = () => setPassword("");
  const handleCancelFirstName = () => setFirstName("");
  const handleCancelLastName = () => setLastName("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      userId,      // From state
      firstName,   // From state
      lastName,    // From state
      password,    // From state
    };
  
    try {
      const response = await axios.post('http://localhost:5000', userData);
      alert(response.data); // Success message
      navigate('/homepage');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
    
  
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Left Half */}
      <Grid item xs={12} md={6} style={{ background: "#D1F1ED", padding: "2rem" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <h1 style={{ fontWeight: "lighter" }}>Sign Up</h1>
          
          <TextField
            label="User ID"
            type="text"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CancelOutlinedIcon onClick={handleCancelUserId} cursor="pointer" />
                </InputAdornment>
              ),
            }}
            value={userId}
            onChange={handleUserIdChange}
            fullWidth
            margin="normal"
            required
            size="small"
            style={{ background: "#E6E0E9", width: "60%" }}
          />
          
          <TextField
            label="First Name"
            type="text"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CancelOutlinedIcon onClick={handleCancelFirstName} cursor="pointer" />
                </InputAdornment>
              ),
            }}
            value={firstName}
            onChange={handleFirstNameChange}
            fullWidth
            margin="normal"
            required
            size="small"
            style={{ background: "#E6E0E9", width: "60%" }}
          />
          
          <TextField
            label="Last Name"
            type="text"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CancelOutlinedIcon onClick={handleCancelLastName} cursor="pointer" />
                </InputAdornment>
              ),
            }}
            value={lastName}
            onChange={handleLastNameChange}
            fullWidth
            margin="normal"
            required
            size="small"
            style={{ background: "#E6E0E9", width: "60%" }}
          />

          <TextField
            label="Password"
            type="password"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CancelOutlinedIcon onClick={handleCancelPassword} cursor="pointer" />
                </InputAdornment>
              ),
            }}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            required
            size="small"
            style={{ background: "#E6E0E9", width: "60%" }}
          />
          
          <Button
            variant="contained"
            type="submit"
            style={{
              background: "none",
              border: "2px solid #49454F",
              color: "#49454F",
              borderRadius: "10px",
              height: "30px",
              fontSize: "10px",
            }}
          >
            Continue
          </Button>
          <hr style={{ border: "none", height: "2px", backgroundColor: "#D0BCFF", width: "70%" }} />
          <Button
            variant="contained"
            style={{
              background: "none",
              border: "2px solid #49454F",
              color: "#49454F",
              borderRadius: "10px",
              height: "30px",
              fontSize: "10px",
            }}
          >
            Sign Up With Google
          </Button>
        </form>
      </Grid>

      {/* Right Half */}
      <Grid item xs={12} md={6} style={{ background: "#3B9B99", color: "white", textAlign: "center", padding: "2rem" }}>
        <div style={{ marginTop: "20%" }}>
          <h2>Welcome to Scentastic!</h2>
          <p>Already have an account?</p>
          <Button
            onClick={() => (window.location.href = "/login")}
            variant="contained"
            style={{
              background: "none",
              border: "1px solid #FFFFFF",
              color: "#FFFFFF",
              borderRadius: "10px",
              height: "30px",
              fontSize: "10px",
            }}
          >
            Log in
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default UserAuth;
