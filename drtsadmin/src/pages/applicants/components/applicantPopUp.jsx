import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";

const ApplicantPopup = ({
  selectedApplicant,
  onClose,
  onBookTest,
  onDisapprove,
}) => {
  return (
    <Dialog open={selectedApplicant !== null} onClose={onClose}>
      <DialogTitle>
        {selectedApplicant && selectedApplicant.fullName}
      </DialogTitle>
      <DialogContent>
        {selectedApplicant && (
          <Grid container spacing={2}>
            {Object.keys(selectedApplicant).map((key) => (
              <Grid item xs={12} md={6} key={key}>
                <p>
                  <strong>{key}:</strong> {selectedApplicant[key]}
                </p>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={onBookTest}>
                Book Test
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={onDisapprove}
              >
                Disapprove
              </Button>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplicantPopup;
