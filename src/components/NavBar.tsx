import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <Navbar
      variant="dark"
      expand="md"
      sticky="top"
      expanded={expanded}
      style={{ backgroundColor: "#1c1c1c" }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          onClick={handleClose}
        >
          DishDash
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle} />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/recipes"
              className="text-white"
              onClick={handleClose}
            >
              Recipes
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favorites"
              className="text-white"
              onClick={handleClose}
            >
              Favorites
            </Nav.Link>
            <Nav.Link
              id="profile"
              as={Link}
              to="/profile"
              className="text-white"
              onClick={handleClose}
            >
              <FaUserCircle size={22} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
