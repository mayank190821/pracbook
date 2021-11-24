import React, {useEffect,useState} from "react";
import { makeStyles } from "@mui/styles";
import StudentTable from './StudentTable';
import TextField from "@mui/material/TextField";
import { getUser } from "../../redux/selectors/code.selector";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { fetchStudentDetails } from "../../api/utilities.api";
const useStyles = makeStyles((Theme) => ({
    table: {
        marginLeft: "20px",
        height: "80%",
    }
}));

const examType=[
    {
        value:"midterm",
        label:"mid-term"
    },
    {
        value:"endterm",
        label:"end-term"
    }
]
function StudentInfo() {
    const style = useStyles();
    const [currency, setCurrency] = React.useState([]);
    // const [year,setYear] = React.useState([]);
    const [section,setSection] = useState([]);
    const handleChange = (event) => {
      setCurrency(event.target.value);
    };
    const resultData = useSelector(getUser);
    const [results, setResults] = useState([]);
    const [subjectList,setSubjectList] = useState([]);
    const [subjects,setSubjects] = useState(resultData.sections[0].subjects);
    const [curSubject,setCurSubject] = useState([]);
    const [curSection,setCurSection] = useState([]);
    const [type,setType] = useState([]);
    
    const handleSubjectChange= (event) => {
        setCurSubject(event.target.value);
    }
    const handleTypeChange= (event) => {
        setType(event.target.value);
    }
    const handleSectionChange = (event) => {
        setCurSection(event.target.value);
        subjectList.forEach((curSection) => {
            if(curSection.sectionName === event.target.value){
                setSubjects(curSection.subjects);
                setCurSubject(curSection.subjects[0]);
            }
        })
      };

      const handleSearch = () => {
            fetchStudentDetails({subject: curSubject, section: curSection, type: type}).then((res) => {
        setResults(res.results);
    })
      }
    const [year,setyear] = useState([]);
    useEffect(()=>{
        let len = resultData.sections.length;
        let sectionArray=[];
        let yearArray=[];
        let subjectArray=[];
        for(let i = 0;i<len;i++){
            sectionArray.push(resultData.sections[i].sectionName); 
            yearArray.push(resultData.sections[i].year); 
            subjectArray.push(resultData.sections[i]); 
        }
        setSection(sectionArray);
        console.log(subjectArray);
        setyear(yearArray);
        setSubjectList(subjectArray);
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
                        onClick={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select Year"
                    >
                        {year.map((option) => (
                            <option key={option} value={option}>
                                {option}
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
                            "margin":"1.5%",
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
                        label="Exam"
                        style={{
                            "margin":"1.5%",
                        }}
                        size="small"
                        value={curSubject}
                        onChange={handleSubjectChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Please select Subject"
                    >
                        {subjects.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                    <Button variant="contained" onClick={handleSearch}>GO</Button>
                </div>
            </div>
            <div className={style.table}>
                <StudentTable results={results}/>
            </div>
        </>
    );
}
export default StudentInfo;