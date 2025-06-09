import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className='nav-bar'>
      <Link to="/" className={'link-text'}>Home</Link>
      <Link to="/clinicians" className={'link-text'}>Clinicans</Link>
    </nav>
  );
};


