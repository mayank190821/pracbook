import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

const source_img =
  "https://cb-thumbnails.s3.ap-south-1.amazonaws.com/accounts-vector.svg";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "space-around",
    background: "linear-gradient(145deg,#053997 2%,#040d21 29% 60%,#421a3b)",
    backgroundPosition: "center",
    backgroundBlendMode: "overlay",
  },
  card: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
    flexDirection: "column",
    width: "45%",
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  card_1: {
    display: "flex",
    width: "45%",
    height: "100%",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  image: {
    width: "100%",
    marginTop: "auto",
    marginBottom: "auto",
    height: "70%",
  },
  heading_1: {
    fontFamily: "'Lobster', cursive",
    color: "white",
    fontSize: "90px",
    fontWeight: "300 !important",
    margin: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "70px",
    },
  },
  heading_2: {
    color: "white",
    letterSpacing: "1px",
    lineHeight: "1.2",
  },
  card_container: {
    display: "flex",
    justifyContent: "space-evenly",
    // border: "1px solid red",
    width: "100%",
  },
  stCard: {
    background: "transparent !important",
    color: "rgb(255,0,0)",
  },
  button_styleSt: {
    color: "white !important",
    width: "fit-content",
    marginRight: "20px !important",
    marginLeft: "5px !important",
    "&:hover": {
      color: "#005cff !important",
      backgroundColor: "white !important",
      fontWeight: "700 !important",
      transform: "scale(1.08)",
    },
  },
  button_styleFt: {
    color: "white !important",
    width: "fit-content",
    marginLeft: "20px !important",
    "&:hover": {
      color: "#c333a4 !important",
      backgroundColor: "white !important",
      fontWeight: "700 !important",
      transform: "scale(1.08)",
    },
  },
}));
function LandingPage() {
  const style = useStyles();
  return (
    <>
      <div className={style.container}>
        <div className={style.card}>
          <h1 className={style.heading_1}>PracBook</h1>

          <div className={style.card_container}>
            <Card className={style.stCard} elevation={0}>
              <CardContent>
                <Typography
                  style={{
                    marginBottom: "30px",
                    color: "white",
                    fontWeight: "500",
                    fontSize: "20px",
                  }}
                >
                  Login to portal for practical exams.
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  to={{
                    pathname: "/login/student",
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    varient="contained"
                    style={{ backgroundColor: "#005cff" }}
                    className={style.button_styleSt}
                  >
                    <Typography
                      style={{
                        fontWeight: "700",
                        padding: "4px 12px",
                        fontSize: "20px",
                      }}
                    >
                      Student
                    </Typography>
                  </Button>
                </Link>
                <Link
                  to={{
                    pathname: "/login/faculty",
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    varient="contained"
                    style={{ background: "#c333a4" }}
                    className={style.button_styleFt}
                  >
                    <Typography
                      style={{
                        fontWeight: "500",
                        padding: "4px 12px",
                        fontSize: "20px",
                      }}
                    >
                      faculty
                    </Typography>
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        </div>
        <div className={style.card_1}>
          <img src={source_img} className={style.image} alt="" />
        </div>
      </div>
    </>
  );
}

export default LandingPage;
