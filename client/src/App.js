import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Signup from "./pages/Signup";

// //importing api
// import { getTest } from "./api/test";

import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} /> */}
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/" exact element={<SignUp />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
