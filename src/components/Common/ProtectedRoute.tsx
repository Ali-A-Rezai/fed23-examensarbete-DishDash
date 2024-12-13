import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingComponent from "../LoadingComponent";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingComponent message="Authenticating..." />;
  }

  if (!user) {
    return (
      <>
        <Navigate
          to="/login?redirected=true"
          state={{ from: location }}
          replace
        />
      </>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
