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
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { addVivaQuestion } from "../../api/exam.api";

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
    height: `${theme.spacing(10)} !important`,
  },
  topicname:{
    width: "100%",
    margin: theme.spacing(0, 2),
    outline: "none",
    resize: "none",
    overflowWrap: "break-word !important",
    height: "50px !important"
  }
}));

export default function AddQuestion({ handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  // const isStepOptional = (step) => {
  //   return step === 1;
  // };

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
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const handleReset = () => {
    setActiveStep(0);
  };


  const classNames = useStyles();
  const [QuestionType, setQuestionType] = useState("Objective");
  const [difficulty, setDifficultyLevel] = useState("easy");
  // const [options, setOptions] = useState(["", "", "", ""]);

  function handleChange(event) {
    setQuestionType(event.target.value);
  }

  function handleDifficultyChange(event) {
    setDifficultyLevel(event.target.value);
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
              <textarea className={classNames.topicname} onChange={(e) => setVivaData({ ...setVivaData, topicName: e.target.value })} />
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
              <Button onClick={() => {addVivaQuestion(vivaData); handleClose();}}>Agree</Button>
            </DialogActions>
          </Box>
        ) : (
          <Box sx={{ width: '100%', padding: "10" }}>
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
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
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
                            sx={{padding:"10px !important"}}
                          >
                            <Typography
                              style={{
                                lineHeight: "48px",
                                width: "100px",
                              }}
                            >
                              Name:
                            </Typography>
                            <textarea className={classNames.textArea} />
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "100px",
                              }}
                            >
                              Question:
                            </Typography>
                            <textarea className={classNames.textArea} />
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
                                width: "100px",
                              }}
                            >
                              Constraints:
                            </Typography>
                            <textarea className={classNames.textArea} />
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "100px",
                              }}
                            >
                              Input Format:
                            </Typography>
                            <textarea className={classNames.textArea} />
                          </InputBox>
                          <InputBox>
                            <Typography
                              style={{
                                // lineHeight: "48px",
                                width: "100px",
                              }}
                            >
                              Output Format:
                            </Typography>
                            <textarea className={classNames.textArea} />
                          </InputBox>
                        </React.Fragment>
                      );
                    } else {
                      return <div>catch all</div>;
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
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        )}
      </Dialog>
    </div>
  );
}
