import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar: React.FC = () => {
  return (
    <Navbar
      variant="dark"
      expand="md"
      sticky="top"
      style={{ backgroundColor: "#1c1c1c" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          DishDash
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/recipes" className="text-white">
              Recipes
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="text-white">
              Favorites
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white">
              About
            </Nav.Link>
            <Nav.Link
              id="profile"
              as={Link}
              to="/profile"
              className="text-white"
            >
              <FaUserCircle size={23} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
