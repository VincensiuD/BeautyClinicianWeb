import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
  const { roleID, name } = useAuth();

  return (
    <nav className="nav-bar">
      <Link to="/" className={"link-text"}>
        Home
      </Link>
      <Link to="/clinicians" className={"link-text"}>
        Clinicians
      </Link>
      {roleID ? (
        <span className={"link-text-login"}>
          Hello, {name.trim().split(/\s+/)[0]}
        </span>
      ) : (
        <Link to="/login" className={"link-text-login"}>
          Login
        </Link>
      )}
    </nav>
  );
};
