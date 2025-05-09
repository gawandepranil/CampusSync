import React, { createContext, useState, useContext } from "react";

// Hardcoded user credentials
const hardcodedUser = {
  prn: "22220027",
  email: "dhirajdj30@gmail.com",
  password: "pass", // In a real app, never hardcode passwords!
  name: "Dhiraj Jagtap",
};

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function
  const login = (prnOrEmail, password) => {
    // Validate credentials against hardcoded user
    if (
      (prnOrEmail === hardcodedUser.prn || prnOrEmail === hardcodedUser.email) &&
      password === hardcodedUser.password
    ) {
      setUser({ name: hardcodedUser.name, prn: hardcodedUser.prn });
      return true; // Login successful
    } else {
      return false; // Login failed
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};