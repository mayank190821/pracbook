import React from "react";
import SectionMarksCard from "./StudentMarksCard";
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
  const [value,setValue] = React.useState({});
  React.useEffect(() => {
    fetchResultByStudentId("619407cc3adbf0d2b8a17882").then((res) => {
      let examsData = [];
      let data = res.exams;
      console.log(data);
      res.exams.map((exam, index) => {
        fetchExamById(exam.examId).then((examData) => {
          console.log(examData); 
          console.log(res.exams); 
        setValue({
            "examId" : examData.examId,
            "marksObtained" : res.exams.marks,
            "section" : exam.section,
            "date" : exam.date,
            "marks" : examData.marks,
        })        
        // console.log(value);
         
        //   setData(examsData);
        //   console.log(data);
        });
      });

      //   console.log(res);
      //   dispatch(loadExams(res.exams));
    });
  }, []);


//   React.useEffect(() => {
//       console.log(value);
//   }, [value]);

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
        Array.from(data).map((dat, index) => {
          {
            /* return Array.from(dat).map((da, jndex) => { */
          }
          return (
            <SectionMarksCard
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
