import AdminSidebar from "../components/adminsidebar/AdminSidebar";
import Topbar from "../components/topbar/Topbar";
import "./EventManagerDashboard.css";
import Home from "./home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./userList/UserList";
import User from "./user/User";
import NewUser from "./newUser/NewUser";
import Product from "./product/Product";
import NewEvent from "./newEvent/NewEvent";
import AdminPendingEvents from "./adminPendingEvents/adminPendingEvents";
import AdminAllEvents from "./adminAllEvents/adminAllEvents";

function AdminDashboard() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <AdminSidebar />
        <Routes>
          <Route exact path="/">
            <Home />
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
