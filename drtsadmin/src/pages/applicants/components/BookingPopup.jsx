import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Grid,
} from "@mui/material";

const BookingPopup = ({ isOpen, onClose, onBook }) => {
  const [selectedAccessor, setSelectedAccessor] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBookTest = () => {
    // Call the onBook function with the selected data
    onBook(selectedAccessor, selectedLocation, selectedDate, selectedTime);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Book a Test</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Accessor</InputLabel>
              <Select
                value={selectedAccessor}
                onChange={(e) => setSelectedAccessor(e.target.value)}
              >
                <MenuItem value="Accessor 1">Accessor 1</MenuItem>
                <MenuItem value="Accessor 2">Accessor 2</MenuItem>
                <MenuItem value="Accessor 3">Accessor 3</MenuItem>
                {/* Add your accessor options here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <MenuItem value="Location 1">Location 1</MenuItem>
                <MenuItem value="Location 2">Location 2</MenuItem>
                <MenuItem value="Location 3">Location 3</MenuItem>
                {/* Add your location options here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="time"
              label="Time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBookTest} color="primary">
          Book
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingPopup;
