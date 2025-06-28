import React, { createContext, useContext, useEffect, useState } from "react";
import { customFetch } from "../services/customFetch";
import { Role } from "../model/role";

type AuthContextType = {
  name: string;
  roleID: Role | null;
  mobileNumber: string;
  login: (mobileNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [roleID, setRoleID] = useState<Role | null>(null);
  const [name, setName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("triggered");
    const storageRoleID: string | null = localStorage.getItem("RoleID");
    const storageName: string | null = localStorage.getItem("Name");
    storageRoleID ? setRoleID(parseInt(storageRoleID, 10)) : null;
    storageName ? setName(storageName) : "";
  }, []);

  async function login(
    mobileNumber: string,
    password: string
  ): Promise<boolean> {
    try {
      const data = await customFetch(
        "http://127.0.0.1:3000/api/login",
        { mobileNumber, password },
        "POST"
      );

      if (data.status === 200) {
        setRoleID(data.userObj.roleID as Role);
        localStorage.setItem("RoleID", data.userObj.roleID);
        setName(data.userObj.name);
        console.log(data.userObj.name);
        localStorage.setItem("Name", data.userObj.name);
        setMobileNumber(data.userObj.mobileNumber);
        return true;
      }
      return false;
    } catch (error) {
      console.log("incorrect credential");
      console.error(error);
      return false;
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("RoleID");
    localStorage.removeItem("Name");
    setRoleID(null);
    setName("");
    setMobileNumber("");
  };

  return (
    <AuthContext.Provider value={{ name, roleID, mobileNumber, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// import { createContext, useContext, useState, useEffect } from 'react';

// type AuthContextType = {
//   name: string;
//   setName: (name: string) => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [name, setName] = useState("");

//   useEffect(() => {
//     console.log("AuthProvider mounted");
//     return () => console.log("AuthProvider unmounted");
//   }, []);

//   return (
//     <AuthContext.Provider value={{ name, setName }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within AuthProvider");
//   return context;
// };
