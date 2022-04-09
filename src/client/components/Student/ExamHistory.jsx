import React from "react";
import StudentMarksCard from "./StudentMarksCard";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import image from "../../images/exam.png";
import { fetchCompletedExams } from "../../api/utilities.api";
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

  React.useEffect(() => {
    let values = [],
      marks;
    fetchCompletedExams(user._id)
      .then((res) => {
        return res.exams;
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
            dateTime: curExam.dateTime,
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
