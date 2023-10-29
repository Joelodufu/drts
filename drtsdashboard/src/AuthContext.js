// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load the user from local storage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    // Authenticate the user (e.g., by making an API request)
    // Set the user in the state if authentication is successful
    setUser(userData);

    // Save the user in local storage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    // Clear the user from the state
    setUser(null);

    // Remove the user from local storage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
