import AdminSidebar from "../components/adminsidebar/AdminSidebar";
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

function EventManagerDashboard() {
  return (
    <Router>
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
    </Router>
  );
}

export default EventManagerDashboard;
