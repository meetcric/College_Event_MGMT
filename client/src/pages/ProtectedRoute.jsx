import { Routes, Route, Link, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ user, children }) => {
  var isUser = localStorage.getItem("token");
  if (!isUser) {
    console.log("yes");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
