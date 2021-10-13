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
    width: "auto",
    maxWidth: "270px",
    height: "280px",
    minWidth: "250px",
    margin: "25px",
    transition: "0.5s all linear",
    position: "relative",
    transformStyle: "preserve-3d",
    zIndex: "-10 !important",
    backfaceVisibility: "hidden",
  },
  card: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  back: {
    transform: "rotateY(180deg)",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    overflowY: "scroll !important",
  },
  mediaHead: {
    position: "absolute",
    color: "white",
    padding: "15px",
    fontSize: "25px",
  },
}));

const SectionCard = ({ props }) => {
  const classNames = useStyles();
  console.log(props);
  function handleCardClick() {
    const div = document.getElementById(`card-root-${props.section}`);
    div.style.transform = "rotateY(180deg)";
  }

  function handleMouseLeave() {
    const div = document.getElementById(`card-root-${props.section}`);
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
    <div
      id={`card-root-${props.section}`}
      onClick={handleCardClick}
      onMouseLeave={handleMouseLeave}
      className={classNames.root}
    >
      <Card
        className={classNames.card}
      >
        <Typography
          className={classNames.mediaHead}
        >{`Section ${props.section}`}</Typography>
        <CardMedia
          component="img"
          height="40%"
          image="https://gstatic.com/classroom/themes/img_graduation.jpg"
          alt="section k"
        />
        <CardContent>
          <Typography variant="body1">
            <b>Class Advisor:</b> {props.advisor}
          </Typography>
          <Typography
            variant="body2"
            color="primary"
            style={{ cursor: "pointer", marginTop: "5px" }}
          >
            {props.email}
          </Typography>
        </CardContent>
      </Card>
      <Card className={[classNames.card, classNames.back]}>
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
  );
};

export default SectionCard;
