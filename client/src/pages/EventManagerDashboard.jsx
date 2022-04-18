import Sidebar from "../components/sidebar/Sidebar";
import EventManagerSidebar from "../components/eventmanagersidebar/EventManagerSidebar"
import Topbar from "../components/topbar/Topbar";
import "./EventManagerDashboard.css";
import Home from "./home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./userList/UserList";
import User from "./user/User";
import NewUser from "./newUser/NewUser";
import ProductList from "./productList/ProductList";
import Product from "./product/Product";
import NewEvent from "./newEvent/NewEvent";
import PendingEventList from "./pendingEventList/pendingEventList";
import EMapprovedEvents from "./EMapprovedEvents/EMapprovedEvents";

function EventManagerDashboard() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <EventManagerSidebar />
        <Routes>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/pendingEventList">
            <PendingEventList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/EMApprovedEvents">
            <EMapprovedEvents />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newEvent">
            <NewEvent />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default EventManagerDashboard;
