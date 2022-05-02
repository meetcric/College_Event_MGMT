import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./components/signin/SignIn";
import ForgetPwd from "./components/signin/ForgetPwd";
import SignUp from "./components/signup/SignUp";
import EventManagerDashboard from "./pages/EventManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import UserList from "./pages/userList/UserList";
import { Button } from "@mui/material";
import ProtectedRoute from "./pages/ProtectedRoute";
import jwt_decode from "jwt-decode";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/ForgetPwd" exact element={<ForgetPwd />} />
          <Route
            path="/EventDashboard/*"
            exact
            element={
              <ProtectedRoute>
                <EventManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminDashboard/*"
            exact
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/StudentDashboard/*"
            exact
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" exact element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
