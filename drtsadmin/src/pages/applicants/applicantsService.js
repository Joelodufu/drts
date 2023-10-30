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
export async function fetchLocations() {
  try {
    const response = await fetch(`${BASE_URL}/api/location`);
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

export async function bookTestForUser(user, applicantId, bookingDetails) {
  const requestData = {
    user, // User ID
    applicantId,
    ...bookingDetails,
  };
  console.log(requestData);
  try {
    // Define the endpoint URL for booking tests

    const response = await fetch(`${BASE_URL}/api/testSchedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content type
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Failed to book the test. Status: ${response.status}`);
    }

    //delete the instance of application after creating the booking
    await fetch(`${BASE_URL}/api/license/${applicantId}`, {
      method: "DELETE",
    }).then((response) => window.location.reload());

    // Handle the response from the server, if needed
    const data = await response.json();
    // Optionally, you can perform actions with the response data

    return data;
  } catch (error) {
    console.error("Failed to book the test:", error);
    throw error;
  }
}
