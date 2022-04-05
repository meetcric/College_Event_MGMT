import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem, InputLabel } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneno, setPhoneNo] = useState("");
    const [userrole, setRole] = useState("Student");
    const [course, setCourse] = useState("M.Tech");
    let navigate = useNavigate();

    const updateRole = (event) => {
      setRole(event.target.value);
    };

    const updateCourse = (event) => {
      setRole(event.target.value);
    };

    
   async function handleSubmit(event) {
    console.log("Handling Submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log(data.get('firstName').toString() );

    setName(data.get('firstName').toString() + data.get('lastName').toString());
    setEmail(data.get("email").toString());
    setPassword(data.get("password").toString());
    setPhoneNo(data.get("phoneno").toString());
    
    const user = JSON.stringify({
      name: name,
      email: email,
      password: password,
      phoneno: phoneno,
      role: userrole,
      course: course
    });

  console.log(name + "\n" + email + "\n" + password + "\n" + phoneno + "\n" + userrole + "\n" + course);

    const res = await axios.post("http://localhost:8000/api/register", user, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
      },
    });
    console.log("Calling");
    if (res.data.status === "ok") {
      navigate("/SignIn");
    } else if (res.data.status === "error") {
      alert("Duplicate Email");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
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
                />
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
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="user-role">User Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    value={userrole}
                    label="Role"
                    onChange={updateRole}
                  >
                        <MenuItem value="Admin">Admin</MenuItem>
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
                    onChange={updateCourse}
                  >
                        <MenuItem value="M.Tech">M.Tech</MenuItem>
                        <MenuItem value="IM.tech">Integrated M.Tech</MenuItem>
                        <MenuItem value="MS">MS</MenuItem>
                        <MenuItem value="DigiSoc">Digital Society</MenuItem>
                        <MenuItem value="Ph.D">Ph.D</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                  </Select>
              </Grid>
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
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}