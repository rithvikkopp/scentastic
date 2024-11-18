import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const homepage = ({ switchToLogin }) => {
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
  
  return (
    <div>
        <UpdateComponent/>
        <DeleteComponent/>
    </div>
  );
};

export default Homepage;
