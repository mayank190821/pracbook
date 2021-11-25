import React from "react";
import StudentMarksCard from "./StudentMarksCard";
import { makeStyles } from "@mui/styles";
import image from "../../images/exam.png";
import { fetchExamById } from "../../api/utilities.api";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selectors/code.selector";

const useStyles = makeStyles((theme) => ({
  empty: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#f1f2f6",
  },
  cards: {
    display: "flex",
    flexWrap: "wrap",
    overflowY: "scroll !important",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    paddingBottom: "10vh",
    zIndex: "3",
    height: "100vh",
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
  const [data, setData] = React.useState([
    {
      name: "",
      date: "",
      duration: 0,
      subject: "",
      marksObtained: 0,
      section: "",
      time: "",
      marks: 0,
    },
  ]);

  React.useEffect(() => {
    let values = [];
    user.exams.forEach((exam, index) => {
      fetchExamById(exam.examId).then((examData) => {
        values.unshift({
          name: examData.name,
          subject: examData.subject,
          marksObtained: exam.result.marksObtained,
          section: examData.section,
          date: examData.date,
          time: examData.time,
          duration: examData.duration,
          marks: examData.marks,
        });
        setData([...values]);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classNames.cards}>
      {!data || !data[0] || data.length === 0 ? (
        <div className={classNames.empty}>
          <div className={classNames.imageContainer}>
            <img alt="No Class" src={image} className={classNames.image}></img>
            <h2 className={classNames.emptyHeading}>No Exam History</h2>
          </div>
        </div>
      ) : (
        <>
          {data.map((data, index) => {
            let key = Math.round(Math.random() * 200);
            return <StudentMarksCard key={`${key}`} props={{ data: data }} />;
          })}
        </>
      )}
    </div>
  );
};

export default History;
