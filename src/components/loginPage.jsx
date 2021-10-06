import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  test: {
    color: "green",
  },
  card: {
    position: "absolute",
    top: "0",
    bottom: "0",
    // left: "0",
    right: "100px",
    margin: "auto",
    height: "fit-content",
  },
  main: {
    height: "100vh",
    backgroundColor: "#070C1E",
  },
  image: {
    height: "100vh",
    width: "50vw",
    "& > *": {
      height: "100vh",
    },
  },
}));

export default function ImgMediaCard() {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.image}>
        <img
          data-v-6078420c=""
          src="https://app.svgator.com/assets/svgator.webapp/log-in-girl.svg"
        ></img>
      </div>
      <Card sx={{ maxWidth: 345 }} className={classes.card}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography
            gutterBottom
            className={classes.test}
            variant="h5"
            component="div"
          >
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
