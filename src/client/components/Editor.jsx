import React, {useEffect} from "react";
import AceEditor from "react-ace";
import { makeStyles } from "@mui/styles";

import "ace-builds/src-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-tomorrow_night";

const Editor = ({editorTheme, language}) => { 

  const useStyles = makeStyles((theme) => ({
    editorClass: {
      marginLeft: "20px",
      minWidth: "800px",
      maxHeight: "400px",
      border: "2px solid black"
    }
  }))

  const classes = useStyles();
  
  const onChange = (value) => {
    console.log(value);
  };
  const [theme, setTheme] = React.useState(editorTheme);
  const [mode, setMode] = React.useState(language);

  useEffect(() => {
    setTheme(editorTheme);
    setMode(language);
  }, [language, editorTheme])
  return (
    <AceEditor
    className={classes.editorClass}
      placeholder=""
      mode={mode}
      theme={theme}
      name="blah2"
      onLoad={onChange}
      onChange={onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={"// Write your code here"}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default Editor;
