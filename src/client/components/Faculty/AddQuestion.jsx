import React, { useState, forwardRef } from "react";
import {
  Button,
  Dialog,
  TextField,
  MenuItem,
  DialogActions,
  Slide,
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Link,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { addVivaQuestion, addCodingQuestion } from "../../api/exam.api";
import { EventNote } from "@mui/icons-material";
import QuestionCard from "./QuestionCard";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const types = [
  {
    value: "Objective",
    label: "Viva (Objective Type)",
  },
  {
    value: "Coding",
    label: "Coding Problem",
  },
];
const difficulties = [
  {
    value: "easy",
    label: "Easy",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "hard",
    label: "Hard",
  },
];

const steps = [
  "Problem",
  "Format",
  "Sample Cases",
  "Test Cases"
];

const InputBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "16px",
  paddingBottom: "0px",
}));

const useStyles = makeStyles((theme) => ({
  container: {
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      padding: "10px",
    },
  },
  input: {
    padding: "0px !important",
    maxWidth: "300px",
    margin: `${theme.spacing(1)} !important`,
  },
  textArea: {
    width: "100%",
    margin: theme.spacing(0, 2),
    outline: "none",
    resize: "none",
    overflowWrap: "break-word !important",
    height: `${theme.spacing(7)} !important`,
  },
  topicname: {
    width: "100%",
    margin: theme.spacing(0, 2),
    outline: "none",
    resize: "none",
    overflowWrap: "break-word !important",
    height: "50px !important"
  },
  button: {
    borderRadius: "50% !important",
    width: "20px !important",
    height: "50px !important",
    fontSize: "50px !important"
  },
}));

