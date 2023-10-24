// FileUpload.js

import React, { useState } from "react";
import { Grid, Button, Container, Typography, Divider } from "@mui/material";

const FileUpload = ({ onDocumentsUploaded }) => {
  const [selectedDocuments, setSelectedDocuments] = useState({
    Passport: null,
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

  const uploadFileToStorage = (file) => {
    // Implement the logic to upload files to Google Storage and return the URL
    return new Promise((resolve, reject) => {
      // Simulated upload with a delay
      setTimeout(() => {
        const url = `https://example.com/${file.name}`;
        resolve(url);
      }, 2000);
    });
  };

  const uploadToGoogleStorage = () => {
    const documentUrls = {};
    const uploadPromises = [];
    Object.entries(selectedDocuments).forEach(([documentName, file]) => {
      if (file) {
        const uploadPromise = uploadFileToStorage(file);
        uploadPromises.push(uploadPromise);
        uploadPromise.then((url) => {
          documentUrls[documentName] = url;
        });
      }
    });

    Promise.all(uploadPromises)
      .then(() => {
        onDocumentsUploaded(documentUrls);
      })
      .catch((error) => {
        console.error("Failed to upload documents:", error);
      });
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

export default FileUpload;
