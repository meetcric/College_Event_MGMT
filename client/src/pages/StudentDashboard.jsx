import StudentSidebar from "../components/studentsidebar/StudentSidebar";
import Topbar from "../components/topbar/Topbar";
import "./StudentDashboard.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./userList/UserList";
import User from "./user/User";
import NewUser from "./newUser/NewUser";
import NewEvent from "./newEvent/NewEvent";
import StudentEvents from "./studentEvents/studentEvents";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import StudentParticipatedEvents from "./studentParticipatedEvents/studentParticipatedEvents";

function StudentDashboard() {
  let navigate = useNavigate();
  useEffect(() => {
    if (jwt_decode(localStorage.getItem("token")).role != "Student") {
      alert("Unauthorized access");
      navigate("/");
    }
  });
  return (
    <div>
      <Topbar />
      <div className="container">
        <StudentSidebar />
        <Routes>
          <Route exact path="/">
            <StudentEvents />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/allEvents">
            <StudentEvents />
          </Route>
          <Route path="/partEvents">
            <StudentParticipatedEvents />
          </Route>
          <Route path="/newEvent">
            <NewEvent />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default StudentDashboard;
