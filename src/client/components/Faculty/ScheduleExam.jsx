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
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState({
    name: "",
    date: "2014-08-18T21:11:54",
    duration: 0,
    subject:"",
    marks: 0,
    section: "",
    time: "",
    completed: false,
  });
  const handleScheduleExam = (event) => { 
    
     scheduleExam(data);
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
     setValue(event);
    }
    else if(props === "date") {
      setData({
        ...data,
        date: event.toLocaleString().split(",")[0],
      });
      setValue(event);
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
              value={value}
              onChange={handleChange("date")}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Time"
              value={value}
              onChange={handleChange("time")}
              // onChange={(newValue) => {
              //   setValue(newValue);
              // }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            required
            id="outlined-required"
            label="Subject"
            defaultValue=" "
            value={data.subject}
            onChange={handleChange("subject")}
          />
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 0, width: "25ch" },
            }}
            spacing={3}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-required"
              label="Section"
              defaultValue=" "
              value={data.section}
              onChange={handleChange("section")}
            />
            <TextField
              required
              className={classes.elements}
              id="outlined-required"
              label="Time Duration"
              defaultValue=" "
              value={data.duration}
              onChange={handleChange("duration")}
            />
          </Box>
          <TextField
            required
            id="outlined-required"
            label="Maximum Marks"
            defaultValue=" "
            value={data.marks}
            onChange={handleChange("marks")}
          />
          <Button variant="contained" onClick={handleScheduleExam}>
            Add Exam
          </Button>
        </Stack>
      </Dialog>
    </div>
  );
}
