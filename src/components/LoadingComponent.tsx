import React from "react";
import { Spinner } from "react-bootstrap";
import "../assets/styles/components-style/Loading.scss";

interface LoadingComponentProps {
  message?: string;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <Spinner
          animation="border"
          variant="primary"
          className="loading-spinner"
        />
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
