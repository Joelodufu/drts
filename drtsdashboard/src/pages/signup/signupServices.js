// signupServices.js
export async function submitSignupForm(data) {
  try {
    // Replace the URL with your actual API endpoint.
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      return { success: true }; // Success
    } else {
      // Parse and return the error message from the server
      const errorData = await response.json();
      return { success: false, error: errorData.message };
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
