import React from "react";
import StudentMarksCard from "./StudentMarksCard";
import { makeStyles } from "@mui/styles";
import image from "../../images/exam.png";
import {
  fetchCardDetails,
  fetchExamById,
  fetchResultByStudentId,
} from "../../api/utilities.api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadExams } from "../../redux/actions/code.action";
import { getExams } from "../../redux/selectors/code.selector";
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
  const dispatch = useDispatch();
  const exams = useSelector(getExams);
  // let examsData = [];
  const [examsData,setExamsData] = React.useState([]);
  const [data, setData] = React.useState([
    {
    //   name: "",
    //   date: "",
    //   duration: 0,
    //   subject: "",
    //   marksObtained: 0,
    //   section: "",
    //   time: "",
    //   marks:0
    },
  ]);
  const [value,setValue] = React.useState([]);
  React.useEffect(() => {
    fetchResultByStudentId("619407cc3adbf0d2b8a17882").then((res) => {
      let data = res.exams;
      // console.log(data);
      res.exams.map((exam, index) => {
        console.log(exam);
        fetchExamById(exam.examId).then((examData) => {
          // console.log(examData.date); 
          // console.log(res.exams); 
          // console.log(res.exams[0].result.marksObtained)
          let values = examsData;
          values.push({
          "name": examData.name,
          "subject" : examData.subject,
            "marksObtained" : res.exams[index].result.marksObtained,
            "section" : examData.section,
            "date" : examData.date,
            "time" : examData.time,
            "duration" : examData.duration,
            "marks" : examData.marks,
        })        
        setExamsData(values);
        // console.log(value);
         
          // setData(examsData);
        //   console.log(data);
        });
      });

      //   console.log(res);
      //   dispatch(loadExams(res.exams));
    });
  }, []);


  React.useEffect(() => {
      // console.log(value);
    setExamsData(...examsData, value)
    // console.log(examsData)
  }, [value]);
  console.log(examsData);
  return (
    <div className={classNames.cards}>
      {!examsData || !examsData[0] || examsData.length === 0 ? (
        <div className={classNames.empty}>
          <div className={classNames.imageContainer}>
            <img alt="No Class" src={image} className={classNames.image}></img>
            <h2 className={classNames.emptyHeading}>No Exam History</h2>
          </div>
        </div>
      ) : (
        Array.from(examsData).map((dat, index) => {
          return (
            <StudentMarksCard
              key={`${dat.section}-${index}`}
              props={{ data: dat, i: index }}
            />
          );
          {
            /* }); */
          }
        })
      )}
    </div>
  );
};

export default History;
