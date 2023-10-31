import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Avatar,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAccessors } from "./AccessorService"; // Update the import path to match your project structure

function AccessorTable() {
  const [accessors, setAccessors] = useState([]);
  const [selectedAccessor, setSelectedAccessor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedAccessor, setEditedAccessor] = useState({});

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleRowClick = (accessor) => {
    setSelectedAccessor(accessor);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setIsEditing(false);
  };

  useEffect(() => {
    // Fetch accessors when the component is mounted
    getAccessors()
      .then((data) => {
        setAccessors(data);
      })
      .catch((error) => {
        console.error("Error fetching accessors:", error);
      });
  }, []);

  const handleEditClick = (accessor) => {
    setEditedAccessor(accessor);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditedAccessor((prevAccessor) => ({
      ...prevAccessor,
      [name]: value,
    }));
  };

  const handleSaveClick = (accessorId, payload) => {
    // Send a PATCH request to update the editedAccessor on the server
    // Implement the PATCH request logic here
    const url = `https://drts-server.onrender.com/api/accessors/${accessorId}`;

    // Define the headers for the request (if needed)
    const headers = {
      "Content-Type": "application/json", // Adjust the content type if necessary
      // Add any other headers if needed
    };

    // Create the PATCH request
    fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify(payload), // Convert the payload data to a JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response as JSON if needed
      })
      .then((responseData) => {
        setIsEditing(false);
        setOpenDialog(false);
        console.log(
          "PATCH request successful, and the response is:",
          responseData
        );
        // You can add additional logic here, such as updating the UI
      })
      .catch((error) => {
        console.error("Error while sending the PATCH request:", error);
        // Handle errors here
      });
    // After successfully updating the server, close the dialog and reset the states
  };

  const handleDeleteClick = (accessor) => {
    setDeleteTarget(accessor);
    setOpenDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = (accessor) => {
    // Send a DELETE request to delete the selected row on the server
    // Implement the DELETE request logic here

    // After successfully deleting the row on the server, update the local state
    setAccessors((prevAccessors) =>
      prevAccessors.filter((accessor) => accessor._id !== deleteTarget._id)
    );

    // Reset the delete target and close the confirmation dialog
    setDeleteTarget(null);
    setOpenDeleteConfirmation(false);
  };

  return (
    <Paper>
      <div>
        <Typography variant="h4" gutterBottom>
          Accessor Table
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <PersonIcon /> Name
              </TableCell>
              <TableCell>
                <LocationOnIcon /> Active Status
              </TableCell>
              <TableCell>
                <PhoneIcon /> Phone
              </TableCell>
              <TableCell>
                <EmailIcon /> Email
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accessors.map((accessor) => (
              <TableRow key={accessor._id}>
                <TableCell>
                  <Button
                    variant="text"
                    onClick={() => handleRowClick(accessor)}
                  >
                    {accessor.name}
                  </Button>
                </TableCell>
                <TableCell>{accessor.activStatus}</TableCell>
                <TableCell>{accessor.phone}</TableCell>
                <TableCell>{accessor.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteClick(accessor)}
                  >
                    <DeleteIcon />
                  </Button>
                  {isEditing ? (
                    <Button variant="outlined" color="primary">
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEditClick(accessor)}
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        {selectedAccessor && (
          <>
            <DialogTitle>Accessor Details</DialogTitle>
            <DialogContent>
              <Paper
                elevation={3}
                style={{ padding: "20px", textAlign: "center" }}
              >
                {isEditing ? (
                  <form>
                    <TextField
                      name="name"
                      label="Name"
                      value={editedAccessor.name}
                      onChange={handleFormChange}
                    />
                    <TextField
                      name="activStatus"
                      label="Active Status"
                      value={editedAccessor.activStatus}
                      onChange={handleFormChange}
                    />
                    <TextField
                      name="phone"
                      label="Phone"
                      value={editedAccessor.phone}
                      onChange={handleFormChange}
                    />
                    <TextField
                      name="email"
                      label="Email"
                      value={editedAccessor.email}
                      onChange={handleFormChange}
                    />
                    <TextField
                      name="address"
                      label="Address"
                      value={editedAccessor.address}
                      onChange={handleFormChange}
                    />
                  </form>
                ) : (
                  <>
                    <Avatar
                      alt={selectedAccessor.name}
                      src={selectedAccessor.image}
                    />
                    <Typography variant="h6" gutterBottom>
                      {selectedAccessor.name}
                    </Typography>
                    <Typography>
                      <LocationOnIcon /> {selectedAccessor.activStatus}
                    </Typography>
                    <Typography>
                      <PhoneIcon /> {selectedAccessor.phone}
                    </Typography>
                    <Typography>
                      <EmailIcon /> {selectedAccessor.email}
                    </Typography>
                    <Typography>
                      <LocationOnIcon /> {selectedAccessor.address}
                    </Typography>
                  </>
                )}
              </Paper>
            </DialogContent>
            <DialogActions>
              {isEditing ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    handleSaveClick(selectedAccessor._id, editedAccessor)
                  }
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditClick(selectedAccessor)}
                >
                  Edit
                </Button>
              )}
              <Button onClick={handleDialogClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={openDeleteConfirmation} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this accessor?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default AccessorTable;
