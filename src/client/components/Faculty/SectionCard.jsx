import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { getUser, getExams } from "../../redux/selectors/code.selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadExams } from "../../redux/actions/code.action";
import { deleteOneByID } from "../../api/exam.api";
import { fetchCardDetails } from "../../api/utilities.api";
// import examsModel from "../../../server/models/exams.model.js";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "auto",
    maxWidth: "270px",
    height: "300px",
    minWidth: "250px",
    margin: "25px",
    position: "relative",
    boxShadow: "0px 0px 7px 0px rgba(0,0,0,0.2)",
    // cursor: "pointer",
  },
  text: {
    marginTop: "5px !important",
  },
  icon: {
    position: "absolute",
    right: "0px",
    marginTop: "12px !important",
    marginRight: "6px !important",
    color: "white",
    cursor: "pointer",
  },
  mediaHead: {
    position: "absolute",
    color: "white",
    padding: "15px",
    fontSize: "18px",
    width: "200px !important",
    textTransform: "capitalize",
  },
}));

const SectionCard = ({ props, calcTime }) => {
  const user = useSelector(getUser);
  const classNames = useStyles();
  const dispatch = useDispatch();
  const exams = useSelector(getExams);
  return (
    <Card className={classNames.card}>
      {user.role === "faculty" && (
        <CloseIcon
          className={classNames.icon}
          onClick={() => {
            var r = window.confirm("Do you want to delete?");
            if (r === true) {
              deleteOneByID(props._id);
              fetchCardDetails(user._id, user.role).then((res) => {
                let curExams = [];
                if (user.role === "faculty") {
                  res.exams.forEach((data) => {
                    dispatch(loadExams(calcTime(curExams, data)));
                  });
                } else {
                  dispatch(loadExams(calcTime(curExams, res.exams)));
                }
              });
            }
          }}
        />
      )}
      <Typography className={classNames.mediaHead}>
        {`Section ${props.section}, ${props.year} year`}
        <br />
        {props.subject}
      </Typography>
      <CardMedia
        component="img"
        height="40%"
        image="https://gstatic.com/classroom/themes/img_graduation.jpg"
        alt="section k"
      />
      <CardContent>
        <Typography variant="body2" className={classNames.text}>
          <b>Exam Type :</b> {props.name}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Date :</b> {props.date}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Time :</b> {props.time}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Duration :</b> {`${props.duration} min.`}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Max Marks :</b>{" "}
          {props.objMarks * props.objectCount +
            props.codingMarks * props.codingCount}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
