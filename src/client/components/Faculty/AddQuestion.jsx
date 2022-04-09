import React, { useState, forwardRef } from "react";
import {
  Button,
  Dialog,
  TextField,
  MenuItem,
  DialogActions,
  Slide,
  Box,
  Badge,
  Typography,
  RadioGroup,
  IconButton,
  Radio,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Link,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { addVivaQuestion, addCodingQuestion } from "../../api/exam.api";
import { Add } from "@mui/icons-material";

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
    value: "Easy",
    label: "Easy",
  },
  {
    value: "Medium",
    label: "Medium",
  },
  {
    value: "Hard",
    label: "Hard",
  },
];

const steps = ["Problem", "Format", "Sample Cases", "Test Cases"];

const InputBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "16px",
  paddingBottom: "0px",
}));

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "20px !important",
  },
  input: {
    padding: "0px !important",
    margin: `${theme.spacing(1)} !important`,
  },
  textArea: {
    width: "100%",
    outline: "none",
    resize: "none",
    overflowWrap: "break-word !important",
    height: `${theme.spacing(7)} !important`,
  },
  topicname: {
    width: "100%",
    outline: "none",
    resize: "none",
    overflowWrap: "break-word !important",
    height: "50px !important",
  },
}));

export default function AddQuestion({ handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (event) => {
    event.preventDefault();
    const formId = document.getElementById("add_ques_form");
    formId.checkValidity();
    if (formId.reportValidity()) {
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
        handleClose();
        <Link to={{ pathname: "/login/QuestionCard" }} />;
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const classNames = useStyles();
  const [QuestionType, setQuestionType] = useState("Objective");
  const [difficulty, setDifficultyLevel] = useState("easy");

  function handleChange(event) {
    setQuestionType(event.target.value);
  }

  function handleDifficultyChange(event) {
    setDifficultyLevel(event.target.value);
    setCodeProbData({ ...codeProbData, difficulty: event.target.value });
  }

  const [vivaData, setVivaData] = useState({
    topicName: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  });
  const [answer, setAnswer] = useState("PR#BK");
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
  });

  const [sampInput, setSampInput] = useState("");
  const [sampOutput, setSampOutput] = useState("");
  const [sampInputTestCases, setSampInputTestCases] = useState("");
  const [sampOutputTestCases, setSampOutputTestcases] = useState("");

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
        <form className={classNames.form} id="add_ques_form">
          <TextField
            id="filled-select-currency"
            select
            className={classNames.input}
            label="Question Type "
            value={QuestionType}
            size="small"
            required
            onChange={handleChange}
            variant="filled"
          >
            {types.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Typography
            style={{
              lineHeight: "42px",
            }}
          >
            Topic Name :
          </Typography>
          <textarea
            required
            className={classNames.topicname}
            onChange={(e) => {
              setVivaData({ ...vivaData, topicName: e.target.value });
              setCodeProbData({ ...codeProbData, type: e.target.value });
            }}
          />
          {QuestionType === "Objective" ? (
            <Box component="div" spacing={3} autoComplete="off">
              <Typography
                style={{
                  lineHeight: "48px",
                }}
              >
                Question :
              </Typography>
              <textarea
                required
                id="new-one"
                className={classNames.textArea}
                onChange={(e) =>
                  setVivaData({ ...setVivaData, question: e.target.value })
                }
              />
              <Typography
                style={{
                  lineHeight: "42px",
                }}
              >
                {" "}
                Options :
              </Typography>
              <Box style={{ marginLeft: "20px" }}>
                <TextField
                  className={classNames.input}
                  label="Option A "
                  value={vivaData.option1}
                  size="small"
                  onChange={(e) =>
                    setVivaData({ ...vivaData, option1: e.target.value })
                  }
                  variant="filled"
                  required
                />
                <TextField
                  className={classNames.input}
                  label="Option B "
                  value={vivaData.option2}
                  size="small"
                  onChange={(e) =>
                    setVivaData({ ...vivaData, option2: e.target.value })
                  }
                  variant="filled"
                  required
                />
                <br />
                <TextField
                  className={classNames.input}
                  label="Option C "
                  value={vivaData.option3}
                  size="small"
                  onChange={(e) =>
                    setVivaData({ ...vivaData, option3: e.target.value })
                  }
                  variant="filled"
                  required
                />
                <TextField
                  className={classNames.input}
                  label="Option D "
                  value={vivaData.option4}
                  size="small"
                  onChange={(e) =>
                    setVivaData({ ...vivaData, option4: e.target.value })
                  }
                  variant="filled"
                  required
                />
              </Box>
              <Typography
                style={{
                  lineHeight: "42px",
                }}
              >
                Answer :
              </Typography>
              <RadioGroup
                row
                aria-label="Choose Answer"
                name="answer"
                spacing="auto"
                value={answer}
                required
                onChange={(event) => {
                  setAnswer(event.target.value);
                }}
              >
                <FormControlLabel
                  value={vivaData.option1}
                  control={<Radio required={true} />}
                  label="A"
                />
                <FormControlLabel
                  value={vivaData.option2}
                  control={<Radio required={true} />}
                  label="B"
                />
                <FormControlLabel
                  value={vivaData.option3}
                  control={<Radio required={true} />}
                  label="C"
                />
                <FormControlLabel
                  value={vivaData.option4}
                  control={<Radio required={true} />}
                  label="D"
                />
              </RadioGroup>
              <DialogActions>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={(event) => {
                    event.preventDefault();
                    const formId = document.getElementById("add_ques_form");
                    formId.checkValidity();
                    if (formId.reportValidity()) {
                      let data = vivaData;
                      data.answer = answer;
                      addVivaQuestion(data);
                      handleClose();
                    }
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </Box>
          ) : (
            <Box
              sx={{ width: "100%", padding: "10" }}
              style={{ marginTop: "20px" }}
            >
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
                            required
                          >
                            {difficulties.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <Typography
                            style={{
                              lineHeight: "42px",
                            }}
                          >
                            Name:
                          </Typography>
                          <textarea
                            required
                            className={classNames.textArea}
                            onChange={(e) =>
                              setCodeProbData({
                                ...codeProbData,
                                name: e.target.value,
                              })
                            }
                          />
                          <Typography
                            style={{
                              lineHeight: "42px",
                            }}
                          >
                            Question:
                          </Typography>
                          <textarea
                            required
                            className={classNames.textArea}
                            onChange={(e) =>
                              setCodeProbData({
                                ...codeProbData,
                                problemStatement: e.target.value,
                              })
                            }
                          />
                        </React.Fragment>
                      );
                    } else if (activeStep === 1) {
                      return (
                        <React.Fragment>
                          <Typography
                            style={{
                              lineHeight: "42px",
                            }}
                          >
                            Constraints:
                          </Typography>
                          <textarea
                            required
                            className={classNames.textArea}
                            onChange={(e) =>
                              setCodeProbData({
                                ...codeProbData,
                                constraints: e.target.value,
                              })
                            }
                          />
                          <Typography
                            style={{
                              lineHeight: "42px",
                            }}
                          >
                            Input Format:
                          </Typography>
                          <textarea
                            required
                            className={classNames.textArea}
                            onChange={(e) =>
                              setCodeProbData({
                                ...codeProbData,
                                inputFormat: e.target.value,
                              })
                            }
                          />
                          <Typography
                            style={{
                              lineHeight: "42px",
                            }}
                          >
                            Output Format:
                          </Typography>
                          <textarea
                            required
                            className={classNames.textArea}
                            onChange={(e) =>
                              setCodeProbData({
                                ...codeProbData,
                                outputFormat: e.target.value,
                              })
                            }
                          />
                        </React.Fragment>
                      );
                    } else if (activeStep === 2) {
                      return (
                        <>
                          <InputBox>
                            <Typography
                              style={{
                                width: "120px",
                              }}
                            >
                              Sample Input:
                            </Typography>
                            <textarea
                              className={classNames.textArea}
                              onChange={(e) => setSampInput(e.target.value)}
                              value={sampInput}
                            />
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                if (sampInput !== "") {
                                  setCodeProbData({
                                    ...codeProbData,
                                    sampleInput: [
                                      ...codeProbData.sampleInput,
                                      sampInput,
                                    ],
                                  });
                                  setSampInput("");
                                }
                              }}
                            >
                              <Badge
                                badgeContent={codeProbData.sampleInput.length}
                              >
                                <Add />
                              </Badge>
                            </IconButton>
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                width: "120px",
                              }}
                            >
                              Sample Output:
                            </Typography>
                            <textarea
                              className={classNames.textArea}
                              onChange={(e) => setSampOutput(e.target.value)}
                              value={sampOutput}
                            />
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => {
                                if (sampOutput !== "") {
                                  setCodeProbData({
                                    ...codeProbData,
                                    sampleOutput: [
                                      ...codeProbData.sampleOutput,
                                      sampOutput,
                                    ],
                                  });
                                  setSampOutput("");
                                }
                              }}
                            >
                              <Badge
                                badgeContent={codeProbData.sampleOutput.length}
                              >
                                <Add />
                              </Badge>
                            </IconButton>
                          </InputBox>
                          <Typography
                            style={{
                              lineHeight: "42px",
                            }}
                          >
                            Explanation:
                          </Typography>
                          <textarea
                            required
                            style={{ display: "flex" }}
                            className={classNames.textArea}
                            onChange={(e) =>
                              setCodeProbData({
                                ...codeProbData,
                                explanation: e.target.value,
                              })
                            }
                          />
                        </>
                      );
                    } else {
                      return (
                        <>
                          <InputBox>
                            <Typography
                              style={{
                                width: "120px !important",
                                marginRight: "5px",
                              }}
                            >
                              Input Test Cases:
                            </Typography>
                            <textarea
                              className={classNames.textArea}
                              onChange={(e) =>
                                setSampInputTestCases(e.target.value)
                              }
                              value={sampInputTestCases}
                            />
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={(e) => {
                                if (sampInputTestCases !== "") {
                                  setCodeProbData({
                                    ...codeProbData,
                                    inputTestCases: [
                                      ...codeProbData.inputTestCases,
                                      sampInputTestCases,
                                    ],
                                  });
                                  setSampInputTestCases("");
                                }
                              }}
                            >
                              <Badge
                                badgeContent={
                                  codeProbData.inputTestCases.length
                                }
                              >
                                <Add />
                              </Badge>
                            </IconButton>
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                width: "120px !important",
                              }}
                            >
                              Output Test Cases:
                            </Typography>
                            <textarea
                              className={classNames.textArea}
                              onChange={(e) =>
                                setSampOutputTestcases(e.target.value)
                              }
                              value={sampOutputTestCases}
                            />
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={(e) => {
                                if (sampOutputTestCases !== "") {
                                  setCodeProbData({
                                    ...codeProbData,
                                    outputTestCases: [
                                      ...codeProbData.outputTestCases,
                                      sampOutputTestCases,
                                    ],
                                  });
                                  setSampOutputTestcases("");
                                }
                              }}
                            >
                              <Badge
                                badgeContent={
                                  codeProbData.outputTestCases.length
                                }
                              >
                                <Add />
                              </Badge>
                            </IconButton>
                          </InputBox>
                        </>
                      );
                    }
                  })()}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button onClick={handleNext} type="submit">
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            </Box>
          )}
        </form>
      </Dialog>
    </div>
  );
}
