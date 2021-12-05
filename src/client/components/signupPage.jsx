import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Grid,
  InputLabel,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { signup } from "../api/auth.api";
import image from "./../images/pracbook.png";
import Snackbars from "./ErrorMessages";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "white",
    borderRadius: "2px",
    position: "absolute",
    top: "0",
    bottom: "0",
    right: theme.spacing(4),
    margin: "auto",
    width: "50vw",
    padding: "2%",
    height: "fit-content",
    [theme.breakpoints.down("sm")]: {
      width: "90vw !important",
      right: "0px !important",
      left: "0px !important",
    },
  },
  body: {
    height: "100vh",
    background: "linear-gradient(145deg,#421a3b 2%,#040d21 29% 70%,#053997)",
  },
  image: {
    height: "100vh",
    width: "50vw !important",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    height: "20px",
    width: "fit-content",
  },
  avatar: {
    marginBottom: theme.spacing(1),
    backgroundColor: `${theme.palette.primary.light} !important`,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  text: {
    color: theme.palette.primary.dark,
    float: "right",
    marginTop: theme.spacing(2),
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
  },
}));

export default function Signup(props) {
  const classNames = useStyles();
  const { role } = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    section: "",
    confirmPassword: "",
    rollNumber: "",
    year: "",
    email: "",
  });
  const [extras, setExtras] = useState({
    showPassword: false,
    showConfirmPassword: false,
    open: false,
    error: "",
    message: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  const passwordWeak = () => {
    if (user.password.length < 8) {
      setExtras({
        ...extras,
        error: "password must have 8 characters!",
        message: "",
      });
      return true;
    }
    if (!/([A-Z])+/.test(user.password)) {
      setExtras({
        ...extras,
        error: "password must contain uppercase letters!",
        message: "",
      });
      return true;
    }
    if (!/([a-z])+/.test(user.password)) {
      setExtras({
        ...extras,
        error: "password must contain lowercase letters!",
        message: "",
      });
      return true;
    }
    if (!/([!@#$&*])+/.test(user.password)) {
      setExtras({
        ...extras,
        error: "password must contain special characters!",
        message: "",
      });
      return true;
    }
    if (!/([0-9])+/.test(user.password)) {
      setExtras({
        ...extras,
        error: "password must contain a digit!",
        message: "",
      });
      return true;
    }
    return false;
  };

  const handleClickShowPassword = () => {
    setExtras({ ...extras, showPassword: !extras.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setExtras({ ...extras, showConfirmPassword: !extras.showConfirmPassword });
  };

  const handlePasswordMatch = () => {
    if (user.confirmPassword === user.password) {
      return true;
    }
    return false;
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    if (!handlePasswordMatch()) {
      setExtras({
        ...extras,
        error: "Confirm password is different",
        message: "",
      });
      setOpenSnackBar(true);
      return;
    } else if (passwordWeak()) {
      setOpenSnackBar(true);
    } else {
      const faculty = {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        password: user.password,
      };
      const student = {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        section: user.section,
        password: user.password,
        year: user.year,
        rollNumber: user.rollNumber,
      };
      if (/([a-zA-Z0-9])+@([a-zA-Z0-9])+.([a-zA-Z])+/.test(user.email)) {
        signup(role === "faculty" ? faculty : student, role).then((res) => {
          if (res && !res.error) {
            setExtras({ ...extras, open: true });
          } else if (res) {
            setExtras({ error: res.error });
            setOpenSnackBar(true);
          } else {
            setExtras({ error: "Internal server error!" });
            setOpenSnackBar(true);
          }
        });
        setExtras({ ...extras, error: "" });
      } else {
        setExtras({ ...extras, error: "Enter a valid Email address!" });
        setOpenSnackBar(true);
      }
    }
  };

  const { open } = extras;
  if (open) {
    return (
      <Redirect
        to={{
          pathname: `/login/${role}`,
          state: { from: props.location },
        }}
      />
    );
  }

  return (
    <div className={classNames.body}>
      <div>
        <img
          alt=""
          src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg"
          className={classNames.image}
        ></img>
      </div>
      <Container className={classNames.main} component="main" maxWidth="xs">
        <div className={classNames.paper}>
          <Avatar className={classNames.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classNames.form} noValidate>
            <Grid container spacing={(0, 2)}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  id="first-name"
                  label="First Name"
                  name="first-name"
                  onChange={handleChange("firstName")}
                  value={user.firstName}
                  autoComplete="text"
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="last-name"
                  label="Last Name"
                  name="last-name"
                  onChange={handleChange("lastName")}
                  value={user.lastName}
                  autoComplete="text"
                />
              </Grid>
              {role === "student" ? (
                <React.Fragment>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Id"
                      name="email"
                      onChange={handleChange("email")}
                      value={user.email}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="section"
                      label="Section"
                      name="section"
                      onChange={handleChange("section")}
                      value={user.section}
                      autoComplete="text"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      id="roll-no"
                      label="Roll Number"
                      name="roll-no"
                      onChange={handleChange("rollNumber")}
                      value={user.rollNumber}
                      autoComplete="text"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="year"
                      label="Year"
                      name="year"
                      onChange={handleChange("year")}
                      value={user.year}
                      autoComplete="text"
                    />
                  </Grid>
                </React.Fragment>
              ) : (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Id"
                    name="email"
                    onChange={handleChange("email")}
                    value={user.email}
                    autoComplete="email"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControl variant="outlined" required fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    onChange={handleChange("password")}
                    value={user.password}
                    type={extras.showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {extras.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="password *"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" required fullWidth>
                  <InputLabel htmlFor="confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirm-password"
                    onChange={handleChange("confirmPassword")}
                    value={user.confirmPassword}
                    type={extras.showConfirmPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {extras.showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password *"
                  />
                </FormControl>
              </Grid>
              <br />
              {/* {extras.error && (
                <Typography component="p" color="error" style={{display: "flex", alignItems: "center", lineHeight: "10px"}}>
                  <ErrorIcon sx={{ fontSize: 25 }}/>
                  {extras.error}
                </Typography>
              )}
              {extras.message && (
                <p style={{ color: "#4caf50" }}>{extras.message}</p>
              )} */}
              <Grid item xs={12}>
                <Button
                  className={classNames.submit}
                  color="primary"
                  fullWidth
                  onClick={clickSubmit}
                  variant="contained"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
            <Link to={`/login/${role}`} className={classNames.text}>
              {"Already have an account? Sign In"}
            </Link>
          </form>
        </div>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright "} &copy;{" "}
            <img alt="Pracbook" className={classNames.logo} src={image} />{" "}
            {"2021."}
          </Typography>
        </Box>
      </Container>
      <Snackbars
        open={openSnackBar}
        setOpen={setOpenSnackBar}
        status="error"
        message={extras.error}
      />
    </div>
  );
}
