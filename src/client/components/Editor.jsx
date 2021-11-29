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

const Editor = ({ editorTheme, language, index }) => {
  const useStyles = makeStyles((theme) => ({
    editorClass: {
      marginLeft: "20px",
      minWidth: "55vw",
      maxHeight: "50vh",
      border: "2px solid black",
    },
  }));

  const [curSourceCode, setCurSourceCode] = React.useState();
  const dispatch = useDispatch();
  // const { sourceCode } = useSelector(getCode);

  const classes = useStyles();

  const [theme, setTheme] = React.useState(editorTheme);
  const [mode, setMode] = React.useState(language);

  const template = {
    java: "// Don't change class name\nclass Main{\n\tpublic static void main(String[] args){\n\t\t// write your code here.\n\t}\n}",
    javascript: "// write your code here.",
    python: "# write your code here.",
  };

  useEffect(() => {
    let code = localStorage.getItem(`cp${index}`);
    if (!curSourceCode && code !== null) {
      console.log("saved local code");
      setCurSourceCode(code);
      setTimeout(() => setCurSourceCode(code + " "), 500);
    } else if (code !== curSourceCode) {
      console.log("language editor");
      setMode(language);
      setCurSourceCode(template[mode]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, mode, index]);

  useEffect(() => {
    setTheme(editorTheme);
  }, [editorTheme]);

  useEffect(() => {
    // console.log("editor to redux");
    if (curSourceCode) dispatch(saveCode(curSourceCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSourceCode]);

  return (
    <AceEditor
      className={classes.editorClass}
      placeholder=""
      mode={mode}
      theme={theme}
      name="editor"
      onChange={(value) => setCurSourceCode(value)}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={curSourceCode}
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
