import React from "react";
import { makeStyles } from "@mui/styles";
import StudentTable from './StudentTable';
import {TextField} from "./@mui/styles";
const useStyles = makeStyles((Theme) => ({
    table: {
        marginLeft: "20px",
        height: "80%",
    }
}));

const year = [
    {
        value:"1",
        label:"1st"
    },
    {
        value:"2",
        label:"2nd"
    },
    {
        value:"3",
        label:"3rd"
    },
    {
        value:"4",
        label:"4th"
    }
]
const sections = [
    {
        value:"K",
        label:"K"
    },
    {
        value:"L",
        label:"L"
    },
    {
        value:"M",
        label:"M"
    },
    {
        value:"N",
        label:"N"
    }

]
const examType=[
    {
        value:"mid-term",
        label:"mid-term"
    },
    {
        value:"end-term",
        label:"end-term"
    }
]
function StudentInfo() {
    const style = useStyles();
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
    return (
        <>
            <div>
                <div>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Section Year"
                        style={{
                            "marginLeft":"2%",
                            "marginRight":"2%"
                        }}
                        value={currency}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select Year"
                    >
                        {year.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Section"
                        style={{
                            "marginLeft":"2%",
                            "marginRight":"2%"
                        }}
                        value={currency}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Select section"
                    >
                        {sections.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Exam"
                        style={{
                            "marginLeft":"2%",
                            "marginRight":"2%"
                        }}
                        value={currency}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select Exam type"
                    >
                        {examType.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </div>
            </div>
            <div className={style.table}>
                <StudentTable />
            </div>
        </>
    );
}
export default StudentInfo;