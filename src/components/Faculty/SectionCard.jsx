import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "280px",
    height: "280px",
    minWidth: "250px",
    margin: "25px",
    transition: "0.5s all linear",
    position: "relative",
    transformStyle: "preserve-3d",
  },
  card: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  mediaHead: {
    position: "absolute",
    color: "white",
    padding: "15px",
    fontSize: "25px",
  },
}));

const SectionCard = ({ section }) => {
  const classNames = useStyles();

  function handleCardClick() {
    const div = document.getElementById(`card-root-${section}`);
    div.style.transform = "rotateY(180deg)";
  }

  function handleMouseLeave() {
    const div = document.getElementById(`card-root-${section}`);
    div.style.transform = "rotateY(0deg)";
  }
  const subjects = [
    "Data Structures and Algorithms",
    "Competitive Programming",
    "Advanced Data Structures and Algorithms",
    "Python Progamming",
    "Full Stack Technologies",
  ];
  return (
    <React.Fragment>
      <div
        id={`card-root-${section}`}
        onClick={handleCardClick}
        onMouseLeave={handleMouseLeave}
        className={classNames.root}
      >
        <Card
          className={classNames.card}
          style={{ zIndex: "2", backfaceVisibility: "hidden" }}
        >
          <Typography
            className={classNames.mediaHead}
          >{`Section ${section}`}</Typography>
          <CardMedia
            component="img"
            height="40%"
            image="https://gstatic.com/classroom/themes/img_graduation.jpg"
            alt="section k"
          />
          <CardContent>
            <Typography variant="body1">
              <b>Class Advisor:</b> Rupin Bhugra
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              style={{ cursor: "pointer", marginTop: "5px" }}
            >
              rupin.bhugra_cs19@gla.ac.in
            </Typography>
          </CardContent>
        </Card>
        <Card
          className={classNames.card}
          style={{ transform: "rotateY(180deg)" }}
        >
          <List>
            {subjects.map((subject) => {
              return (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={subject}
                      style={{ textAlign: "center" }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default SectionCard;
