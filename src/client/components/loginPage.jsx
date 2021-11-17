import React, { useState } from "react";
import {
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  Box,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {studentSignin} from "../api/auth.api";

const useStyles = makeStyles((theme) => ({
  test: {
    color: "green",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "2px",
    position: "absolute",
    top: "0",
    bottom: "0",
    right: theme.spacing(4),
    margin: "auto",
    width: "50vw",
    padding: "4%",
    height: "fit-content",
    [theme.breakpoints.down("sm")]: {
      width: "90vw !important",
      right: "0px !important",
      left: "0px !important",
    },
  },
  main: {
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: `${theme.palette.primary.light} !important`,
  },
  links: {
    display: "flex",
    margin: "0px 10px",
    justifyContent: "space-between",
  },
  text: {
    color: theme.palette.primary.dark,
    textAlign: "center",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize : "14px !important"
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginBottom: "30px !important",
  },
}));

export default function ImgMediaCard() {
  const classNames = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [extras, setExtras] = useState({
    showPassword: false,
    error: "",
    redirect: false,
  });

  const handleChange = (props) => (event) => {
    setUser({ ...user, [props]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setExtras({ ...extras, showPassword: !extras.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    studentSignin(user).then((response) => {
      console.log(response);
      if(!response.error){
        setExtras({ ...extras, redirect: true });
      }
      else{
        alert(response.error);
      }
    })
  };

  if (extras.redirect) {
    return <Redirect to="/faculty/dashboard" />;
  }

  return (
    <div className={classNames.main}>
      <div>
        <img
          alt=""
          src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg"
          className={classNames.image}
        ></img>
      </div>
      <Container component="main" maxWidth="xs" className={classNames.card}>
        <div className={classNames.paper}>
          <Avatar className={classNames.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classNames.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={handleChange("email")}
              value={user.email}
              autoComplete="email"
              autoFocus
            />
            <FormControl variant="outlined" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                variant="outlined"
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
                      {extras.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password *"
              />
            </FormControl>
            <br />
            {extras.error && (
              <Typography component="p" color="error">
                <Icon color="error">error</Icon>
                {extras.error}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classNames.submit}
            >
              Sign In
            </Button>
            <div className={classNames.links}>
              <Link to="/forgot" className={classNames.text}>
                {"Forgot password?"}
              </Link>
              <Link to="/signup" className={classNames.text}>
                {"New user? Sign Up"}
              </Link>
            </div>
          </form>
        </div>
        <Box mt={4}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright "} &copy; {"Pracbook 2021."}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
