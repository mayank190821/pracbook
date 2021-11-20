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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import {compile} from "./../api/exam.api";
import { useSelector } from "react-redux";
import { getCode } from "../redux/selectors/code.selector";

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
  }
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
    marginLeft: "20px"
  },
  buttons:{
    display: "flex",
    float: "right",
  },
  editor:{
    marginTop: "10px",
    height: "100vh",
  },
  problem: {
    height: "100vh",
    overflowY: "scroll",
    overflowX: "auto",
    padding: "0px 10px",
  }
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

export default function MiniDrawer() {
  const classes = useStyles();
  const [language, setLanguage] = React.useState({
    value: "java",
    code: 62
  });
  const [output, setOutput] = React.useState("");

  const {sourceCode} = useSelector(getCode);

  const handleLanguageChange = (event) => {
    let code;
    switch(event.target.value){
      case "javascript" : code = 63; break;
      case "python" : code = 71; break;
      default : code = 62;
    }
    setLanguage({...language, value: event.target.value, code: code});
  };
  const [editorTheme, setEditorTheme] = React.useState("github");

  const handleThemeChange = (event) => {
    setEditorTheme(event.target.value);
  };
  const handleSubmit = () => {
    let data = {
      language_id: language.code,
      source_code: sourceCode,
      stdin: "123456",
    }
    console.log(language.code);
    compile(data).then((response) =>{
      if(response.stderr)
        setOutput(response.status.description + "\n\n" + response.stderr);
      else if(response.stdout)
        setOutput(response.status.description + "\n\n" + response.stdout);
      else
        setOutput("");
      console.log(response.status, response);
    })
  }
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            PracBook Assessment
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent">
        <DrawerHeader></DrawerHeader>
        <List className={classes.list}>
          {["1", "2", "3", "4"].map((text, index) => (
            <ListItem button key={text} className={classes.listItem}>
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
        <Typography className={classes.problem} paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
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
          <h2 style={{ marginLeft: "20px", fontSize: "25px", fontWeight: "400", padding: "5px" }}>Output</h2>
          <TextareaAutosize
            aria-label="empty textarea"
            className={classes.testCases}
            value={output}
          />
          <div className = {classes.buttons}>
            <Button variant="outlined" className={classes.runCode} style={{margin: "10px", marginBottom: "5px"}}>Run Code</Button>
            <Button onClick={handleSubmit} variant="contained" className={classes.submitCode} style={{margin: "10px", marginBottom: "5px"}}>Submit</Button>
          </div>
        </div>
      </Box>
    </Box>
  );
}


