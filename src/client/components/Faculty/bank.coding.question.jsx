import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchCpQuesDetails } from '../../api/utilities.api';

export default function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [codeQues, setCodeQues] = React.useState([
        {
            topicName: "",
            name: "",
            difficulty: "",
            type: "",
            problemStatement: "",
            inputFormat: "",
            outputFormat: "",
            constraints:"",
            answer: "",
        },
    ]);
    React.useEffect(() => {
        fetchCpQuesDetails().then((res) => {
            setCodeQues(res.questions);
        });
    }, [])
    function changeColor(difficultyData){
        var color;
        if(difficultyData.toLowerCase() === "easy"){
            color = "green";
        }
        else if(difficultyData.toLowerCase() === "medium"){
            color="orange";
        }
        else{
            color="red";
        }
        return color;
    }
    return (
        <>
            {
                codeQues.map((data,index) => {
                    return (
                        < div >
                            <Accordion expanded={expanded === index} onChange={handleChange(index)} style={{"marginBottom":"10px"}}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id={`panel1bh-header${index}`}
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                        {data.name}
                                    </Typography>
                                    <Typography style={{"color":changeColor(data.difficulty)}}>

                                        {data.difficulty}
                                        
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <h3>Problem Statement</h3>
                                        {data.problemStatement}
                                    </Typography>
                                    <br />
                                    <Typography>
                                        <h5>Input:</h5>  {data.inputFormat}
                                    </Typography>
                                    <br />
                                    <Typography>
                                        <h5>Output:</h5>  {data.outputFormat}
                                    </Typography>
                                    <br />
                                    <Typography>
                                       <h5>Constraints:</h5>  {data.constraints}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </div>

                    )
                })
            }
        </>
    );
}
