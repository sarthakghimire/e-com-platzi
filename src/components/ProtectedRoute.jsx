import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./../assets/loading.json";
import Lottie from "lottie-react";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-50">
        <div className="w-40">
          <Lottie animationData={Loading} loop={true} />
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
