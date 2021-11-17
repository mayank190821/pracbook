import React from "react";
import AceEditor from "react-ace";

const Editor = () => {
  const onChange = (value) => {
    console.log(value);
  };

  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="javascript"
      theme="ace/theme/dark"
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
