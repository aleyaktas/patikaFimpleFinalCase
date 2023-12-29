import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (userToken) => {
    setToken(userToken);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