export default function AddQuestion({ handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());



  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === steps.length - 1) {
      addCodingQuestion(codeProbData);
      setCodeProbData({
        type: vivaData.topicName,
        difficulty: "easy",
        name: "",
        problemStatement: "",
        constraints: "",
        inputFormat: "",
        outputFormat: "",
        sampleInput: [],
        sampleOutput: [],
        explanation: "",
        inputTestCases: [],
        outputTestCases: [],
      });
      <Link to={{pathname: "/login/QuestionCard" }}/>
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
  };


  const classNames = useStyles();
  const [QuestionType, setQuestionType] = useState("Objective");
  const [difficulty, setDifficultyLevel] = useState("easy");


  function handleChange(event) {
    setQuestionType(event.target.value);
  }

  function handleDifficultyChange(event) {
    setDifficultyLevel(event.target.value);
    setCodeProbData({ ...codeProbData, difficulty: event.target.value })
    console.log(codeProbData)
    handleClose();
  }

  const [vivaData, setVivaData] = useState({
    topicName: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  })

  const [codeProbData, setCodeProbData] = useState({
    type: vivaData.topicName,
    difficulty: "easy",
    name: "",
    problemStatement: "",
    constraints: "",
    inputFormat: "",
    outputFormat: "",
    sampleInput: [],
    sampleOutput: [],
    explanation: "",
    inputTestCases: [],
    outputTestCases: [],
  })

  const [sampInput, setSampInput] = useState("");
  const [sampOutput, setSampOutput] = useState("");
  const [sampInputTestCase, setSampInputTestCases] = useState("");
  const [sampOutputTestCase, setSampOutputTestcase] = useState("");

  return (
    <div>
      <Dialog
        open={true}
        className={classNames.container}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <TextField
          id="filled-select-currency"
          select
          className={classNames.input}
          label="Question Type "
          value={QuestionType}
          size="small"
          onChange={handleChange}
          variant="filled"
        >
          {types.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <InputBox>
          <Typography
            style={{
              width: "100px",
            }}
          >
            Topic Name :
          </Typography>
          <textarea className={classNames.topicname} onChange={(e) => { setVivaData({ ...vivaData, topicName: e.target.value }); setCodeProbData({ ...codeProbData, type: e.target.value }) }} />
        </InputBox>
        {QuestionType === "Objective" ? (
          <Box component="form" spacing={3} noValidate autoComplete="off">

            <InputBox>
              <Typography
                style={{
                  lineHeight: "48px",
                  width: "100px",
                }}
              >
                Question :
              </Typography>
              <textarea className={classNames.textArea} onChange={(e) => setVivaData({ ...setVivaData, question: e.target.value })} />
            </InputBox>
            <InputBox>
              <Typography>Options :</Typography>
              <Box style={{ marginLeft: "20px" }}>
                <TextField
                  className={classNames.input}
                  label="Option A "
                  value={vivaData.option1}
                  size="small"
                  onChange={(e) => setVivaData({ ...vivaData, option1: e.target.value })}
                  variant="filled"
                />
                <TextField
                  className={classNames.input}
                  label="Option B "
                  value={vivaData.option2}
                  size="small"
                  onChange={(e) => setVivaData({ ...vivaData, option2: e.target.value })}
                  variant="filled"
                />
                <br />
                <TextField
                  className={classNames.input}
                  label="Option C "
                  value={vivaData.option3}
                  size="small"
                  onChange={(e) => setVivaData({ ...vivaData, option3: e.target.value })}
                  variant="filled"
                />
                <TextField
                  className={classNames.input}
                  label="Option D "
                  value={vivaData.option4}
                  size="small"
                  onChange={(e) => setVivaData({ ...vivaData, option4: e.target.value })}
                  variant="filled"
                />
              </Box>
            </InputBox>
            <InputBox>
              <Typography style={{ lineHeight: "42px" }}>Answer :</Typography>
              <RadioGroup
                row
                aria-label="Choose Answer"
                name="answer"
                spacing="auto"
                value={vivaData.answer}
                onChange={(event) => setVivaData({ ...vivaData, answer: event.target.value })}
              >
                <FormControlLabel value="A" control={<Radio />} label="A" />
                <FormControlLabel value="B" control={<Radio />} label="B" />
                <FormControlLabel value="C" control={<Radio />} label="C" />
                <FormControlLabel value="D" control={<Radio />} label="D" />
              </RadioGroup>
              {vivaData.answer}
            </InputBox>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={() => { addVivaQuestion(vivaData); handleClose(); }}>Agree</Button>
            </DialogActions>
          </Box>
        ) : (
          <Box sx={{ width: '100%', padding: "10" }} style={{ marginTop: "20px" }}>
            <Stepper activeStep={activeStep} sx={{ margin: "10" }}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {(() => {
                    if (activeStep === 0) {
                      return (
                        <React.Fragment>
                          <TextField
                            id="outlined-select-language"
                            select
                            // variant="outlined"
                            size="small"
                            label="Difficulty"
                            value={difficulty}
                            onChange={handleDifficultyChange}
                            // helperText="Please select your language"
                            // className={classes.inputArea}
                            style={{ width: "100%", marginTop: "23px" }}
                          >
                            {difficulties.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <InputBox
                            sx={{ padding: "10px !important" }}
                          >
                            <Typography
                              style={{
                                lineHeight: "48px",
                                width: "120px",
                              }}
                            >
                              Name:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setCodeProbData({ ...codeProbData, name: e.target.value })} />
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "120px",
                              }}
                            >
                              Question:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setCodeProbData({ ...codeProbData, problemStatement: e.target.value })} />
                          </InputBox>
                        </React.Fragment>
                      );
                    } else if (activeStep === 1) {
                      return (
                        <React.Fragment>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "120px",
                              }}
                            >
                              Constraints:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setCodeProbData({ ...codeProbData, constraints: e.target.value })} />
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "120px",
                              }}
                            >
                              Input Format:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setCodeProbData({ ...codeProbData, inputFormat: e.target.value })} />
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "120px",
                              }}
                            >
                              Output Format:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setCodeProbData({ ...codeProbData, outputFormat: e.target.value })} />
                          </InputBox>
                        </React.Fragment>
                      );
                    } else if (activeStep == 2) {
                      return (
                        <>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "120px",
                              }}
                            >
                              Sample Input:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setSampInput(e.target.value)} value={sampInput} />
                            <Button className={classNames.button} variant="outlined" onClick={() => { setCodeProbData({ ...codeProbData, sampleInput: [...(codeProbData.sampleInput), sampInput] }); setSampInput("") }}> + </Button>
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "120px",
                              }}
                            >
                              Sample Output:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setSampOutput(e.target.value)} value={sampOutput} />
                            {/* <Button className = {classNames.button} variant="contained" color="success" onClick={() => { setCodeProbData({ ...codeProbData, sampleOutput: [...(codeProbData.sampleOutput), sampOutput] }); setSampOutput("") }}> + </Button> */}
                            <Button variant="outlined" className={classNames.button} onClick={() => { setCodeProbData({ ...codeProbData, sampleOutput: [...(codeProbData.sampleOutput), sampOutput] }); setSampOutput("") }}> + </Button>
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "120px",
                              }}
                            >
                              Explanation:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setCodeProbData({ ...codeProbData, explanation: e.target.value })} />
                          </InputBox>
                        </>
                      );
                    }
                    else {
                      return (
                        <>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "100px",
                              }}
                            >
                              Input Test Cases:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setSampInputTestCases(e.target.value)} value={sampInputTestCase} />
                            <Button variant="outlined" className={classNames.button} onClick={(e) => { setCodeProbData({ ...codeProbData, inputTestCases: [...(codeProbData.inputTestCases), sampInputTestCase] }); setSampInputTestCases("") }}> + </Button>
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "100px",
                              }}
                            >
                              Output Test Cases:
                            </Typography>
                            <textarea className={classNames.textArea} onChange={(e) => setSampOutputTestcase(e.target.value)} value={sampOutputTestCase} />
                            <Button variant="outlined" className={classNames.button} onClick={(e) => { setCodeProbData({ ...codeProbData, outputTestCases: [...(codeProbData.outputTestCases), sampOutputTestCase] }); setSampOutputTestcase("") }}> + </Button>
                          </InputBox>
                        </>
                      );
                    }
                  })()}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button onClick={handleNext} >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
          </Box>
        )}
      </Dialog>
    </div>
  );
}
