import { createContext, useContext, useState, useEffect } from "react";

// Create an authentication context
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Function to handle login: store token and update state
  const login = (token) => {
    sessionStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  // Function to handle logout: remove token and update state
  const logout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
