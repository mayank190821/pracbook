import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
// import source_img from "../images/landing-pic2.jpg";
import bg_img from "../images/bg-pic-1.jpg";
import { Link } from "react-router-dom";

const source_img = "https://cb-thumbnails.s3.ap-south-1.amazonaws.com/accounts-vector.svg"
const useStyles = makeStyles((Theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "space-around",
    background: "#01579b",
    backgroundImage: "url(" + bg_img + ")",
    backgroundPosition: "center",
    backgroundBlendMode: "overlay",

    // backgroundColor: "red"
  },
  card: {
    // border:"1px solid red",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "auto",
    width: "45%",
    height: "70%",
    // background:"white",
    overflow: "hidden",
    // border: "1px solid red"
  },
  card_1: {
    display: "flex",
    width: "50%",
    height: "100%",
    // background:"white",
    overflow: "hidden",
    // border: "1px solid red"
  },
  image: {
    width: "100%",
    marginTop:"auto",
    marginBottom:"auto",
    height: "90%",
  },
  heading_1: {
    fontFamily: "'Lobster', cursive",
    color: "white",
    fontSize: "90px",
    fontWeight: "300 !important",
    margin: "20px",
  },
  heading_2: {
    color: "white",
    letterSpacing: "1px",
    lineHeight: "1.2",
    margin: "20px",
  },
  card_container: {
    display: "flex",
    justifyContent: "space-evenly",
    // border: "1px solid red",
    width: "100%",
  },
  card_container_content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "12px",
    color: "rgb(255,0,0)",
  },
  button_style: {
    backgroundColor: "#4cb96eed !important",
    borderRadius: "100px !important",
    width: "60%",
    marginLeft: "20px !important",
    "&:hover": {
      backgroundColor: "white !important",
      color: "#4cb96eed",
      fontWeight: "600 !important",
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
            <div className={style.card_container_content}>
              <h3 className={style.heading_2}>
                {" "}
                accusamus expedita voluptate excepturi dicta corporis odio
                labore maxime illum sint sit sequi beatae alias.
              </h3>
              <Link to="/login" style={{textDecoration: "none"}}>
                <Button variant="contained" className={style.button_style}>
                    STUDENT LOGIN
                </Button>
              </Link>
            </div>
            <div className={style.card_container_content}>
              <h3 className={style.heading_2}>
                qui suscipit ex voluptas, aerat impedit eligendi aliquid eius
                quam excepturi dolorum cum inventore.
              </h3>
              <Link to="/login" style={{textDecoration: "none"}}>
                <Button variant="contained" className={style.button_style}>
                  FACULTY LOGIN
                </Button>
              </Link>
            </div>
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
