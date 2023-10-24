// applicantService.js

const africanNames = [
  "Kwame Appiah",
  "Nneka Eze",
  "Liyana Sow",
  "Moussa Diop",
  "Sadia Adedeji",
  // Include more diverse African names here
];

const generateRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const generateRandomLicenseType = () => {
  const types = ["Motorcycle", "Car", "Truck"];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
};

const generateRandomApplicants = (count) => {
  const applicants = [];
  for (let i = 0; i < count; i++) {
    const fullName =
      africanNames[Math.floor(Math.random() * africanNames.length)];
    const dateofBirth = generateRandomDate(
      new Date(1970, 0, 1),
      new Date(2003, 11, 31)
    ).toLocaleDateString();
    const gender = Math.random() < 0.5 ? "male" : "female";
    const nationality = "African"; // You can set the nationality as needed
    const bloodGroup = "O+"; // You can set the blood group as needed
    const nationalIDNumber = `ID-${Math.floor(Math.random() * 100000)}`;
    const address = "123 Main St, City";
    const phoneNumber = `+123456789${Math.floor(Math.random() * 1000)}`;
    const email = `email${i}@example.com`;
    const nextOfKinsAddress = "456 Park Ave, Town";
    const proccessingCenter = "Center A"; // You can set the processing center as needed
    const licenseType = generateRandomLicenseType();
    const paymentMethod = "Credit Card"; // You can set the payment method as needed
    const passport = "Passport123";
    const legalID = "LegalID456";
    const proofOfAddress = "AddressProof789";
    const eyeTestCeritificate = "EyeTestCertificate101";
    const driversPermit = `Permit-${Math.floor(Math.random() * 1000)}`;

    applicants.push({
      fullName,
      dateofBirth,
      gender,
      nationality,
      bloodGroup,
      nationalIDNumber,
      address,
      phoneNumber,
      email,
      nextOfKinsAddress,
      proccessingCenter,
      licenseType,
      paymentMethod,
      passport,
      legalID,
      proofOfAddress,
      eyeTestCeritificate,
      driversPermit,
    });
  }
  return applicants;
};

const simulateApiCall = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: generateRandomApplicants(100),
      });
    }, 1000);
  });
};

export const getApplicants = async () => {
  try {
    const response = await simulateApiCall();
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch applicants");
  }
};

export async function bookTestForUser(userId, bookingDetails) {
  // try {
  //   // Send a POST request to your API or server with the user ID and booking details
  //   // You can use a library like axios or the native fetch API for this purpose
  //   // Replace the URL with the actual endpoint to post the booking request
  //   const response = await fetch("https://api.example.com/bookings", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ userId, bookingDetails }),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to book the test.");
  //   }

  //   // Handle the response and return data if necessary
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error booking test:", error);
  //   throw error;
  // }

  console.log({ userId: bookingDetails });
}
