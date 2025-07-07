import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { customFetch } from "../services/customFetch";
import { useNavigate } from "react-router-dom";
export const Staff = () => {
  const { roleID } = useAuth();
  const  navigate = useNavigate();

  useEffect(() => {
    async function initFetch() {
      const access = await customFetch("api/adminOnly");
      
      access.status !== 200 ? navigate('/landing') : null;
    }
    initFetch();
  }, []);

  return (
    <div>
      <h1>Our Practitioners</h1>
      <p>Placeholder</p>
      <p>Add new staff</p>
      <p>Add new opening hours</p>
      <p>Check bookings</p>
      <p>All customers DB</p>
    </div>
  );
};
