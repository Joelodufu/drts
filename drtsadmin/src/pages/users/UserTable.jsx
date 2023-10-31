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

function UserTable() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setIsEditing(false);
  };

  useEffect(() => {
    // Fetch users from the API endpoint
    fetch("https://drts-server.onrender.com/api/users")
      .then((response) => response.json())
      .then((data) => setUserList(data))
      .catch((error) => console.error("Error fetching users: ", error));
  }, []);

  const handleEditClick = (user) => {
    setEditedUser(user);
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveClick = (userId, payload) => {
    // Send a PATCH request to update the editedUser on the server
    // Implement the PATCH request logic here
    // You can replace this with your actual save logic

    setIsEditing(false);
    setOpenDialog(false);
    // Handle the save logic here
  };

  const handleDeleteClick = (user) => {
    setDeleteTarget(user);
    setOpenDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
    setOpenDeleteConfirmation(false);
  };

  const handleConfirmDelete = (user) => {
    // Send a DELETE request to delete the selected user on the server
    // Implement the DELETE request logic here
    fetch(`https://drts-server.onrender.com/api/users/${user._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
        // Add any additional headers if needed
      },
    });
    // After successfully deleting the user on the server, update the local state
    setUserList((prevUsers) =>
      prevUsers.filter((u) => u._id !== deleteTarget._id)
    );

    // Reset the delete target and close the confirmation dialog
    setDeleteTarget(null);
    setOpenDeleteConfirmation(false);
  };

  return (
    <Paper>
      <div>
        <Typography variant="h4" gutterBottom>
          User Table
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
                <LocationOnIcon /> Role
              </TableCell>
              <TableCell>
                <PhoneIcon /> Email
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Button variant="text" onClick={() => handleRowClick(user)}>
                    {user.firstName} {user.lastName}
                  </Button>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteClick(user)}
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
                      onClick={() => handleEditClick(user)}
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
        {selectedUser && (
          <>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
              <Paper
                elevation={3}
                style={{ padding: "20px", textAlign: "center" }}
              >
                {isEditing ? (
                  <form>
                    <TextField
                      name="firstName"
                      label="First Name"
                      value={editedUser.firstName}
                      onChange={handleFormChange}
                    />
                    <TextField
                      name="lastName"
                      label="Last Name"
                      value={editedUser.lastName}
                      onChange={handleFormChange}
                    />
                    <TextField
                      name="role"
                      label="Role"
                      value={editedUser.role}
                      onChange={handleFormChange}
                    />
                    <TextField
                      name="email"
                      label="Email"
                      value={editedUser.email}
                      onChange={handleFormChange}
                    />
                  </form>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom>
                      {selectedUser.firstName} {selectedUser.lastName}
                    </Typography>
                    <Typography>
                      <LocationOnIcon /> {selectedUser.role}
                    </Typography>
                    <Typography>
                      <EmailIcon /> {selectedUser.email}
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
                  onClick={() => handleSaveClick(selectedUser._id, editedUser)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditClick(selectedUser)}
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
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirmDelete(deleteTarget)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default UserTable;
