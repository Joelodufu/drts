// signupServices.js
export async function submitSignupForm(data) {
  try {
    // Replace the URL with your actual API endpoint.
    const response = await fetch(
      "https://drts-server.onrender.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 201) {
      return true; // Success
    } else {
      return false; // Error
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    return false;
  }
}
