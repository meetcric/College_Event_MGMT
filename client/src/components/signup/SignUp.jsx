import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MenuItem, InputLabel } from "@mui/material";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [userrole, setRole] = useState("Student");
  const [course, setCourse] = useState("M.Tech");
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  async function formSubmit(event) {
    // event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log(control);

    const user = JSON.stringify({
      name: firstName + " " + lastName,
      email: email,
      password: password,
      phoneno: phoneno,
      role: userrole,
      course: course,
    });

    console.log(user);

    const res = await axios.post("http://localhost:8000/api/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === "ok") {
      navigate("/SignIn");
    } else if (res.data.status === "error") {
      alert("Duplicate Email");
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}></Box>
          <form noValidate onSubmit={handleSubmit(formSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  onChange={(e) => setfirstName(e.target.value)}
                  error={Boolean(errors.firstName)}
                />
                {errors?.firstName?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.firstName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  autoFocus
                  {...register("lastName", {
                    required: true,
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  onChange={(e) => setlastName(e.target.value)}
                  error={Boolean(errors.firstName)}
                />
                {errors?.lastName?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.lastName?.type === "pattern" && (
                  <p>Alphabetical characters only</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                />
                {errors?.email?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.email?.type === "pattern" && (
                  <p>Enter Valid Email-Id</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors?.password?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.password?.type === "minLength" && (
                  <p>Password Minimum length should be 6</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneno"
                  label="Phone No."
                  type="phoneno"
                  id="phoneno"
                  autoComplete="+91"
                  {...register("phoneno", {
                    required: true,
                    pattern: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                  })}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                {errors?.phoneno?.type === "required" && (
                  <p>This field is required</p>
                )}
                {errors?.phoneno?.type === "pattern" && (
                  <p>Please enter a Valid Phone Number</p>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="user-role">User Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  value={userrole}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="EventManager">Event Manager</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="course">Course</InputLabel>
                <Select
                  labelId="course"
                  id="course"
                  value={course}
                  label="Course"
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <MenuItem value="M.Tech">M.Tech</MenuItem>
                  <MenuItem value="IM.tech">Integrated M.Tech</MenuItem>
                  <MenuItem value="MS">MS</MenuItem>
                  <MenuItem value="DigiSoc">Digital Society</MenuItem>
                  <MenuItem value="Ph.D">Ph.D</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/SignIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
