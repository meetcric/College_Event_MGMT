import StudentSidebar from "../components/studentsidebar/StudentSidebar";
import Topbar from "../components/topbar/Topbar";
import "./StudentDashboard.css";
import Home from "./home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./userList/UserList";
import User from "./user/User";
import NewUser from "./newUser/NewUser";
import ProductList from "./productList/ProductList";
import Product from "./product/Product";
import NewEvent from "./newEvent/NewEvent";

function EventManagerDashboard() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <StudentSidebar />
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
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
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
