import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../assets/styles/components-style/NavBar.scss";

const NavigationBar: React.FC = () => {
  return (
    <Navbar
      className="navbar-overlay"
      expand="md"
      bg="transparent"
      variant="dark"
      sticky="top"
    >
      <Navbar.Brand as={Link} to="/" className="fw-bold logo">
        DishDash
      </Navbar.Brand>
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto d-flex flex-row">
          <Nav.Link as={Link} to="/recipes" className="text-white">
            Recipes
          </Nav.Link>
          <Nav.Link as={Link} to="/favorites" className="text-white">
            Favorites
          </Nav.Link>
          <Nav.Link as={Link} to="/about" className="text-white">
            About
          </Nav.Link>
          <Nav.Link id="profile" as={Link} to="/profile" className="text-white">
            <FaUserCircle size={23} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
