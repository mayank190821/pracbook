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
  const classNames = useStyles();
  const [QuestionType, setQuestionType] = useState("Objective");
  const [options, setOptions] = useState(["", "", "", ""]);

  function handleChange(event) {
    setQuestionType(event.target.value);
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
          <div>hi this is coding type</div>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
