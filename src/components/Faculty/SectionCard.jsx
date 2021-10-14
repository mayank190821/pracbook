import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "auto",
    maxWidth: "270px",
    height: "300px",
    minWidth: "250px",
    margin: "25px",
    position: "relative",
    cursor: "pointer",
  },
  text:{
    marginTop:"5px !important",
  },
  iconButton: {
    position: "absolute !important",
    color: "white !important",
    width: "100%",
    top:"0px !important",
  },
  icon: {
    position: "absolute",
    right: "0px",
    marginTop: "12px !important",
    marginRight: "6px !important",
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
  
  return (
      
      <Card
        className={classNames.card}>
        <IconButton
        aria-label="delete exam"
        className={classNames.iconButton}
      >
        <CloseIcon className={classNames.icon} />
      </IconButton>
        <Typography
          className={classNames.mediaHead}
        >{`Section ${props.data.section}`}<br/>
        {props.data.subject}</Typography>
        <CardMedia
          component="img"
          height="40%"
          image="https://gstatic.com/classroom/themes/img_graduation.jpg"
          alt="section k"
        />
        <CardContent>
          <Typography variant="body2"
          className={classNames.text}>
            Exam Type : {props.data.exam}
          </Typography>
          <Typography variant="body2"
          className={classNames.text}>
            Date : {props.data.date}
          </Typography>
          <Typography variant="body2"
          className={classNames.text}>
            Time : {props.data.time}
          </Typography>
          <Typography variant="body2"
          className={classNames.text}>
            Duration : {props.data.length}
          </Typography>
          <Typography variant="body2"
          className={classNames.text}>
            Max Marks : {props.data.marks}
          </Typography>
        </CardContent>
      </Card>
  );
};

export default SectionCard;
