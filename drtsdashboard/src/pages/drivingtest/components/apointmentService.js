// TestAppointmentController.js

const API_BASE_URL = "http://localhost:5000/api";

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

export const fetchUserData = async (applicationIds) => {
  try {
    const userDataPromises = applicationIds.map((applicationId) =>
      fetch(`${API_BASE_URL}/license/${applicationId}`).then((response) =>
        response.json()
      )
    );

    const userData = await Promise.all(userDataPromises);
    console.log(userData);
    return userData;
  } catch (error) {
    // Handle errors
    console.error("Error fetching user data:", error);
    return [];
  }
};
