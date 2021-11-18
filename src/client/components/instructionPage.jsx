import React from "react";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";

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
    container1:{
        paddingLeft:"3%",
        paddingRight:"2%",
        width:"40%",
        "& > h1":{
            color:"blue",
        }
    },
    welcome:{
        marginTop:"30%",
        fontSize:"40px",
        lineHeight:"1.5",
        fontWeight:"800",
        fontFamily:"arial",
        marginBottom:"20%"
    },
    container2:{
        width:"60%",
        height:"100%",
        paddingRight:"4%",
        paddingTop:"10%",
        fontSize:"22px",
        paddingLeft:"4%",
        "& >h1":{
            marginBottom:"3%",
            color:"blue",
        },
        "& >ol>li":{
            lineHeight:"2",
            fontSize:"16px"
        },
        "& >button":{
            marginTop:"3%"
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
    var time = 50;
    var ques = 5;
    return (
        <>
            <div className={classNames.mainContainer}>
                <div className={classNames.container1}>
                    <h1>Pracbook</h1>
                    <p className={classNames.welcome}>
                        Welcome To Pracbook Go For Assement
                    </p>
                    <p className={classNames.time}>Test Duration:- {time} min</p>
                    <p className={classNames.ques}>No. of questions:- {ques}</p>
                </div>
                <div className={classNames.container2}>
                    <h1>Intructions</h1>
                    <ol>
                        <li>This is a timed test. Please make sure you are not interrupted during the test, as the timer cannot be paused once started.
                        </li>
                        <li>Please ensure you have a stable internet connection.
                        </li>
                    </ol>
                    <Button style ={{backgroundColor:"blue", color:"white"}}>Continue</Button>
                </div>

            </div>
        </>
    );
};