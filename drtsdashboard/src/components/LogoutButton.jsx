// LogoutButton.js
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove user key from local storage
    localStorage.removeItem("user");

    // Redirect to the signin route
    history.push("/signin");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
