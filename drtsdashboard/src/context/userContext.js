// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
