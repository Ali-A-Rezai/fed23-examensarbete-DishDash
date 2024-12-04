import React from "react";
import { PuffLoader } from "react-spinners";
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
        <PuffLoader color="#28a745" size={100} />
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingComponent;
