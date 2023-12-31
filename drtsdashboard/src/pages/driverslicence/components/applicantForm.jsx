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
    dateofBirth: "",
    gender: "male",
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
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  function generateDummyLicenses() {
    const licenseTypes = ["motorcycle", "car", "truck"];
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

  const handleApplyForNewLicenseDialogClose = () => {
    setApplyForNewLicenseDialogOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewLicenseForm({
      ...newLicenseForm,
      [name]: value,
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
          {/* Add the rest of the form fields here */}
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
    </Paper>
  );
};

export default LicenseTable;
