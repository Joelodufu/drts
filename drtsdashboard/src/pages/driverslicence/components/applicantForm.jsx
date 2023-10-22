import React, { useState } from "react";
import * as licenseServices from "../services/licenseServices";

import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Container,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
const useStyle = makeStyles((theme) => ({
  root: {
    margin: "10px",
  },
  label: {
    textTransform: "none",
  },

  buttonDiv: {
    display: "flex",
    width: "100px",
    justifyContent: "space-between",
  },

  downButton: {
    margin: "5px",
    width: "50%",
  },
}));

const ApplicantForm = () => {
  const classes = useStyle();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "male",
    nationality: "",
    bloodGroup: "",
    nationalID: "",
    address: "",
    phoneNumber: "",
    email: "",
    nextOfKinsAddress: "",
    processingCenter: "",
    licenseType: "",
    paymentMethod: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Log the form data to the console
    console.log(formData);
  };

  const handleReset = () => {
    // Reset the form data
    setFormData({
      fullName: "",
      dateOfBirth: "",
      gender: "male",
      nationality: "",
      bloodGroup: "",
      nationalID: "",
      address: "",
      phoneNumber: "",
      email: "",
      nextOfKinsAddress: "",
      processingCenter: "",
      licenseType: "",
      paymentMethod: "",
    });
  };

  return (
    <React.Fragment>
      <form>
        <Grid container spacing={1}>
          <Grid item sm={6}>
            <FormControl className={classes.root} fullWidth variant="outlined">
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </FormControl>{" "}
            <FormControl className={classes.root} fullWidth>
              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.root} fullWidth>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <FormControl className={classes.root} fullWidth>
              <TextField
                label="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.root} fullWidth>
              <TextField
                label="Blood Group"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.root} fullWidth>
              <TextField
                label="National ID Number"
                name="nationalID"
                value={formData.nationalID}
                onChange={handleInputChange}
              />
            </FormControl>{" "}
            <FormControl className={classes.root} fullWidth>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <FormControl className={classes.root} fullWidth>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </FormControl>{" "}
            <FormControl className={classes.root} fullWidth>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </FormControl>{" "}
            <FormControl className={classes.root} fullWidth>
              <TextField
                label="Next Of Kins Address"
                name="nextOfKinsAddress"
                value={formData.nextOfKinsAddress}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl className={classes.root} fullWidth>
              <InputLabel>Processing Center</InputLabel>
              <Select
                name="processingCenter"
                label="Processing Center"
                value={formData.processingCenter}
                onChange={handleInputChange}
              >
                {licenseServices.getLicenseCenters().map((item) => (
                  <MenuItem key={item.id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>{" "}
            <FormControl className={classes.root} fullWidth>
              <InputLabel>License Type</InputLabel>
              <Select
                name="licenseType"
                value={formData.licenseType}
                onChange={handleInputChange}
              >
                {licenseServices.getLicenseCollections().map((item) => (
                  <MenuItem key={item.id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.root} fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                {licenseServices.getPaymentMethord().map((item) => (
                  <MenuItem key={item.id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <div className={classes.buttonDiv}>
            <Button
              className={classes.downButton}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              className={classes.downButton}
              fullWidth
              variant="outlined"
              color="primary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default ApplicantForm;
