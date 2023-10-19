import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import * as licenseServices from "../services/licenseServices";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import { useForm, Form } from "./useForm";
import Controls from "./controls/controls";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const initialValues = {
  id: "",
  fullName: "",
  dateofBirth: "",
  gender: "",
  nationality: "",
  bloodGroup: "",
  nationalIDNumber: "",
  address: "",
  phoneNumber: "",
  email: "",
  nextOfKinsAddress: "",
  proccessingCenter: "",
  licenseType: "",
  paymentMethod: "",
  passport: "",
  legalID: "",
  proofOfAddress: "",
  eyeTestCeritificate: "",
  driversPermit: "",
};

export default function ApplicationForm() {
  const { values, setValues, handleInput } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    window.alert(values.JSON.stringify());
    licenseServices.insertLicense(values);
    window.alert("testiing");
  };
  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Application Form
        </Typography>
        <Grid container spacing={1}>
          <Grid item sm={6}>
            <Controls.Input
              required
              label="Full Name"
              name="fullName"
              autoComplete="given-name"
              value={values.fullName}
              onChange={handleInput}
              variant="outlined"
            />
            <Controls.PickDate
              label="Date Of Birth"
              name="dateOfBirth"
              value={values.dateofBirth}
              onChange={handleInput}
            />

            <Controls.Input
              required
              label="Nationality"
              autoComplete="nationality"
              name="nationality"
              variant="outlined"
              onChange={handleInput}
              value={values.nationality}
            />

            <Controls.Input
              required
              label="NIN"
              autoComplete="nin"
              name="nationalIDNumber"
              variant="outlined"
              onChange={handleInput}
              value={values.nationalIDNumber}
            />
            <Controls.Input
              required
              label="Phone Number"
              onChange={handleInput}
              autoComplete="phone"
              name="phoneNumber"
              variant="outlined"
              value={values.phoneNumber}
            />

            <Controls.Input
              required
              label="Residential Address"
              onChange={handleInput}
              autoComplete="address"
              name="address"
              variant="outlined"
              value={values.address}
            />

            <Controls.RadioGroup
              name="gender"
              label="Gender"
              value={values.gender}
              onChange={handleInput}
              items={genderItems}
            />
          </Grid>
          <Grid item sm={6}>
            <Controls.MySelect
              name="proccessingCenter"
              label="Proccessing Center"
              value={values.proccessingCenter}
              onChange={handleInput}
              options={licenseServices.getLicenseCenters()}
            />
            <Controls.MySelect
              name="licenseType"
              label="License Type"
              value={values.licenseType}
              onChange={handleInput}
              options={licenseServices.getLicenseCollections()}
            />
            <Controls.MySelect
              name="paymentMethod"
              label="Payment Methord"
              value={values.paymentMethod}
              onChange={handleInput}
              options={licenseServices.getPaymentMethord()}
            />

            <FormControl>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Passport
                <VisuallyHiddenInput type="file" />
              </Button>
            </FormControl>
            <FormControl>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Driving School Certificate
                <VisuallyHiddenInput type="file" />
              </Button>
            </FormControl>
            <FormControl>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Utility Reciept <VisuallyHiddenInput type="file" />
              </Button>
            </FormControl>
            <FormControl>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Eye Test Certificate
                <VisuallyHiddenInput type="file" />
              </Button>
            </FormControl>
          </Grid>
        </Grid>
        <div>
          <Controls.MyButton type="submit" text="Submit" />
          <Controls.MyButton
            variant="outlined"
            value="outlined"
            type="reset"
            text="Reset"
          />
        </div>
      </Form>
    </React.Fragment>
  );
}
