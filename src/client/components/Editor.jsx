import React, { useEffect } from "react";
import AceEditor from "react-ace";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { saveCode } from "../redux/actions/code.action";

import "ace-builds/src-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-tomorrow_night";

const Editor = ({ editorTheme, language }) => {
  const useStyles = makeStyles((theme) => ({
    editorClass: {
      marginLeft: "20px",
      minWidth: "55vw",
      maxHeight: "50vh",
      border: "2px solid black",
    },
  }));

  const [sourceCode, setSourceCode] = React.useState("// Write your code here");
  const dispatch = useDispatch();

  const classes = useStyles();

  const [theme, setTheme] = React.useState(editorTheme);
  const [mode, setMode] = React.useState(language);

  const template = {
    java: "// Don't change class name\nclass Main{\n\tpublic static void main(String[] args){\n\t\t// write your code here.\n\t}\n}",
    javascript: "// write your code here.",
    python: "# write your code here.",
  };

  useEffect(() => {
    setTheme(editorTheme);
    setMode(language);
    setSourceCode(template[mode]);
  }, [language, editorTheme, mode]);

  useEffect(() => {
    dispatch(saveCode(sourceCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceCode]);

  return (
    <AceEditor
      className={classes.editorClass}
      placeholder=""
      mode={mode}
      theme={theme}
      name="editor"
      onChange={(value) => setSourceCode(value)}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={sourceCode}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default Editor;
