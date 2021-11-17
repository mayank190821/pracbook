import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";

const source_img = "https://cb-thumbnails.s3.ap-south-1.amazonaws.com/accounts-vector.svg"
const useStyles = makeStyles((Theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "space-around",
    background: "linear-gradient(145deg,#053997 2%,#040d21 29% 60%,#421a3b)",
    // backgroundImage: "url(" + bg_img + ")",
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
  stCard: {
    background: "transparent !important",
    color: "rgb(255,0,0)",
  },
  button_styleSt:{
    color:"white !important",
    width: "50%",
    marginLeft: "20px !important",
    "&:hover": {
      color:"#005cff !important",
      backgroundColor: "white !important",
      fontWeight:"700 !important",
      transform: "scale(1.08)",
    },
  },
  button_styleFt: {
    color:"white !important",
    width: "50%",
    marginLeft: "20px !important",
    "&:hover": {
      color:"#c333a4 !important",
      backgroundColor: "white !important",
      fontWeight:"700 !important",
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
                <Typography style={{color:"white", fontWeight:"700",fontSize:"18px"}}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Elig
                </Typography>
              </CardContent>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <CardActions >
                  <Button varient="contained" style={{backgroundColor:"#005cff"}} className={style.button_styleSt} >
                    <Typography style={{fontWeight:"700"}} >Student</Typography>
                  </Button>
                </CardActions>
              </Link>
            </Card>
            <Card className={style.stCard} elevation={0}>
              <CardContent>
                <Typography style={{color:"white", fontWeight:"700",fontSize:"18px"}}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Elig
                </Typography>
              </CardContent>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <CardActions>
                  <Button varient="contained" style={{background:"#c333a4"}} className={style.button_styleFt} >
                    <Typography style={{fontWeight:"700"}}>faculty</Typography>
                  </Button>
                </CardActions>
              </Link>
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
