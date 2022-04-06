import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Dashboard from "./components/dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/Dashboard" exact element={<Dashboard />} />
          <Route path="/" exact element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
