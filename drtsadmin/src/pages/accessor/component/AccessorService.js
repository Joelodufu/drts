// AccessorService.js

export const getAccessors = async () => {
  try {
    const response = await fetch(
      "https://drts-server.onrender.com/api/accessors"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch accessors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
