import React from "react";
import StudentMarksCard from "./StudentMarksCard";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import image from "../../images/exam.png";
import { fetchExamById, fetchCardDetails } from "../../api/utilities.api";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selectors/code.selector";

const useStyles = makeStyles((theme) => ({
  cards: {
    display: "flex",
    flexWrap: "wrap",
    overflowY: "scroll !important",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    paddingBottom: "20px",
    zIndex: "3",
    height: "100%",
  },
  imageContainer: {
    position: "absolute",
    margin: "auto",
    top: "0px",
    bottom: "0px",
    right: "0px",
    left: "0px",
    width: "50%",
    height: "60%",
  },
  image: {
    position: "absolute",
    margin: "auto",
    top: "0px",
    bottom: "0px",
    width: "100%",
    minHeight: "80%",
    right: "0px",
    left: "0px",
    transform: "scaleY(0.5) scaleX(0.7)",
  },
  head: {
    height: "20px !important",
    width: "100%",
    marginLeft: "20px",
    marginBottom: "20px",
  },
  emptyHeading: {
    textAlign: "center",
    position: "absolute",
    width: "100%",
    bottom: "10%",
    zIndex: "+3",
    fontFamily: "monospace",
  },
}));

const History = () => {
  const classNames = useStyles();
  const user = useSelector(getUser);
  const [data, setData] = React.useState([]);
  const [completedExams, setCompletedExams] = React.useState([]);

  const calcTime = (res) => {
    let exams = [];
    for (let i = 0; i < res.length; i++) {
      let date = new Date();
      let examDate =
        res[i].date.split("/")[2] +
        "-" +
        res[i].date.split("/")[0] +
        "-" +
        (parseInt(res[i].date.split("/")[1]) < 10
          ? `0${res[i].date.split("/")[1]}`
          : res[i].date.split("/")[1]) +
        "T";
      let hours = res[i].time.split(":")[0];
      if (res[i].time.split(" ")[1] === "PM") {
        if (parseInt(hours) !== 12) hours = (parseInt(hours) + 12).toString();
      } else if (parseInt(hours) === 12) hours = "00";
      let time = hours + ":" + res[i].time.split(" ")[0].split(":")[1] + ":00";
      let matcher = examDate + time;
      if (new Date(matcher) <= date) {
        res[i].started = true;
      }
      matcher = new Date(new Date(matcher).getTime() + res[i].duration * 60000);
      if (matcher <= date) {
        exams.push(res[i]);
      }
    }
    return exams;
  };

  React.useEffect(() => {
    let values = [],
      marks;
    fetchCardDetails(user._id, user.role)
      .then((res) => {
        return calcTime(res.exams);
      })
      .then((filteredExams) => {
        filteredExams.forEach((curExam) => {
          marks = -1;
          user.exams.forEach((exam, index) => {
            if (curExam._id === exam.examId) marks = exam.result.marksObtained;
          });
          if (marks === -1) marks = " Absent";
          values.unshift({
            name: curExam.name,
            subject: curExam.subject,
            marksObtained: marks,
            section: curExam.section,
            date: curExam.date,
            time: curExam.time,
            duration: curExam.duration,
            marks:
              curExam.objMarks * curExam.objectCount +
              curExam.codingMarks * curExam.codingCount,
          });
          setData([...values]);
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!data || !data[0] || data.length === 0 ? (
        <div className={classNames.empty}>
          <div className={classNames.imageContainer}>
            <img alt="No Class" src={image} className={classNames.image}></img>
            <h2 className={classNames.emptyHeading}>No Exam History</h2>
          </div>
        </div>
      ) : (
        <>
          <Typography variant="h5" className={classNames.head}>
            <b>Completed Exams</b>
          </Typography>
          <div className={classNames.cards}>
            {data.map((data, index) => {
              let key = Math.round(Math.random() * 200);
              return <StudentMarksCard key={`${key}`} props={{ data: data }} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default History;
