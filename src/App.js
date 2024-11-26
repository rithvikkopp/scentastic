import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserAuth from "./UserAuth.js"; // Replace with the correct path
import UserAuthLogin from "./UserAuthLogin.js"; // Replace with the correct path
import Homepage from "./homePage.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserAuth switchToLogin={() => window.location.href = "/login"} />} />
        <Route path="/login" element={<UserAuthLogin switchToSignup={() => window.location.href = "/"} />} />
        <Route path="/homepage" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
};

export default App;
