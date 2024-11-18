import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const UserAuthLogin = ({ switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCancelEmail = () => {
    setEmail("");
  };

  const handleCancelPassword = () => {
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the credentials as it's front-end only.
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      {/* Left side - Welcome message */}
      <Grid item xs={6} style={{ backgroundColor: '#3B9B99', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h4" align="center" style={{ fontWeight: 'lighter' }}>
          Welcome to Scentastic! <br />
          Don't have an account?
        </Typography>
        <Button
          onClick={switchToSignup}
          variant="contained"
          style={{
            background: 'none', 
            border: '1px solid #FFFFFF', 
            boxShadow: 'none', 
            color: '#FFFFFF', 
            borderRadius: '10px', 
            fontSize: '14px', 
            marginTop: '20px'
          }}
        >
          Sign Up
        </Button>
      </Grid>

      {/* Right side - Login Form */}
      <Grid item xs={6} style={{ backgroundColor: '#D1F1ED', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        
        <Typography variant="h4" style={{ fontWeight: 'lighter', margin: '20px 0' }}>
          Log In
        </Typography>
        
        <form onSubmit={handleSubmit} style={{ width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            label="Email"
            type="email"
            variant="filled"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            required
            size="small"
            style={{ background: '#E6E0E9', marginBottom: '20px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end"><CancelOutlinedIcon onClick={handleCancelEmail} cursor="pointer" /></InputAdornment>,
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
            required
            size="small"
            style={{ background: '#E6E0E9', marginBottom: '20px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end"><CancelOutlinedIcon onClick={handleCancelPassword} cursor="pointer" /></InputAdornment>,
            }}
          />
          <Button
            variant="contained"
            type="submit"
            style={{
              background: 'none',
              border: '2px solid #49454F',
              boxShadow: 'none',
              color: '#49454F',
              borderRadius: '10px',
              height: '30px',
              fontSize: '12px',
            }}
          >
            Continue
          </Button>
          <hr style={{ border: 'none', height: '2px', backgroundColor: '#D0BCFF', width: '70%', margin: '1%' }} />
          <Button
            variant="contained"
            style={{
              background: 'none',
              border: '2px solid #49454F',
              boxShadow: 'none',
              color: '#49454F',
              borderRadius: '10px',
              height: '30px',
              fontSize: '12px',
              marginBottom: '30px'
            }}
          >
            Log In With Google
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default UserAuthLogin;
