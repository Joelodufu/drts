// newApplicationController.js

const API_BASE_URL = "http://localhost:5000/api/license/user";
import BASE_URL from "../../../service/config";

export async function fetchApplications() {
  try {
    // Retrieve the user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user._id) {
      throw new Error("User ID not found in local storage");
    }

    // Construct the API URL with the user ID as a request parameter
    const apiUrl = `${BASE_URL}/${user._id}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
