/* eslint-disable no-loop-func */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import Editor from "./Editor";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import { compile } from "./../api/exam.api";
import {
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getCode, getQuestion } from "../redux/selectors/code.selector";
import CodingQuestion from "../components/coding.question";
import { useParams } from "react-router-dom";
import Countdown, { zeroPad } from "react-countdown";

const languages = [
  {
    value: "java",
    label: "Java (13.0.1)",
  },
  {
    value: "javascript",
    label: "JavaScript (12.14.0)",
  },
  {
    value: "python",
    label: "Python3 (3.8.1)",
  },
];
const editorThemes = [
  {
    value: "github",
    label: "Github",
  },
  {
    value: "solarized_dark",
    label: "Solarized",
  },

  {
    value: "eclipse",
    label: "Eclipse",
  },
  {
    value: "tomorrow_night",
    label: "Tomorrow",
  },
];

const useStyles = makeStyles((theme) => ({
  list: {
    width: "80px",
  },
  listItem: {
    borderBottom: "1px solid #e2e2e2 !important",
  },
  listItemText: {
    textAlign: "center",
  },
  mainBox: {
    display: "flex",
    marginTop: "30px",
    overflow: "hidden",
    height: "calc(100vh - 30px)",
    paddingRight: "20px !important",
  },
  inputArea: {
    height: "8% !important",
    width: "15%",
    minWidth: "150px !important",
    marginBottom: "0px !important",
  },
  testCases: {
    width: "calc(100% - 20px)",
    resize: "none",
    paddingLeft: "5px",
    paddingTop: "5px",
    height: "100px !important",
    overflow: "auto !important",
    marginLeft: "20px",
  },
  status: {
    width: "calc(100% - 20px)",
    paddingBottom: "15px",
    fontSize: "15px",
    height: "20px !important",
    marginLeft: "20px",
  },
  buttons: {
    display: "flex",
    float: "right",
  },
  editor: {
    marginTop: "10px",
    height: "100vh",
  },
  problem: {
    width: "100vw",
    height: "calc(100vh - 80px)",
    overflowY: "scroll",
    overflowX: "wrap",
    padding: "0px 10px",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: "50px",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
}));

export default function ExamPage({location}) {
  const classes = useStyles();
  const [language, setLanguage] = React.useState({
    value: "java",
    code: 62,
  });
  const [output, setOutput] = React.useState("");
  const [status, setStatus] = React.useState("");
  const { examId } = useParams();
  const { sourceCode } = useSelector(getCode);
  const { ques } = useSelector(getQuestion);

  const handleLanguageChange = (event) => {
    let code;
    switch (event.target.value) {
      case "javascript":
        code = 63;
        break;
      case "python":
        code = 71;
        break;
      default:
        code = 62;
    }
    setLanguage({ ...language, value: event.target.value, code: code });
  };
  React.useEffect(() => {}, [examId]);
  const [editorTheme, setEditorTheme] = React.useState("github");
  const [curQuestion, setCurQuestion] = React.useState({
    question: ques[0],
    index: 0,
  });
  const [answer, setAnswer] = React.useState("");

  const handleThemeChange = (event) => {
    setEditorTheme(event.target.value);
  };
  const questionChange = (index) => {
    setCurQuestion({
      question: ques[index],
      index: index,
    });
  };
  const handleSubmit = async (testCases) => {
    let data;
    let err = false;
    setOutput("");
    setStatus("");
    let result = "";
    // console.log(curQuestion.question.length);
    for (let i = 0; i < (testCases.input ? testCases.input.length : 0); i++) {
      data = {
        language_id: language.code,
        source_code: sourceCode,
        stdin: testCases.input[i],
        expected_output: testCases.output[i],
      };
       compile(data)
        .then((response) => {
          if (response.stderr) {
            setOutput(response.status.description + "\n\n" + response.stderr);
            err = true;
          } else if (response.stdout) {
            if (!err) {
              result += "TestCase " + i + ": " + response.stdout + "\n";
            }
            console.log(response.status, response, output);
          } else {
            setOutput("");
          }
        })
        .then(async () => {
          await setOutput(result);
        })
        .then(() => {
          if (err) {
            setStatus("Error");
          } else {
            setStatus("Accepted");
          }
        });
    }
  };
  const renderer = ({ hours, minutes, seconds, completed }) => {
    // if (completed) {
    //   // Render a complete state
    //   return <Completionist />;
    // } else {
    //   // Render a countdown
      return (
        <span>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    // }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            PracBook Assessment
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              position: "absolute",
              right: "0 !important",
              // color: "red",
              // fontSize: "30px",
              marginRight: "12%",
            }}
          >
            Time Remaining :
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              position: "absolute",
              right: "0 !important",
              // color: "red",
              fontSize: "30px",
              marginRight: "3%",
            }}
          >
            <Countdown
              date={Date.now() + location.state.duration * 60000}
              renderer={renderer}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <DrawerHeader></DrawerHeader>
        <List className={classes.list}>
          {new Array(ques.length).fill().map((text, index) => (
            <ListItem
              button
              key={index}
              className={classes.listItem}
              onClick={() => questionChange(index)}
            >
              <ListItemText
                primary={index + 1}
                className={classes.listItemText}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 2, p: 5 }}
        className={classes.mainBox}
      >
        {curQuestion &&
          curQuestion.question &&
          (curQuestion.question.questionId.slice(0, 2) === "cp" ? (
            <>
              <div className={classes.problem}>
                <CodingQuestion ques={curQuestion.question} />
              </div>
              <div className={classes.editor}>
                <TextField
                  id="outlined-select-language"
                  select
                  // variant="outlined"
                  size="small"
                  // label="Select"
                  value={language.value}
                  onChange={handleLanguageChange}
                  // helperText="Please select your language"
                  className={classes.inputArea}
                  style={{ marginRight: "5%", marginLeft: "20px" }}
                >
                  {languages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-theme"
                  select
                  // label="Select"
                  value={editorTheme}
                  size="small"
                  onChange={handleThemeChange}
                  // helperText="Please select your theme"
                  className={classes.inputArea}
                >
                  {editorThemes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Editor editorTheme={editorTheme} language={language.value} />
                <h2
                  style={{
                    marginLeft: "20px",
                    fontSize: "25px",
                    fontWeight: "400",
                    padding: "5px",
                  }}
                >
                  Output
                </h2>
                {(() => {
                  if (status === "Accepted") {
                    return (
                      <div
                        className={classes.status}
                        style={{ color: "green" }}
                      >
                        Status: {status}
                      </div>
                    );
                  } else {
                    return (
                      <div className={classes.status} style={{ color: "red" }}>
                        Status: {status}
                      </div>
                    );
                  }
                })()}

                <TextareaAutosize
                  aria-label="empty textarea"
                  className={classes.testCases}
                  value={output}
                />
                <div className={classes.buttons}>
                  <Button
                    variant="outlined"
                    className={classes.runCode}
                    onClick={() =>
                      {
                      handleSubmit({
                        input: curQuestion.question.sampleInput,
                        output: curQuestion.question.sampleOutput,
                      })
                      console.log("clicked")
                    }
                    }
                    style={{ margin: "10px", marginBottom: "5px" }}
                  >
                    Run Code
                  </Button>
                  <Button
                    onClick={() =>
                      handleSubmit({
                        input: curQuestion.question.inputTestCases,
                        output: curQuestion.question.outputTestCases,
                      })
                    }
                    variant="contained"
                    className={classes.submitCode}
                    style={{ margin: "10px", marginBottom: "5px" }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Card
              sx={{ minWidth: 275 }}
              elevation={0}
              style={{ marginBottom: "15px" }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 22 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {curQuestion.index + 1}
                  {". " + curQuestion.question.question}
                </Typography>
                <br />
                <RadioGroup
                  column
                  aria-label="Choose Answer"
                  name="answer"
                  spacing="auto"
                  value={answer}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setAnswer(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value={curQuestion.question.option1}
                    control={<Radio />}
                    label={`A. ${curQuestion.question.option1}`}
                  />
                  <FormControlLabel
                    value={curQuestion.question.option2}
                    control={<Radio />}
                    label={`B. ${curQuestion.question.option2}`}
                  />
                  <FormControlLabel
                    value={curQuestion.question.option3}
                    control={<Radio />}
                    label={`C. ${curQuestion.question.option3}`}
                  />
                  <FormControlLabel
                    value={curQuestion.question.option4}
                    control={<Radio />}
                    label={`D. ${curQuestion.question.option4}`}
                  />
                </RadioGroup>
                <br />
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
}
