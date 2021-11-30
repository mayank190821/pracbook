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
import { compile, uploadResult } from "./../api/exam.api";
import {
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCode } from "../redux/selectors/code.selector";
import CodingQuestion from "../components/coding.question";
import { fetchExamQuestion } from "../api/exam.api";
import { saveQuestion } from "../redux/actions/code.action";
import { useParams, Redirect } from "react-router-dom";
import { zeroPad } from "react-countdown";
import { fetchExamById } from "../api/utilities.api";

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
  listItemSubmit: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: "white !important",
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
  label: {
    fontFamily: "Times New Roman !important",
    fontSize: "18px",
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

function renderTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return { hours, minutes, seconds };
}

export default function ExamPage({ location }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [resultList, setResultList] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);
  const [language, setLanguage] = React.useState({
    value: "java",
    code: 62,
  });
  const [output, setOutput] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [ques, setQues] = React.useState([]);
  const [sec, setSec] = React.useState();
  const [examMarks, setExamMarks] = React.useState({});
  const [timer, setTimer] = React.useState(localStorage.getItem("time"));
  const [time, setTime] = React.useState("00:00:00");
  const [header, setHeader] = React.useState("");
  const { examId } = useParams();
  const { sourceCode } = useSelector(getCode);

  const quesIds = sessionStorage.getItem("TQID").split(",");
  const [curQuestion, setCurQuestion] = React.useState({
    question: ques[0],
    index: 0,
  });

  const handleLanguageChange = (value) => {
    let code;
    switch (value) {
      case "javascript":
        code = 63;
        break;
      case "python":
        code = 71;
        break;
      default:
        code = 62;
    }
    setLanguage({ ...language, value: value, code: code });
  };

  React.useEffect(() => {
    fetchExamById(examId.split("&")[0]).then((exam) => {
      setHeader(`${exam.subject} - ${exam.name}`);
      setExamMarks({ objMarks: exam.objMarks, codingMarks: exam.codingMarks });
    });
    if (ques.length === 0 && quesIds.length !== 0) {
      let currentQues = [];
      for (let i = 0; i < quesIds.length; i++) {
        fetchExamQuestion(quesIds[i]).then(async (response) => {
          currentQues.push(response.question);
          setQues([...currentQues]);
          dispatch(saveQuestion(currentQues));
          if (i === 0) {
            setCurQuestion({
              question: currentQues[0],
              index: 0,
            });
          }
        });
      }
    }
    let interval = setInterval(() => {
      let curTime = localStorage.getItem("time");
      if (curTime > 0) {
        const { hours, minutes, seconds } = renderTime(parseInt(curTime) - 1);
        setTime(`${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`);
        localStorage.setItem("time", parseInt(curTime) - 1);
        setTimer(parseInt(curTime) - 1);
      }
    }, 1000);

    setSec(interval);
    return () => {
      clearInterval(interval);
    };
  }, []);
  function updateMarks(marks) {
    let flag = 0;
    let curResult = resultList;
    try {
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i].id === curQuestion.question.questionId) {
          curResult[i].marks = Math.max(curResult[i].marks, marks);
          setResultList([...curResult]);
          flag = 1;
          console.log("correct");
        }
      }
      if (flag === 0) {
        curResult.push({
          id: curQuestion.question.questionId,
          marks: marks,
        });
        console.log(curResult);
        setResultList([...curResult]);
      }
    } catch (err) {}
  }
  React.useEffect(() => {
    if (timer <= 0) clearInterval(sec);
  }, [timer]);

  const [editorTheme, setEditorTheme] = React.useState("github");
  const [answer, setAnswer] = React.useState("");

  const handleThemeChange = (event) => {
    setEditorTheme(event.target.value);
  };
  const questionChange = (index) => {
    if (index === "submit") {
      var r = window.confirm("This will end your exam, Do you agree?");
      if (r === true) {
        setTimer(0);
        // setRedirect(true);
        localStorage.removeItem("time");
        let ids = sessionStorage.getItem("TQID").split(",");

        for (let i = 0; i < ids.length; i++) {
          console.log(ids[i]);
          if (ids[i].slice(0, 2) === "cp") {
            localStorage.removeItem(`cp${ids[i]}`);
            localStorage.removeItem(`cpl${ids[i]}`);
          } else {
            localStorage.removeItem(`ans${ids[i]}`);
          }
        }

        let marks = 0;
        resultList.forEach((curResult) => {
          marks += curResult.marks;
        });
        uploadResult({
          id: examId.split("&")[1],
          examId: examId.split("&")[0],
          marks: marks,
        }).then((res) => {
          if (!res.error) {
            console.log(res);
            setRedirect(true);
          } else console.log(res.error);
        });
      }
    } else {
      if (
        curQuestion.question &&
        curQuestion.question.questionId.slice(0, 2) === "cp"
      ) {
        localStorage.setItem(
          `cp${curQuestion.question.questionId}`,
          sourceCode
        );
        localStorage.setItem(
          `cpl${curQuestion.question.questionId}`,
          language.value
        );
      }
      setCurQuestion({
        question: ques[index],
        index: index,
      });
    }
  };

  React.useEffect(() => {
    if (curQuestion && curQuestion.question)
      handleLanguageChange(
        localStorage.getItem(`cpl${curQuestion.question.questionId}`) || "java"
      );
  }, [curQuestion]);

  const handleSubmit = async (testCases) => {
    let data;
    let err = false;
    setOutput("");
    setStatus("");
    let currStatus = [];
    setResults([]);
    let result = "";
    for (let i = 0; i < (testCases.output ? testCases.output.length : 0); i++) {
      if (testCases.input.length === 0) {
        data = {
          language_id: language.code,
          source_code: sourceCode,
          stdin: "",
          expected_output: testCases.output[i],
        };
      } else {
        data = {
          language_id: language.code,
          source_code: sourceCode,
          stdin: testCases.input[i],
          expected_output: testCases.output[i],
        };
      }
      compile(data)
        .then((response) => {
          // console.log(response);
          if (response.stderr) {
            result += response.stderr;
            err = true;
          } else if (response.compile_output !== null) {
            result = response.compile_output;
            err = true;
          } else if (response.stdout) {
            if (!err) {
              result += "TestCase " + i + ": " + response.stdout + "\n";
            }
          } else {
            result += "TestCase " + i + ": \n";
          }
          currStatus.push(response.status.description);
        })
        .then(async () => {
          await setOutput(result);
        })
        .then(() => {
          setResults([...currStatus]);
        });
    }
  };

  React.useEffect(() => {
    let flag = -1;
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      if (results[i] === "Accepted") {
        setStatus(results[i]);
        if (i === 0) {
          flag = 1;
        } else flag++;
      } else {
        setStatus(results[i]);
        break;
      }
    }
    if (flag === results.length) {
      setStatus("Accepted");
      if (flag === curQuestion.question.outputTestCases.length) {
        console.log(curQuestion.question.outputTestCases.length);
        updateMarks(examMarks.codingMarks);
      }
    } else {
      updateMarks(0);
    }
  }, [results]);
  React.useEffect(() => {
    console.log(resultList);
  }, [resultList]);

  if (redirect) {
    return <Redirect to={`/student/dashboard/${examId.split("&")[1]}`} />;
  }
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            style={{ textTransform: "capitalize" }}
            component="div"
          >
            {header}
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
            {time}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <DrawerHeader></DrawerHeader>
        <List className={classes.list}>
          {ques.length === quesIds.length &&
            new Array(ques.length).fill().map((text, index) => (
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
          <ListItem
            button
            key={"submit-test"}
            className={classes.listItemSubmit}
            onClick={() => questionChange("submit")}
          >
            <ListItemText primary="Submit" className={classes.listItemText} />
          </ListItem>
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
                <CodingQuestion
                  ques={curQuestion.question}
                  id={curQuestion.index}
                />
              </div>
              <div className={classes.editor}>
                <TextField
                  id="outlined-select-language"
                  select
                  // variant="outlined"
                  size="small"
                  // label="Select"
                  value={language.value}
                  onChange={(event) => handleLanguageChange(event.target.value)}
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
                <Editor
                  editorTheme={editorTheme}
                  key={`cp${curQuestion.index}`}
                  index={curQuestion.question.questionId}
                  language={language.value}
                />
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
                    onClick={() => {
                      setResults([]);
                      handleSubmit({
                        input: curQuestion.question.sampleInput,
                        output: curQuestion.question.sampleOutput,
                      });
                      // console.log("clicked");
                    }}
                    style={{ margin: "10px", marginBottom: "5px" }}
                  >
                    Run Code
                  </Button>
                  <Button
                    onClick={() => {
                      setResults([]);
                      handleSubmit({
                        input: curQuestion.question.inputTestCases,
                        output: curQuestion.question.outputTestCases,
                      });
                    }}
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
              style={{
                marginBottom: "15px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  style={{
                    fontWeight: "600",
                    fontFamily: "Times New Roman",
                  }}
                  gutterBottom
                >
                  {curQuestion.index + 1}
                  {". " + curQuestion.question.question}
                </Typography>
                <br />
                <RadioGroup
                  column
                  aria-label="Choose Answer"
                  name={`answer-${curQuestion.index}`}
                  // name="answer",
                  spacing="auto"
                  value={
                    localStorage.getItem(
                      `ans${curQuestion.question.questionId}`
                    ) || answer
                  }
                  onChange={(event) => {
                    localStorage.setItem(
                      `ans${curQuestion.question.questionId}`,
                      event.target.value
                    );
                    let marks;
                    if (curQuestion.question.answer === event.target.value) {
                      marks = examMarks.objMarks;
                    } else {
                      console.log("false", curQuestion.question.answer);
                      marks = 0;
                    }
                    updateMarks(marks);
                    setAnswer(event.target.value);
                  }}
                >
                  <FormControlLabel
                    value={curQuestion.question.option1}
                    control={<Radio />}
                    classes={{
                      label: classes.label,
                    }}
                    label={`A. ${curQuestion.question.option1}`}
                  />
                  <FormControlLabel
                    value={curQuestion.question.option2}
                    control={<Radio />}
                    classes={{
                      label: classes.label,
                    }}
                    label={`B. ${curQuestion.question.option2}`}
                  />
                  <FormControlLabel
                    value={curQuestion.question.option3}
                    control={<Radio />}
                    classes={{
                      label: classes.label,
                    }}
                    label={`C. ${curQuestion.question.option3}`}
                  />
                  <FormControlLabel
                    value={curQuestion.question.option4}
                    control={<Radio />}
                    classes={{
                      label: classes.label,
                    }}
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
