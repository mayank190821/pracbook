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
import { scheduleExam } from "../../api/exam.api";
import { fetchCardDetails } from "../../api/utilities.api";
import { useDispatch } from "react-redux";
import { loadExams } from "../../redux/actions/code.action";
import { getUser } from "../../redux/selectors/code.selector";
import { useSelector } from "react-redux";

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
  const facultyData = useSelector(getUser);
  const [curYear, setCurYear] = React.useState([]);
  React.useEffect(() => {
    let yearArray = [];
    let secArray=[];
    let secLen = facultyData.sections.length;
    for (let i = 0; i < secLen; i++) {
      yearArray.push(facultyData.sections[i].year)
      secArray.push(facultyData.sections[i])
    }
    setCurYear(yearArray)
    // for(let i=0;i<)
    console.log(facultyData)
  }, [facultyData])
  const dispatch = useDispatch();
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [data, setData] = React.useState({
    name: "",
    date: "",
    duration: "",
    year: "",
    subject: "",
    marks: "",
    section: "",
    time: "",
    objectCount: "",
    codingCount: "",
    completed: false,
  });
  const handleScheduleExam = () => {
    scheduleExam(data).then(() => {
      fetchCardDetails(facultyData._id).then((res) => {
        dispatch(loadExams(res.exams));
      });
    })
    handleClose();
  };
  const handleChange = (props) => (event) => {
    if (props === "time") {
      let time = event.toLocaleString().split(", ")[1];
      time = time.slice(0, time.length - 6) + time.slice(time.length - 3);
      setData({
        ...data,
        time:
          time,
      });
      setTime(event);
    }
    else if (props === "date") {
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
        <form id="add_exam_form">
          <Stack spacing={3}>
            <Box spacing={1}
              component="div"
              sx={12}
              autoComplete="off"
            >
              <TextField
                style={{ "width": "47%" }}
                id="outlined-select-exam-type"
                select
                label="Exam Type"
                value={data.name}
                onChange={handleChange("name")}
                required
              >
                {exams.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                style={{ "width": "47%", "marginLeft": "25px" }}
                id="outlined-select-exam-type"
                select
                label="Year"
                value={data.year}
                onChange={handleChange("year")}
                required
              >
                {curYear.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="dd/MM/yyyy"
                value={date}
                disablePast
                onChange={handleChange("date")}
                renderInput={(params) => <TextField {...params} />}
                required
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns} required>
              <TimePicker
                required
                label="Time"
                value={time}
                onChange={handleChange("time")}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Box
              component="div"
              sx={12}
              spacing={1}
              autoComplete="off"
            >
              <TextField
                required
                style={{ "width": "47%" }}
                id="outlined-required"
                label="Section"
                select
                value={data.section}
                onChange={handleChange("section")}
              />
              <TextField
                style={{ "width": "47%", "marginLeft": "25px" }}
                select
                id="outlined-required"
                label="Subject"
                value={data.subject}
                onChange={handleChange("subject")}
                required
              />
            </Box>
            <Box
              component="div"
              sx={12}
              spacing={1}
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Time Duration"
                value={data.duration}
                onChange={handleChange("duration")}
                required
              />
              <TextField
                required
                id="outlined-required"
                label="Maximum Marks"
                className={classes.elements}
                value={data.marks}
                onChange={handleChange("marks")}
                required
              />
            </Box>
            <Box
              component="div"
              sx={12}
              spacing={1}
              autoComplete="off"
            >
              <TextField
                required
                id="outlined-required"
                label="Objective Count"
                value={data.objectCount}
                onChange={handleChange("objectCount")}
                required
              />
              <TextField
                required
                id="outlined-required"
                label="Coding Count"
                className={classes.elements}
                value={data.codingCount}
                onChange={handleChange("codingCount")}
                required
              />
            </Box>
            <Button type="submit" variant="contained" onClick={(e) => {
              e.preventDefault();
              const formId = document.getElementById("add_exam_form");
              formId.checkValidity();
              if (formId.reportValidity()) {
                handleScheduleExam(); fetchCardDetails(facultyData._id, facultyData.role).then((res) => {
                  console.log(res);
                  dispatch(loadExams(res.exams));
                });
              }
            }}>
              Add Exam
            </Button>
          </Stack>
        </form>
      </Dialog>
    </div>
  );
}
