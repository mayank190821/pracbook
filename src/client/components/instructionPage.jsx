import React , {useEffect} from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import {Redirect, useParams} from "react-router-dom";
import image from "./../images/pracbook.png";
import { fetchExam, fetchExamQuestion } from "../api/exam.api";
import {useDispatch} from "react-redux";
import {saveQuestion} from "../redux/actions/code.action";
const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(90deg,white 40%,#d1d1d147 40% 100%)",
        display:"flex",
        paddingTop:"3%",
        paddingLeft:"0",
        justifyContent:"space-around"
    },
    logo: {
        width: "200px",
        height: "50px"
    },
    container1:{
        paddingLeft:"3%",
        paddingRight:"2%",
        width:"40%",
    },
    welcome:{
        marginTop:"30%",
        fontSize:"40px",
        lineHeight:"1.5",
        fontWeight:"800",
        fontFamily: "georgia, Georgia",
        marginBottom:"20%"
    },
    container2:{
        width:"60%",
        height:"100%",
        paddingRight:"4%",
        fontFamily: "georgia, Georgia",
        paddingTop:"10%",
        fontSize:"22px",
        paddingLeft:"4%",
        "& >h1":{
            marginBottom:"3%",
            color:theme.palette.primary.dark,
        },
        "& >ol>li":{
            lineHeight:"2",
            fontSize:"16px"
        },
        "& >button":{
            marginTop:"3%",
            // backgroundColor:theme.palette.primary.dark,
        }
    },
    time:{
        color:"grey",
        marginBottom:"2%",
        fontSize:"20px",
    },
    ques:{
        color:"grey",
        marginTop:"2%",
        fontSize:"20px"
    }
}));
export default function InstructionPage() {
    const classNames = useStyles();
    const dispatch = useDispatch();
    const [redirect, setRedirect] = React.useState(false);
    const {examId} = useParams();

    function handleClick(event){
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
      });
    const [questions, setQuestions] = React.useState([]);

    useEffect(() => {
        fetchExam(examId).then((exam) => {
            setExam(exam);
            if(questions.length === 0){
                for(let i = 0 ; i < exam.questionIds.length; i++){
                    fetchExamQuestion(exam.questionIds[i]).then(async (response) => {
                        let currentQues = questions;
                        currentQues.push(response.question);
                        setQuestions(currentQues);
                        dispatch(saveQuestion(currentQues));
                    })
                }   
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(redirect){
        return <Redirect to={`/exam/${examId}`}/>
    }
    return (
        <>
            <div className={classNames.mainContainer}>
                <div className={classNames.container1}>
                    <img alt="Pracbook" className={classNames.logo} src={image}/>
                    <p className={classNames.welcome}>
                        Welcome To Pracbook Go For Assessment
                    </p>
                    <p className={classNames.time}>Test Duration: {exam.duration} min</p>
                    <p className={classNames.ques}>No. of questions: {exam.questionIds.length}</p>
                    <p className={classNames.ques}>Max. Marks: {exam.marks}</p>
                </div>
                <div className={classNames.container2}>
                    <h1>Intructions</h1>
                    <ol>
                        <li>This is a timed test. Please make sure you are not interrupted during the test, as the timer cannot be paused once started.
                        </li>
                        <li>Please ensure you have a stable internet connection.
                        </li>
                    </ol>
                    <Button variant="contained" color="primary" onClick={handleClick}>Continue</Button>
                </div>

            </div>
        </>
    );
};