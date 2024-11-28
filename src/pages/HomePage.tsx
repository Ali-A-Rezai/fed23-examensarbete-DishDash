import { motion } from "framer-motion";
import { Button, Container } from "react-bootstrap";
import FavoriteRecipes from "../components/PopularRecipes";
import "../assets/styles/Pages/HomePage.scss";

const HomePage: React.FC = () => {
  const easing = [0.6, -0.05, 0.01, 0.99];

  return (
    <div className="homepage">
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: easing }}
      >
        <Container className="text-center">
          <motion.h1
            className="hero-title"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: easing }}
          >
            Discover Your Next Favorite Recipe
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: easing }}
          >
            Explore thousands of recipes tailored to your taste and lifestyle.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: easing }}
          >
            <Button variant="primary" size="lg" className="get-started-btn">
              Get Started
            </Button>
          </motion.div>
        </Container>
      </motion.section>

      <motion.section
        className="about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 1, ease: easing }}
      >
        <Container>
          <h2 className="section-title">Why DishDash?</h2>
          <p className="section-description">
            DishDash connects food enthusiasts with the best recipes, tailored
            to their taste and dietary needs. We make cooking and sharing
            recipes easy and enjoyable.
          </p>
        </Container>
      </motion.section>
      <FavoriteRecipes
        loadingMessage="Loading recipes..."
        errorMessage="Error fetching recipes"
        scrollAmount={300}
      />
    </div>
  );
};

export default HomePage;
