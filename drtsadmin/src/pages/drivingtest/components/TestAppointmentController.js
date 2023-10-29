// TestAppointmentController.js

const API_BASE_URL = "https://drts-server.onrender.com/api";

export const fetchTestAppointments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/testSchedules`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Handle HTTP error status
      console.error("Error fetching test appointments:", response.status);
      return [];
    }
  } catch (error) {
    // Handle other errors (e.g., network issues)
    console.error("Error fetching test appointments:", error);
    return [];
  }
};
