import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "2%",
    "& *": {
      fontSize: "18px",
      fontFamily: "Times New Roman",
    },
    "& > h2": {
        fontSize: "22px",
    }
  },
  problemStatement: {
    fontSize: "18px",
    marginBottom: "20px",
    marginTop: "20px",
    width: "100% !important",
    whiteSpace: "pre-wrap",
  },
  questionName: {
    marginBottom: "2%",
  },
  difficulty: {
    marginBottom: "2%",
    color: "#544c4c",
    fontWeight: "400",
  },
  hr:{
      height: "1px", 
      backgroundColor: "rgba(150,150,150,0.3)", 
      border: "none"
  },
  constraints: {
    height: "fit-content",
    minHeight: "15vh",
    background: "#eeeeee",
    padding: "1%",
    width: "80%",
    marginBottom: "20px",
    marginTop: "20px",
  },
  inputFormat: {
    marginBottom: "20px",
  },
  sampleInput: {
    height: "fit-content",
    minHeight: "15vh",
    background: "#eeeeee",
    padding: "1%",
    width: "80%",
    marginBottom: "20px",
    marginTop: "20px",
    whiteSpace: "pre-wrap",
},
}));

export default function CodingQuestion({ ques }) {
    const style = useStyle();
  const sampleInput = (ques.sampleInput.length === 0) ? (<></>): ques.sampleInput.map((data, index) => {
    return (
      <>
        <b>{`Sample Input ${index}`}</b>
        <br />
        <pre  className={style.sampleInput}>{data}</pre>
        <hr className={style.hr}></hr>
      </>
    );
  });
  const sampleOutput = ques.sampleOutput.map((data, index) => {
    return (
      <>
        <b>{`Sample Output ${index}`}</b>
        <br />
        <pre className={style.sampleInput}>{data}</pre>
        <hr className={style.hr}></hr>
      </>
    );
  });
  return (
    <>
      <div className={style.container}>
        <h2 className={style.questionName}>{ques.name}</h2>
        <h4 className={style.difficulty}>{ques.difficulty}</h4>
        <hr className={style.hr}></hr>
        <pre className={style.problemStatement}>{ques.problemStatement}</pre>
        <hr className={style.hr}></hr>
        <br />
        <pre className={style.inputFormat}>
          <b>Input Format</b>
          <br />
          <br />
          {ques.inputFormat}
        </pre>
        <hr className={style.hr}></hr>
        <br />
        <div className={style.inputFormat}>
          <b>Output Format</b>
          <br />
          <br />
          {ques.outputFormat}
        </div>
        <hr className={style.hr}></hr>
        <br />
        <div>
          <b> Constraints</b>
          <br />
          <pre className={style.constraints}>{ques.constraints}</pre>
        </div>
        <hr className={style.hr}></hr>
        <br />
        <div>{sampleInput}</div>
        <br />
        <div>{sampleOutput}</div>
        <br />
        {ques.explanation.length !== 0 && (
            <pre className={style.problemStatement}>
              <b> Explanation</b>
              <br />
              <br />
              {ques.explanation}
            </pre>
        )}
      </div>
    </>
  );
}
