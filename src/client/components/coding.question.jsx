import React from 'react';
import { makeStyles } from "@mui/styles";
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getQuestion } from "../redux/selectors/code.selector";

const useStyle = makeStyles((theme) => ({
    container: {
        width: "100%",
        padding: "2%",
    },
    questionName: {
        marginBottom: "2%",
    },
    difficulty: {
        marginBottom: "2%",
        color: "#544c4c",
        fontWeight: "400",
    },
    contraints: {
        height: "15vh",
        background: "#e8e8e8",
        padding: "1%",
        width: "70%",
        marginBottom: "20px",
        marginTop: "20px"
    },
    sampleInput: {
        height: "15vh",
        background: "#e8e8e8",
        padding: "1%",
        width: "70%",
        marginBottom: "20px",
        marginTop: "20px"
    }

}));


export default function CodingQuestion() {
    const { ques } = useSelector(getQuestion);
        const questionName = ques[1].name;
        const difficulty = ques[1].difficulty;
        const statement = ques[1].problemStatement;
        const constraints = ques[1].contraints;
    const sampleInput = ques[1].sampleInput.map((data, index) => {
        return <Typography>data</Typography>;
    })
    const sampleOutput = ques[1].sampleOutput[0];
    const explanation = ques[1].explanation;
    const style = useStyle();
    return (
        <>
            <div className={style.container}>
                <h2 className={style.questionName}>{questionName}</h2>
                <h4 className={style.difficulty}>{difficulty}</h4>
                <div className={style.problemStatement}>
                    <Typography>
                        {statement}
                    </Typography>
                </div>
                <div className={style.contraints} style={{ "border": "1px solid #aaa4a4" }}>
                    {constraints}
                </div>
                <div className={style.sampleInput} style={{ "border": "1px solid #aaa4a4" }}>
                    {sampleInput}
                </div>
                <div className={style.sampleInput} style={{ "border": "1px solid #aaa4a4" }}>
                    {sampleOutput}
                </div>
                <div className={style.explanation}>
                    <Typography>
                        {explanation}
                    </Typography>
                </div>
            </div>
        </>
    )
}