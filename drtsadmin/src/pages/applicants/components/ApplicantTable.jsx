import React, { useState, useEffect } from "react";
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Box, // Import Box for styling
} from "@mui/material";
import { Search } from "@mui/icons-material";
import getApplicants from "../applicantsService";

const columns = ["fullName", "licenseType", "dateofBirth", "email"];
const columnLabels = ["Full Name", "License Type", "Date Of Birth", "Email"];

const ApplicantTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState(columns[0]);
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrderBy(property);
    setOrder(isAsc ? "desc" : "asc");
  };

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const data = await getApplicants();
        setApplicants(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchApplicants();
  }, []);

  const sortedData = applicants.slice().sort((a, b) => {
    const aValue = a[orderBy];
    const bValue = b[orderBy];
    const compareValue = aValue.localeCompare(bValue, undefined, {
      numeric: true,
      sensitivity: "base",
    });
    return order === "asc" ? compareValue : -compareValue;
  });

  const filteredData = sortedData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleApproveApplication = () => {
    // Add your logic to approve the application here
    // You can make an API call or perform any other necessary action
    // Then, close the dialog
    setSelectedApplicant(null);
  };

  const handleDisapproveApplication = () => {
    // Add your logic to disapprove the application here
    // You can make an API call or perform any other necessary action
    // Then, close the dialog
    setSelectedApplicant(null);
  };

  return (
    <Paper>
      <Typography variant="h6" component="div" style={{ padding: "16px" }}>
        Applicants
      </Typography>
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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column}>{row[column]}</TableCell>
                    ))}
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setSelectedApplicant(row)}
                      >
                        View
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <Dialog
        open={selectedApplicant !== null}
        onClose={() => setSelectedApplicant(null)}
      >
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
            </Grid>
          )}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            marginTop="16px"
            marginRight="16px"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleApproveApplication}
              style={{ marginRight: "16px" }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDisapproveApplication}
            >
              Disapprove
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedApplicant(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ApplicantTable;
