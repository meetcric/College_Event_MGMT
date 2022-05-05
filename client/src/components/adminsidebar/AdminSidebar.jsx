import "./adminsidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Admin Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/AdminDashboard/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/AdminDashboard/adminPendingEvents" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Pending Events
              </li>
            </Link>
            <Link to="/AdminDashboard/AllEvents" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                All Events
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
