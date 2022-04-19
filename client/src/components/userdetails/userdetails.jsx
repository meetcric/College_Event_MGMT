import React, { useState } from "react";
import jwt_decode from "jwt-decode";

export default function UserDetails() { 
    const [user, setUser] = useState({});
    setUser(jwt_decode(localStorage.getItem("token")));   
    
    return (
        <span>{user["name"]}</span>
    );
}
