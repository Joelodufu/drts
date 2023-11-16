const API_BASE_URL = "http://localhost:5000/api";

// Function to fetch new applications data
export const fetchNewApplications = async () => {
  // Retrieve the user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user._id) {
    // Handle the case where user data or user ID is not found in localStorage
    console.error("User data or user ID not found in localStorage.");
    return [];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/license/user/${user._id}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Handle HTTP error status
      console.error("Error fetching new applications:", response.status);
      return [];
    }
  } catch (error) {
    // Handle other errors (e.g., network issues)
    console.error("Error fetching new applications:", error);
    return [];
  }
};
