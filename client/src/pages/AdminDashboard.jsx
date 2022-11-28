import AdminSidebar from "../components/adminsidebar/AdminSidebar";
import Topbar from "../components/topbar/Topbar";
import "./EventManagerDashboard.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import UserList from "./userList/UserList";
import User from "./user/User";
import NewUser from "./newUser/NewUser";
import NewEvent from "./newEvent/NewEvent";
import AdminPendingEvents from "./adminPendingEvents/adminPendingEvents";
import AdminAllEvents from "./adminAllEvents/adminAllEvents";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function AdminDashboard() {
  let navigate = useNavigate();

  useEffect(() => {
    if (jwt_decode(localStorage.getItem("token")).role != "Admin") {
      alert("Unauthorized access");
      navigate("/");
    }
  });
  
  return (
    <div>
      <Topbar />
      <div className="container">
        <AdminSidebar />
        <Routes>
          <Route exact path="/">
            <UserList />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/adminPendingEvents">
            <AdminPendingEvents />
          </Route>
          <Route path="/AllEvents">
            <AdminAllEvents />
          </Route>
          <Route path="/newEvent">
            <NewEvent />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
