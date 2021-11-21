import React, { useState } from "react";
import { TextField, MenuItem, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { fetchQuesDetails } from "../../api/utilities.api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const types = [
  {
    value: "Objective",
    label: "Viva (Objective Type)",
  },
  {
    value: "Coding",
    label: "Coding Problem",
  },
];

export default function QuestionCard() {
  const [vivaQues, setViva] = React.useState([
    {
      topicName: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    },
  ]);
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
    fetchQuesDetails().then((res) => {
      setViva(res.questions);
      console.log(res.questions);
    });
  }, []);

  const useStyles = makeStyles((theme) => ({
    input: {
      padding: "0px !important",
      maxWidth: "300px",
      margin: `${theme.spacing(1)} !important`,
    },
    card: {
      width: "100% !important",
    },
  }));

  const [type, setType] = useState(types[0].value);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const classNames = useStyles();
  return (
    <React.Fragment>
      <TextField
        id="filled-select-currency"
        select
        className={classNames.input}
        label="Question Type "
        value={type}
        size="small"
        onChange={handleChange}
        variant="filled"
      >
        {types.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {type === "Objective" ? (
        vivaQues.map((data, index) => {
          console.log(data);
          return (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 22 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {index + 1}{". "+data.question}
                </Typography>
                <Typography component="div">
                  {"a. "+data.option1}
                </Typography>
                <Typography component="div">
                  {"b. "+data.option2}
                </Typography>
                <Typography component="div">
                  {"c. "+data.option3}
                </Typography>
                <Typography component="div">
                  {"d. "+data.option4}
                </Typography>
                <br />
                <Typography variant="body2" style={{"color": "green"}}>
                  {"Answer: " + data.answer}
                </Typography>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div></div>
      )}
    </React.Fragment>
  );
}
