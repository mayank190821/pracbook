import React, {useEffect, useState} from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { getUser} from "../../redux/selectors/code.selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadExams } from "../../redux/actions/code.action";
import { deleteOneByID } from "../../api/exam.api";
import { fetchUpcomingExams } from "../../api/utilities.api";
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

const SectionCard = ({ props}) => {
  const user = useSelector(getUser);
  const classNames = useStyles();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function zeroPad(value){
    return (value<10)?"0"+value:value;
  }

  useEffect(() => {
    let date = new Date(new Date(props.dateTime).getTime());
    setDate(zeroPad(date.getDate())+"/"+zeroPad(date.getMonth()+1)+"/"+date.getFullYear());
    let h = date.getHours();
    setTime(((h===12 || h === 0)?12:zeroPad(h%12))+":"+zeroPad(date.getMinutes())+" "+((h<12)?"AM":"PM"));
  }, [props]);

  return (
    <Card className={classNames.card}>
      {user.role === "faculty" && (
        <CloseIcon
          className={classNames.icon}
          onClick={() => {
            var r = window.confirm("Do you want to delete?");
            if (r === true) {
              deleteOneByID(props._id);
              fetchUpcomingExams(user._id, user.role).then((res) => {
                  dispatch(loadExams(res.exams));
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
          <b>Date :</b> {date}
        </Typography>
        <Typography variant="body2" className={classNames.text}>
          <b>Time :</b> {time}
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
