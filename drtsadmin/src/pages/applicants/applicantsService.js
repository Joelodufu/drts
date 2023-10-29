const BASE_URL = "https://drts-server.onrender.com";

export async function fetchAccessors() {
  try {
    const response = await fetch(`${BASE_URL}/api/accessors`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch accessors data. Status: ${response.status}`
      );
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      console.log(data);
      return data;
    } else {
      throw new Error("Invalid data format received from the server.");
    }
  } catch (error) {
    console.error("Error fetching accessors:", error);
    throw error;
  }
}

export async function getApplicants() {
  try {
    const response = await fetch(`${BASE_URL}/api/license`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch applicants data. Status: ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);
    if (Array.isArray(data)) {
      return data; // Assuming the response is an array of objects
    } else {
      throw new Error("Invalid data format received from the server.");
    }
  } catch (error) {
    console.error("Error fetching applicants:", error);
    throw error;
  }
}

export async function bookTestForUser(userId, bookingDetails) {
  console.log({ userId: bookingDetails });
}
