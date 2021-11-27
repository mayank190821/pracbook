import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { Redirect, useParams } from "react-router-dom";
import image from "./../images/pracbook.png";
import { fetchExam, fetchExamQuestion } from "../api/exam.api";
import { useDispatch } from "react-redux";
import { fetchQuesDetails, fetchCpQuesDetails } from "../api/utilities.api";
import { saveQuestion } from "../redux/actions/code.action";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(90deg,white 40%,#d1d1d147 40% 100%)",
    display: "flex",
    paddingTop: "3%",
    paddingLeft: "0",
    justifyContent: "space-around",
  },
  logo: {
    width: "200px",
    height: "50px",
  },
  container1: {
    paddingLeft: "3%",
    paddingRight: "2%",
    width: "40%",
  },
  welcome: {
    marginTop: "30%",
    fontSize: "40px",
    lineHeight: "1.5",
    fontWeight: "800",
    fontFamily: "georgia, Georgia",
    marginBottom: "20%",
  },
  container2: {
    width: "60%",
    height: "100%",
    paddingRight: "4%",
    fontFamily: "georgia, Georgia",
    paddingTop: "10%",
    fontSize: "22px",
    paddingLeft: "4%",
    "& >h1": {
      marginBottom: "3%",
      color: theme.palette.primary.dark,
    },
    "& >ol>li": {
      lineHeight: "2",
      fontSize: "16px",
    },
    "& >button": {
      marginTop: "3%",
      // backgroundColor:theme.palette.primary.dark,
    },
  },
  time: {
    color: "grey",
    marginBottom: "2%",
    fontSize: "20px",
  },
  ques: {
    color: "grey",
    marginTop: "2%",
    fontSize: "20px",
  },
}));
export default function InstructionPage() {
  const classNames = useStyles();
  const dispatch = useDispatch();
  const [redirect, setRedirect] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);
  const { examId } = useParams();

  function handleClick(event) {
    event.preventDefault();
    setRedirect(true);
  }
  const [exam, setExam] = React.useState({
    name: "",
    subject: "",
    duration: 0,
    marks: 0,
    instruction: "",
    questionIds: [],
    objectCount: 0,
    codingCount: 0,
  });
  const [questions, setQuestions] = React.useState([]);

  useEffect(() => {
    fetchExam(examId).then((curExam) => {
      let questionIds = [];
      fetchQuesDetails().then((res) => {
        // console.log(res.questions, res.questions.length);
        let number = Math.floor(Math.random() * res.questions.length);
        let count = 0;
        let visited = new Array(res.questions.length).fill(false);
        // console.log(visited + " " + number + "/ " + curExam.objectCount);
        for (
          let i = number;
          count < curExam.objectCount;
          i = (i + number) % res.questions.length
        ) {
          if (!visited[i]) {
            visited[i] = true;
            questionIds.push(res.questions[i].questionId);
            count++;
          } else {
            i++;
          }
        }
      });
      fetchCpQuesDetails().then((res) => {
        // console.log(res.questions, res.questions.length);
        let number = Math.floor(Math.random() * res.questions.length);
        let count = 0;
        let visited = new Array(res.questions.length).fill(false);
        console.log(visited + " " + number + "/ " + curExam.codingCount);
        for (
          let i = number;
          count < curExam.codingCount;
          i = (i + number) % res.questions.length
        ) {
          if (!visited[i]) {
            visited[i] = true;
            questionIds.push(res.questions[i].questionId);
            count++;
          } else {
            i++;
          }
        }
        curExam.questionIds = questionIds;
        sessionStorage.setItem("TQID", questionIds.toString());
        setFetched(true);
        setExam(curExam);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(exam);
    if (questions.length === 0 && exam.questionIds.length !== 0) {
      for (let i = 0; i < exam.questionIds.length; i++) {
        fetchExamQuestion(exam.questionIds[i]).then(async (response) => {
          let currentQues = questions;
          currentQues.push(response.question);
          setQuestions(currentQues);
          dispatch(saveQuestion(currentQues));
        });
      }
    }
  }, [exam]);

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: `/exam/${examId}`,
          state: { duration: exam.duration },
        }}
      />
    );
  }
  return (
    <>
      <div className={classNames.mainContainer}>
        <div className={classNames.container1}>
          <img alt="Pracbook" className={classNames.logo} src={image} />
          <p className={classNames.welcome}>
            Welcome To Pracbook Go For Assessment
          </p>
          <p className={classNames.time}>Test Duration: {exam.duration} min</p>
          <p className={classNames.ques}>
            No. of questions:{" "}
            {parseInt(exam.objectCount) + parseInt(exam.codingCount)}
          </p>
          <p className={classNames.ques}>Max. Marks: {exam.marks}</p>
        </div>
        <div className={classNames.container2}>
          <h1>Intructions</h1>
          <ol>
            <li>
              This is a timed test. Please make sure you are not interrupted
              during the test, as the timer cannot be paused once started.
            </li>
            <li>Please ensure you have a stable internet connection.</li>
          </ol>
          {fetched ? (
            <Button
              variant="contained"
              style={{ marginTop: "40px" }}
              color="primary"
              onClick={handleClick}
            >
              Start Exam
            </Button>
          ) : (
            <Typography
              variant="h6"
              color="primary"
              style={{ marginTop: "40px" }}
            >
              Fetching Questions..
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}
