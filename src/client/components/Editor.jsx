import React, {useEffect} from "react";
import AceEditor from "react-ace";
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
      style={{ border:"2px solid black" }}
      placeholder="Placeholder Text"
      mode={mode}
      theme={theme}
      name="blah2"
      onLoad={onChange}
      onChange={onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={`function onLoad(editor) {
      console.log("i've loaded");
      }`}
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
