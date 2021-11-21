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
            answer: "",
        },
    ]);
    React.useEffect(() => {
        fetchCpQuesDetails().then((res) => {
            setCodeQues(res.questions);
            console.log(res.questions);
        });
    }, [])

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
                                        {console.log(codeQues)}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>{data.difficulty}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {data.problemStatement}
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
