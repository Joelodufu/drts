import React, { useState } from "react";
import axios from "axios";
import { Grid, Button, Container, Typography, Divider } from "@mui/material";
import { useDropzone } from "react-dropzone";

const DocumentUploader = () => {
  const [selectedDocuments, setSelectedDocuments] = useState({
    Pasport: null,
    "National Id": null,
    "Utility Bill": null,
    "Eye Test Certificate": null,
    "Drivers Permit": null,
  });

  const onDrop = (acceptedFiles, documentName) => {
    setSelectedDocuments({
      ...selectedDocuments,
      [documentName]: acceptedFiles[0],
    });
  };

  const uploadToGoogleStorage = () => {
    // Implement the logic to upload files to Google Storage and send URLs to the server here
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Document Upload Form
      </Typography>
      {Object.entries(selectedDocuments).map(([documentName, file]) => (
        <div key={documentName}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={documentName}
                    width="100"
                    height="100"
                    style={{ marginRight: "16px" }}
                  />
                ) : (
                  <div>No {documentName}</div>
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  document.getElementById(documentName).click();
                }}
              >
                Select {documentName}
              </Button>
              <input
                type="file"
                accept="image/*,application/pdf"
                id={documentName}
                style={{ display: "none" }}
                onChange={(e) => onDrop(e.target.files, documentName)}
              />
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
        </div>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={uploadToGoogleStorage}
        disabled={Object.values(selectedDocuments).some((file) => !file)}
      >
        Upload Documents
      </Button>
    </Container>
  );
};

export default DocumentUploader;
