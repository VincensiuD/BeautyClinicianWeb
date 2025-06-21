import React, { useState } from "react";
import { customFetch } from "../services/customFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const Login = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
    const { login } = useAuth();


  return (
    <div>
      <div>
        <label>Mobile Number</label>
        <input onChange={(e) => setMobileNumber(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={()=> login(mobileNumber, password)}>Login</button>
    </div>
  );
};
