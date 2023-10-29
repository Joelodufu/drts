import React, { useState } from "react";
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { postLicenseApplication } from "./licenseService";
import FileUpload from "./fileUpload";
import DocumentUploader from "./../../driverslicence/components/documentUploadForm";
const user = JSON.parse(localStorage.getItem("user"));

const columns = ["licenseType", "Expiry", "action"];
const columnLabels = ["License Type", "Expiry Date", "Renew Action"];

const LicenseTable = () => {
  const [licenses, setLicenses] = useState(generateDummyLicenses());
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(columns[0]);
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [renewDialogOpen, setRenewDialogOpen] = useState(false);
  const [applyForNewLicenseDialogOpen, setApplyForNewLicenseDialogOpen] =
    useState(false);

  const [newLicenseForm, setNewLicenseForm] = useState({
    fullName: "",
    dateofBirth: new Date(),
    user: user._id,
    gender: "male",
    nationality: "",
    bloodGroup: "",
    nationalIDNumber: "",
    address: "",
    phoneNumber: "",
    email: "",
    nextOfKinsAddress: "",
    processingCenter: "",
    licenseType: "",
    paymentMethod: "",
  });

  const [showFileUploadDialog, setShowFileUploadDialog] = useState(false);

  // const handleApplyForNewLicenseDialogClose = async () => {
  //   setApplyForNewLicenseDialogOpen(false);
  //   setShowFileUploadDialog(true); // Show the file upload dialog
  // };

  const handleFileUploadDialogClose = () => {
    setShowFileUploadDialog(false);
  };

  const handleDocumentsUploaded = (documentUrls) => {
    // Handle the document URLs and send a PATCH request to the server
    console.log("Document URLs:", documentUrls);
    // Perform any additional actions here
    setShowFileUploadDialog(false);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  function generateDummyLicenses() {
    const licenseTypes = [
      "Type A (Motorcycle)",
      "Type B (Tricycle)",
      "Type C (Cars)",
      "Type D (Trucks)",
      "Type E (Heavy Machines)",
    ];
    const licenses = [];
    for (let i = 1; i <= 50; i++) {
      const license = {
        licenseType: licenseTypes[i % 3],
        Expiry: "2023-12-31",
      };
      licenses.push(license);
    }
    return licenses;
  }

  const handleRenewDialogOpen = (license) => {
    setSelectedLicense(license);
    setRenewDialogOpen(true);
  };

  const handleRenewDialogClose = () => {
    setRenewDialogOpen(false);
    setSelectedLicense(null);
  };

  const handleRenewAction = () => {
    console.log("Renewing license:", selectedLicense);
    handleRenewDialogClose();
  };

  const handleApplyForNewLicense = () => {
    setApplyForNewLicenseDialogOpen(true);
  };

  const handleApplyForNewLicenseDialogClose = async () => {
    setApplyForNewLicenseDialogOpen(false);
    // Call the postLicenseApplication function to submit the form data
    try {
      const response = await postLicenseApplication(newLicenseForm);
      console.log("License application submitted successfully:", response);
    } catch (error) {
      // Handle errors
      console.error("Failed to submit license application:", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewLicenseForm({
      ...newLicenseForm,
      [name]: value,
    });
  };

  const handleDateOfBirthChange = (date) => {
    setNewLicenseForm({
      ...newLicenseForm,
      dateofBirth: date,
    });
  };

  return (
    <Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <Typography variant="h6" component="div">
          License Table
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyForNewLicense}
        >
          Apply for New License
        </Button>
      </div>
      <div>
        <TextField
          fullWidth
          label="Search"
          InputProps={{
            startAdornment: <Search />,
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer
          style={{ maxHeight: "50vh", width: "100%", overflowY: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columnLabels.map((label, index) => (
                  <TableCell
                    key={columns[index]}
                    sortDirection={orderBy === columns[index] ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === columns[index]}
                      direction={orderBy === columns[index] ? order : "asc"}
                      onClick={() => handleRequestSort(columns[index])}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {licenses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((license, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>{license[column]}</TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleRenewDialogOpen(license)}
                      >
                        Renew
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={licenses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
        />
      </div>
      <Dialog open={renewDialogOpen} onClose={handleRenewDialogClose}>
        <DialogTitle>Renew License</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Do you want to renew the {selectedLicense?.licenseType} license?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenewAction} color="primary">
            Renew
          </Button>
          <Button onClick={handleRenewDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={applyForNewLicenseDialogOpen}
        onClose={handleApplyForNewLicenseDialogClose}
      >
        <DialogTitle>Apply for New License</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={newLicenseForm.fullName}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            name="dateofBirth"
            value={newLicenseForm.dateofBirth}
            onChange={handleFormChange}
          />
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={newLicenseForm.gender}
              onChange={handleFormChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Nationality"
            name="nationality"
            value={newLicenseForm.nationality}
            onChange={handleFormChange}
          />
          <FormControl fullWidth>
            <InputLabel>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={newLicenseForm.bloodGroup}
              onChange={handleFormChange}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="National ID Number"
            name="nationalIDNumber"
            value={newLicenseForm.nationalIDNumber}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={newLicenseForm.address}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            value={newLicenseForm.phoneNumber}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={newLicenseForm.email}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            label="Next of Kin Address"
            name="nextOfKinsAddress"
            value={newLicenseForm.nextOfKinsAddress}
            onChange={handleFormChange}
          />
          <FormControl fullWidth>
            <InputLabel>Processing Center</InputLabel>
            <Select
              name="processingCenter"
              value={newLicenseForm.processingCenter}
              onChange={handleFormChange}
            >
              <MenuItem value="Center A">Center A</MenuItem>
              <MenuItem value="Center B">Center B</MenuItem>
              <MenuItem value="Center C">Center C</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>License Type</InputLabel>
            <Select
              name="licenseType"
              value={newLicenseForm.licenseType}
              onChange={handleFormChange}
            >
              <MenuItem value="a">{"A Motorcycle"}</MenuItem>
              <MenuItem value="b">{"B Tricycles"}</MenuItem>
              <MenuItem value="c">{"C Cars"}</MenuItem>
              <MenuItem value="d">{"D Truck"}</MenuItem>
              <MenuItem value="e">{"E Heavy Machines"}</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select
              name="paymentMethod"
              value={newLicenseForm.paymentMethod}
              onChange={handleFormChange}
            >
              <MenuItem value="RRR">RRR</MenuItem>
              <MenuItem value="Bank">Bank</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
            </Select>
          </FormControl>
          <DocumentUploader />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApplyForNewLicenseDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApplyForNewLicenseDialogClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showFileUploadDialog} onClose={handleFileUploadDialogClose}>
        <DialogTitle>Upload Documents</DialogTitle>
        <DialogContent>
          {/* Render the FileUpload component here and pass the callback function */}
          <FileUpload onDocumentsUploaded={handleDocumentsUploaded} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFileUploadDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default LicenseTable;
