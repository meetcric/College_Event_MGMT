import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Login() {
  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();
    const user = JSON.stringify({
      email: email,
      password: password,
    });

    const res = await axios.post("http://localhost:8000/api/login", user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    // console.log(res.data.user);
    if (res.data.status === "ok") {
      localStorage.setItem("token", res.data.user);
      alert("Login successful");
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
