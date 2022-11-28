import EventManagerSidebar from "../components/eventmanagersidebar/EventManagerSidebar";
import Topbar from "../components/topbar/Topbar";
import "./EventManagerDashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./user/User";
import NewUser from "./newUser/NewUser";
import NewEvent from "./newEvent/NewEvent";
import PendingEventList from "./pendingEventList/pendingEventList";
import EMapprovedEvents from "./EMapprovedEvents/EMapprovedEvents";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function EventManagerDashboard() {
  let navigate = useNavigate();
  useEffect(() => {
    if (jwt_decode(localStorage.getItem("token")).role != "EventManager") {
      // alert("Unauthorized access");
      navigate("/");
    }
  });
  return (
    <div>
      <Topbar />
      <div className="container">
        <EventManagerSidebar />
        <Routes>
          <Route exact path="/">
            <NewEvent />
          </Route>
          <Route path="/pendingEventList">
            <PendingEventList />
          </Route>
          <Route path="/EMApprovedEvents">
            <EMapprovedEvents />
          </Route>
          <Route path="/newEvent">
            <NewEvent />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default EventManagerDashboard;
