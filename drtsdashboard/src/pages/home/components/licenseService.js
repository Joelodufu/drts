// licenseService.js

// A mock URL for the license service API. Replace this with your actual backend API URL.
const API_URL = "http://localhost:5000/api";

// Function to post the form input to the backend
export const postLicenseApplication = async (licenseData) => {
  try {
    // Define the required fields
    const requiredFields = [
      "fullName",
      "dateofBirth",
      "gender",
      "nationality",
      "bloodGroup",
      "nationalIDNumber",
      "address",
      "phoneNumber",
      "email",
      "nextOfKinsAddress",
      "proccessingCenter",
      "licenseType",
      "paymentMethod",
      "passport",
      "legalID",
      "proofOfAddress",
      "eyeTestCeritificate",
      "driversPermit",
    ];

    // Map the provided data to the required fields, filling in missing fields with empty strings
    const requestData = requiredFields.reduce((data, field) => {
      data[field] = licenseData[field] || "";
      return data;
    }, {});

    const response = await fetch(`${API_URL}/license`, {
      method: "POST",
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      // Handle errors, e.g., by throwing an exception or returning an error message
      throw new Error(
        `Failed to post license application: ${response.statusText}`
      );
    }

    // Return the response data if needed
    console.log(response);
    return await response.json();
  } catch (error) {
    // Handle errors, e.g., by logging or returning an error message
    console.error("Failed to post license application:", error);
    throw error;
  }
};
