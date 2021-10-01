import React, { ReactElement } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";

function Test(): ReactElement {
  function onChange(val: string) {
    console.log(val);
  }
  return (
    <AceEditor
      placeholder="Placeholder Text"
      mode="javascript"
      theme="twilight"
      name="blah2"
      onChange={onChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={``}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
}

export default Test;
