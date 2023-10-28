// signinServices.js
export async function submitSignInForm(data) {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      const token = responseData.token; // Assuming the server sends a 'token' field

      // Store the token in local storage
      localStorage.setItem("token", token);

      return true; // Login success
    } else {
      return false; // Login failed
    }
  } catch (error) {
    console.error("Error submitting login form:", error);
    return false;
  }
}
