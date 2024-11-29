import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "../assets/styles/components-style/Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <>
        <div className="footer">
          <div className="footer-content">
            <div className="footer-logo">
              <Link to="/" className="logo-link">
                <span className="logo">DishDash</span>
              </Link>
              <p className="footer-description">
                Discover, share, and enjoy delicious recipes with DishDash, your
                go-to platform for culinary inspiration.
              </p>
            </div>

            <div className="footer-links">
              <h4 className="footer-title">Quick Links</h4>
              <ul>
                <li>
                  <Link to="/recipes">Recipes</Link>
                </li>
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>

            <div className="footer-socials">
              <h4 className="footer-title">Follow Us</h4>
              <div className="social-icons">
                <a
                  href="#"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} DishDash.</p>
          </div>
        </div>
      </>
    </footer>
  );
};

export default Footer;
