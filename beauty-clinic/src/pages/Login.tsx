import React, { useState, useEffect } from "react";
import { customFetch } from "../services/customFetch";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export const Login = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
    const { login, roleID, name } = useAuth();

    async function processLogin(){
      const success:boolean = await login(mobileNumber, password);

      if(success){
        navigate('/landing')
      }
    }

    useEffect(() => {
      if(roleID){
         navigate('/');
      }
    },[])

  return (
    <div className="login-main-div">
      <div className="label-input-div">
        <label>Mobile Number</label>
        <input onChange={(e) => setMobileNumber(e.target.value)} />
      </div>
      <div className="label-input-div">
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button className="form-btn btn" onClick={()=> processLogin()}>Login</button>
    </div>
  );
};
