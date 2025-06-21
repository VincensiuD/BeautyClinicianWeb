import React, { createContext, useContext, useEffect, useState } from "react";
import { customFetch } from "../services/customFetch";
import { Role } from "../model/role";

type AuthContextType = {
  name: string;
  userID: Role | null;
  mobileNumber: string;
  login: (mobileNumber: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userID, setUserID] = useState<Role | null>(null);
  const [name, setName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [loading, setLoading] = useState(true);

  async function login(mobileNumber: string, password: string) {
    try {
      const data = await customFetch(
        "http://127.0.0.1:3000/api/login",
        { mobileNumber, password },
        "POST"
      );

      if (data.status === 200) {
        setUserID(data.userID);
        setName(data.name);
        setMobileNumber(data.mobileNumber);
      }

    } catch (error) {
      console.log("incorrect credential");
      console.error(error);
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUserID(null);
        setName('');
        setMobileNumber('');
  };

  return (
    <AuthContext.Provider value={{ name, userID, mobileNumber, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
