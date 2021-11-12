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
    <Card className={classNames.card}>
        <CloseIcon className={classNames.icon} />
      <Typography className={classNames.mediaHead}>
        {`Section ${props.data.section}`}
        <br />
        {props.data.subject}
      </Typography>
      <CardMedia
        component="img"
        height="40%"
        image="https://gstatic.com/classroom/themes/img_graduation.jpg"
        alt="section k"
      />
      <CardContent>
        <Typography variant="body2" className={classNames.text}>
          <b>Exam Type :</b> {props.data.exam}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Date :</b> {props.data.date}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Time :</b> {props.data.time}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Duration :</b> {props.data.length}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Max Marks :</b> {props.data.marks}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SectionCard;