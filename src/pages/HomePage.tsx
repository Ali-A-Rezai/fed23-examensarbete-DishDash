import { Button, Container } from "react-bootstrap";
import "../assets/styles/HomePage.scss";

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <Container className="text-center">
          <h1 className="hero-title">Discover Your Next Favorite Recipe</h1>
          <p className="hero-subtitle">
            Explore thousands of recipes tailored to your taste and lifestyle.
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
