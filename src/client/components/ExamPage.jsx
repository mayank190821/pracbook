import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
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

const languages = [
  {
    value: "java",
    label: "Java",
  },
  {
    value: "javascript",
    label: "Javascript",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "c_cpp",
    label: "C++",
  }
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
    // margin: "20px !important",
    width: "80px",
  },
  listItem: {
    borderBottom: "1px solid #e2e2e2 !important",
  },
  listItemText: {
    textAlign: "center",
  },
  mainBox : {
      display:"flex",
      marginTop:"30px"
  },
  inputArea: {
    height:"10% !important",
    width:"30%",
    marginBottom: "10px"
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
  const [language, setLanguage] = React.useState("java");

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const [editorTheme, setEditorTheme] = React.useState("github");

  const handleThemeChange = (event) => {
    setEditorTheme(event.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            PracBook Assesment
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
        <Typography paragraph>
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
            value={language}
            onChange={handleLanguageChange}
            // helperText="Please select your language"
            className={classes.inputArea}
            style={{ marginRight: "5%" }}
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
          <Editor editorTheme={editorTheme} language={language} />
        </div>
      </Box>
    </Box>
  );
}


