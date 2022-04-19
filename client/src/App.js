import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import EventManagerDashboard from "./pages/EventManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import UserList from "./pages/userList/UserList";
import { Button } from "@mui/material";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route
            path="/EventDashboard/*"
            exact
            element={<EventManagerDashboard />}
          />
          <Route path="/AdminDashboard/*" exact element={<AdminDashboard />} />
          <Route
            path="/StudentDashboard/*"
            exact
            element={<StudentDashboard />}
          />
          <Route path="/" exact element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
