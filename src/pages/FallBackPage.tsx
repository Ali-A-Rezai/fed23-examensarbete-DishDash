import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Pages-style/FallbackPage.scss";

const FallbackPage: React.FC = () => {
  return (
    <div className="fallback-page">
      <div className="fallback-content">
        <h1 className="error-code">404</h1>
        <p className="message">
          Oops! It looks like the recipe you're looking for has gone missing.
          Maybe it's hiding behind some broken plates!
        </p>
        <Link to="/" className="back-home">
          Back to DishDash
        </Link>
      </div>
    </div>
  );
};

export default FallbackPage;
