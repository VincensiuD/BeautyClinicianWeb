import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <Link to="/careers" className={'link-text'}>Careers</Link>
          <Link to="/terms" className={'link-text'}>T&C</Link>
          <Link to="/privacy" className={'link-text'}>Privacy Policy</Link>
          <Link to="/contact" className={'link-text'}>Contact Us</Link>
        </div>

        <div className="footer-social">
            <a href="" >
            <FaYoutube />
          </a>
          <a href="" >
            <FaFacebookF />
          </a>
          <a href="" >
            <FaInstagram />
          </a>
          <a href="" >
            <FaTwitter />
          </a>
          <a href="" >
            <FaTiktok />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Serenity Beauty Sanctuary. All rights reserved.</p>
      </div>
    </footer>
  );
};

