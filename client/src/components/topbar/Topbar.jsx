import React, { useEffect, useState } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import jwt_decode from "jwt-decode";
import UserDetails from "../userdetails/userdetails";
import LogoutIcon from "@mui/icons-material/Logout";
import Icon from "@mui/material/Icon";
import { IconButton, requirePropFactory } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

export default function Topbar() {
  let navigate = useNavigate();
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
              IIITB EM
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <IconButton
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <LogoutIcon></LogoutIcon>
            </IconButton>
            {/* <LogoutIcon onClick></LogoutIcon> */}
          </div>
          <div>{jwt_decode(localStorage.getItem("token"))["name"]}</div>
        </div>
      </div>
    </div>
  );
}
