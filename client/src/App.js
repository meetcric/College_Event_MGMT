import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import EventManagerDashboard from "./pages/EventManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { Button } from "@mui/material";

const App = () => {
  function admindash() {
    <AdminDashboard />
  }

  function EMDashboard() {
    <EventManagerDashboard />
  }
  return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/Dashboard" exact element={<EventManagerDashboard />} />
          <Route path="/" exact element={<SignUp />} />
        </Routes>
      </BrowserRouter> */}
      <EventManagerDashboard />
      {/* <AdminDashboard /> */}
      {/* <StudentDashboard /> */}
    </div>
  );
};

export default App;
