import React from "react";
import "../componentsCSS/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Learn more about our company and mission.</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Contact our support team for assistance.</p>
        </div>
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/ProductList">Earphone</Link>
            </li>
            <li>
              <Link to="/MobileList">Mobile</Link>
            </li>
            <li>
              <Link to="/WatchList">Watch</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CoCart E-commerce Website</p>
      </div>
    </footer>
  );
};

export default Footer;
