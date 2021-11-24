import React, {useEffect} from "react";
import { makeStyles } from "@mui/styles";
import StudentTable from './StudentTable';
import TextField from "@mui/material/TextField";
import { getUser } from "../../redux/selectors/code.selector";
import { useSelector } from "react-redux";
const useStyles = makeStyles((Theme) => ({
    table: {
        marginLeft: "20px",
        height: "80%",
    }
}));


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
const subjects = [
    {
        value:"DSA",
        label:"DSA",
    },
    {
        value:"Python",
        label:"Python",
    },
    {
        value:"cpp",
        label:"cpp",
    },
]
function StudentInfo() {
    const style = useStyles();
    const [currency, setCurrency] = React.useState([]);
    const [year,setYear] = React.useState([]);
    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
    const resultData = useSelector(getUser);
    useEffect(()=>{
        // resultData.sections
    },[resultData])
    return (
        <>
            <div>
                <div>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Section Year"
                        style={{
                            "margin":"1.5%",
                        }}
                        size="small"
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
                            "margin":"1.5%",
                        }}
                        size="small"
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
                            "margin":"1.5%",
                        }}
                        size="small"
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
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Exam"
                        style={{
                            "margin":"1.5%",
                        }}
                        size="small"
                        value={currency}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select Exam type"
                    >
                        {subjects.map((option) => (
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