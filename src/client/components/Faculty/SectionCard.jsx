import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { getUser, getExams} from "../../redux/selectors/code.selector";
import {useSelector } from "react-redux";
import examsModel from "../../../server/models/exams.model";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "auto",
    maxWidth: "270px",
    height: "300px",
    minWidth: "250px",
    margin: "25px",
    position: "relative",
    // cursor: "pointer",
  },
  text:{
    marginTop:"5px !important",
  },
  icon: {
    position: "absolute",
    right: "0px",
    marginTop: "12px !important",
    marginRight: "6px !important",
    color: "white",
    cursor: "pointer"
  },
  mediaHead: {
    position: "absolute",
    color: "white",
    padding: "15px",
    fontSize: "18px",
    width: "200px !important"
  },
}));

const SectionCard = ({ props }) => {
  const user = useSelector(getUser);
  const classNames = useStyles();
  const exams = useSelector(getExams);
  // console.log(props);
  return (
    <Card className={classNames.card}>
      {(user.role === "faculty")&&(
      <CloseIcon className={classNames.icon} onClick={(e)=> {console.log(examsModel.find({ id: props.data._id }))}}/>)}
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
          <b>Exam Type :</b> {props.data.name}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Date :</b> {props.data.date}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Time :</b> {props.data.time}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Duration :</b> {props.data.duration}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Max Marks :</b> {props.data.marks}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
