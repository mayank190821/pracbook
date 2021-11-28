import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import StudentTable from './StudentTable';
import TextField from "@mui/material/TextField";
import { getUser } from "../../redux/selectors/code.selector";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { fetchStudentDetails } from "../../api/utilities.api";
import { CSVLink } from "react-csv";

const useStyles = makeStyles((Theme) => ({
    table: {
        marginLeft: "20px",
        height: "80%",
    }
}));

const examType = [
    {
        value: "",
        label: ""
    },{
        value: "midterm",
        label: "mid-term"
    },
    {
        value: "endterm",
        label: "end-term"
    }
]

const columns = [
    // Title of the columns (column_names)
    { key: 'rollNumber', label: 'Roll Number' },
    { key: 'name', label: 'Name' },
    { key: 'section', label: 'Section' },
    { key: 'marks', label: 'Marks' },
    { key: 'year', label: 'Year' },
    { key: 'status', label: 'Status' },
]
function StudentInfo() {
    const style = useStyles();
    const [curYear, setCurYear] = React.useState("");
    const [section, setSection] = useState([]);
    const handleYearChange = (event) => {
        setCurYear(event.target.value);
    };
    const resultData = useSelector(getUser);
    const [results, setResults] = useState([]);
    const [subjectList, setSubjectList] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [curSubject, setCurSubject] = useState();
    const [curSection, setCurSection] = useState();
    const [type, setType] = useState();

    const handleSubjectChange = (event) => {
        setCurSubject(event.target.value);
    }
    const handleTypeChange = (event) => {
        setType(event.target.value);
    }
    const handleSectionChange = (event) => {
        setCurSection(event.target.value);
        subjectList.forEach((curSection) => {
            if (curSection.sectionName === event.target.value) {
                setSubjects(curSection.subjects);
                setCurSubject(curSection.subjects[0]);
            }
        })
    };
    const handlePrint = () => {

    }
    const handleSearch = () => {
        fetchStudentDetails({ subject: curSubject, section: curSection, type: type, year: curYear, id: resultData._id }).then((res) => {
            setResults(res.results);
        })
    }
    const [year, setyear] = useState([]);
    useEffect(() => {
        let len = resultData.sections.length;
        let sectionArray = [];
        let yearArray = [];
        let subjectArray = [];
        sectionArray.push("");
        yearArray.push("");
        subjectArray.push("");
        for (let i = 0; i < len; i++) {
            sectionArray.push(resultData.sections[i].sectionName);
            yearArray.push(resultData.sections[i].year);
            subjectArray.push(resultData.sections[i]);
        }
        setSection(sectionArray);
        setyear([...yearArray]);
        setSubjectList(subjectArray);
    }, [resultData])

    const csvReport = {
        filename: `${(curYear!== "")?curYear[0]:"Year"}_${curSection}_Result.csv`,
        headers: columns,
        data: results
    };
    return (
        <>
            <div>
                <div>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Year"
                        style={{
                            "margin": "1.5%",
                        }}
                        size="small"
                        value={curYear}
                        onChange={handleYearChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select Year"
                    >
                        {year.map((options) => (
                            <option key={options} value={options}>
                                {options}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Section"
                        style={{
                            "margin": "1.5%",
                        }}
                        size="small"
                        value={curSection}
                        onChange={handleSectionChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Select section"
                    >
                        {section.length !== 0 && section.map((options) => (
                            <option key={options} value={options}>
                                {options}
                            </option>
                        ))}
                    </TextField>

                    <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Exam"
                        style={{
                            "margin": "1.5%",
                        }}
                        size="small"
                        value={type}
                        onChange={handleTypeChange}
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
                        // label="Subject"
                        style={{
                            "margin": "1.5%",
                        }}
                        size="small"
                        value={curSubject}
                        onChange={handleSubjectChange}
                        SelectProps={{
                            native: true,
                        }}
                        displayEmpty
                        helperText="Please select Subject"
                    >
                        {subjects.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                    <Button style={{
                        "margin": "1.5%",
                    }}
                        variant="contained" onClick={handleSearch}>GO</Button>
                    {(results.length !== 0) && <CSVLink {...csvReport}>
                    <Button style={{
                        "right": "0",
                        "margin": "1.5%",
                        "float": "right",
                        "color": "red",
                        "border": "1px solid red"
                    }}
                        onClick={handlePrint}>Print</Button>
                        </CSVLink>}
                </div>
            </div>
            <div className={style.table}>
                <StudentTable results={results} />

            </div>
        </>
    );
}
export default StudentInfo;