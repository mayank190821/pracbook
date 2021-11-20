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
}));

export default function AddQuestion({ handleClose }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

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

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const classNames = useStyles();
  const [QuestionType, setQuestionType] = useState("Objective");
  const [difficulty, setDifficultyLevel] = useState("easy");
  const [options, setOptions] = useState(["", "", "", ""]);

  function handleChange(event) {
    setQuestionType(event.target.value);
  }
  function handleDifficultyChange(event) {
    setDifficultyLevel(event.target.value);
  }

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
              <textarea className={classNames.textArea} />
            </InputBox>
            <InputBox>
              <Typography>Options :</Typography>
              <Box style={{ marginLeft: "20px" }}>
                <TextField
                  className={classNames.input}
                  label="Option A "
                  value={options[0]}
                  size="small"
                  onChange={handleChange}
                  variant="filled"
                />
                <TextField
                  className={classNames.input}
                  label="Option B "
                  value={options[1]}
                  size="small"
                  onChange={handleChange}
                  variant="filled"
                />
                <br />
                <TextField
                  className={classNames.input}
                  label="Option C "
                  value={options[2]}
                  size="small"
                  onChange={handleChange}
                  variant="filled"
                />
                <TextField
                  className={classNames.input}
                  label="Option D "
                  value={options[3]}
                  size="small"
                  onChange={handleChange}
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
              >
                <FormControlLabel value="A" control={<Radio />} label="A" />
                <FormControlLabel value="B" control={<Radio />} label="B" />
                <FormControlLabel value="C" control={<Radio />} label="C" />
                <FormControlLabel value="D" control={<Radio />} label="D" />
              </RadioGroup>
            </InputBox>
            <InputBox>
              <Typography> Question : </Typography>
              <textarea className={classNames.textArea} />
            </InputBox>
          </Box>
        ) : (
          <Box sx={{ padding:"10px 30px !important" }}>
            <Stepper activeStep={activeStep} >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                {/* if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                } */}
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
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  {/* <Box sx={{ flex: '1 1 auto' }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )} */}

                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
          /* <Box
            component="form"
            sx={{
              width: 600,
              height: 600,
            }}
            noValidate
            autoComplete="off"
          >
            <InputBox>
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
          </Box> */
        )}
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
