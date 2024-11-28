import React from "react";
import "../assets/styles/components/Error.scss";

interface ErrorComponentProps {
  message?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message = "An error occurred.",
}) => {
  return (
    <div className="error-overlay">
      <div className="error-content">
        <h2 className="error-title">Oops!</h2>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
