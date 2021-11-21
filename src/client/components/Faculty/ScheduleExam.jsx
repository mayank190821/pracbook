import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Stack from "@mui/material/Stack";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import {scheduleExam} from "../../api/exam.api";
import { daysToWeeks } from "date-fns/esm";
const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .css-fzk8t3-MuiPaper-root-MuiDialog-paper": {
      padding: "40px !important",
    },
  },
  elements: {
    marginLeft: "25px !important",
  },
}));

const exams = [
  {
    value: "midterm",
    label: "Mid term",
  },
  {
    value: "endterm",
    label: "End Term",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScheduleExam({ handleClose }) {
  const classes = useStyles();
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [data, setData] = React.useState({
    name: "",
    date: "",
    duration: null,
    subject:"",
    marks: null,
    section: "",
    time: "",
    objectCount: null,
    codingCount: null,
    completed: false,
  });

  const getQuestionIds = (oCount, cCount) => {
    let questions = [];
    
    return [];
  }
  const handleScheduleExam = () => { 
     let questions = getQuestionIds(data.objectCount, data.codingCount);
     scheduleExam(data);
     handleClose();
  };
  const handleChange = (props) => (event) => {
    if(props === "time"){
      let time = event.toLocaleString().split(", ")[1];
      time = time.slice(0, time.length - 6) + time.slice(time.length-3);
     setData({
      ...data,
      time:
        time,
     });
     setTime(event);
    }
    else if(props === "date") {
      setData({
        ...data,
        date: event.toLocaleString().split(",")[0],
      });
      setDate(event);
    }
    else
      setData({ ...data, [props]: event.target.value });
  };

  return (
    <div>
      <Dialog
        className={classes.dialog}
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Stack spacing={3}>
          <TextField
            id="outlined-select-exam-type"
            select
            label="Exam Type"
            value={data.name}
            onChange={handleChange("name")}
          >
            {exams.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="dd/MM/yyyy"
              value={date}
              disablePast
              onChange={handleChange("date")}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Time"
              value={time}
              onChange={handleChange("time")}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box
            component="form"
            sx={12}
            spacing={1}
            noValidate
            autoComplete="off"
          >
          <TextField
            required
            id="outlined-required"
            label="Subject"
            value={data.subject}
            onChange={handleChange("subject")}
          />
          
            <TextField
              required
              id="outlined-required"
              className={classes.elements}
              label="Section"
              value={data.section}
              onChange={handleChange("section")}
            />
            </Box>
            <Box
            component="form"
            sx={12}
            spacing={1}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-required"
              label="Time Duration"
              value={data.duration}
              onChange={handleChange("duration")}
            />
          <TextField
            required
            id="outlined-required"
            label="Maximum Marks"
            className={classes.elements}
            value={data.marks}
            onChange={handleChange("marks")}
          />
          </Box>
          <Box
            component="form"
            sx={12}
            spacing={1}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-required"
              label="Objective Count"
              value={data.objectCount}
              onChange={handleChange("objectCount")}
            />
          <TextField
            required
            id="outlined-required"
            label="Coding Count"
            className={classes.elements}
            value={data.codingCount}
            onChange={handleChange("codingCount")}
          />
          </Box>
          <Button variant="contained" onClick={handleScheduleExam}>
            Add Exam
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
}
