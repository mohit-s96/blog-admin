import { ReactElement, useContext, useState } from "react";
import { SlugType, ThemeType } from "../../types/globalTypes";
import { EditorContext } from "./editorMain";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-dracula";
import EditorMode from "./editorMode";

interface Props {
  theme: ThemeType;
}

function Editor({ theme }: Props): ReactElement {
  const { dispatch, slugType, body } = useContext(EditorContext);

  const [visible, setVisible] = useState(false);

  function onChange(val: string) {
    dispatch!({ type: "BODY", payload: val as any });
  }

  function resolveSlugType(type: SlugType) {
    return type === "nm" ? "nomark" : type === "html" ? "html" : "markdown";
  }

  return (
    <div className="flex items-center p-2 m-2 flex-col">
      <EditorMode
        theme={theme}
        labelName={() => resolveSlugType(slugType)}
        showDropDown={() => setVisible(!visible)}
        visible={visible}
        changeMode={(type: SlugType) => {
          dispatch!({ type: "CHANGE_MODE", payload: type as any });
        }}
        setBody={(body: string) => {
          dispatch!({ type: "BODY", payload: body });
        }}
      />
      <AceEditor
        placeholder={`${resolveSlugType(slugType)} data`}
        mode="markdown"
        name="blah2"
        onChange={onChange}
        theme="dracula"
        fontSize={20}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={body}
        wrapEnabled
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        className="w-full p-2 m-2"
        style={{
          width: "84%",
          // fontSize: "18px",
          height: "80vh",
        }}
      />
    </div>
  );
}

export default Editor;
