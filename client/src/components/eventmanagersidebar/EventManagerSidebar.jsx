import "./EventManagerSidebar.css";

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

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/EventDashboard/newevent" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Apply for Events
              </li>
            </Link>
            <Link to="/EventDashboard/pendingEventList" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Pending Events
              </li>
            </Link>
            <Link to="/EventDashboard/EMApprovedEvents" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Approved Events
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
