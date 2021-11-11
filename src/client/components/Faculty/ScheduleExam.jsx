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
const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      padding: "40px",
    },
  },
  elements : {
    marginLeft: "25px !important"
  }
}));

const currencies = [
  {
    value: "viva",
    label: "Viva",
  },
  {
    value: "coding",
    label: "Coding",
  },
];
const units = [
  {
    value: "minute",
    label: "Minute",
  },
  {
    value: "hour",
    label: "Hour",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ScheduleExam({ handleClose }) {
  const classes = useStyles();  
  const [date, setDate] = React.useState(new Date("2014-08-18T21:11:54"));
  const [exam, setExam] = React.useState("viva");
  const [unit, setUnit] = React.useState("minute");

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleExamChange = (event) => {
    setExam(event.target.value);
  };
  const handleUnitChange = (event) => {
    setUnit(event.target.value);
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
            value={exam}
            onChange={handleExamChange}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/dd/yyyy"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Time"
              value={date}
              onChange={handleExamChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
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
              label="Time Duration"
              defaultValue=" "
            />
            <TextField
              className={classes.elements}
              id="outlined-select-unit-type"
              select
              label="Unit"
              value={unit}
              onChange={handleUnitChange}
            >
              {units.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField
            required
            id="outlined-required"
            label="Maximum Marks"
            defaultValue=" "
          />
          <Button variant="contained">Add Exam</Button>
        </Stack>
      </Dialog>
    </div>
  );
}
