import React, { ReactElement, useContext, useEffect, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { EditorContext, WidthContext } from "./editorMain";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import PlainInput from "./plainInput";
import { useTheme } from "../provider/Provider";
import { getClasses } from "../../utils/classNameResolver";
import AddImage from "./addImage";

function EditBlog(): ReactElement {
  const { dispatch, title, readingTime, excerpt, heroImg, tags, body } =
    useContext(EditorContext);

  const { wDispatch, editorWidth } = useContext(WidthContext);

  const divRef = useRef(null);

  const { theme } = useTheme();

  const rect = useRect(divRef);

  useEffect(() => {
    wDispatch &&
      wDispatch({
        type: "E-RECT",
        payload: (
          divRef.current as unknown as HTMLDivElement
        ).getBoundingClientRect(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);
  function onChange(val: string) {
    dispatch && dispatch({ type: "BODY", payload: val as any });
  }
  return (
    <div
      className={`w-[49%] h-full overflow-hidden overflow-y-scroll style-scroll max-h-[89vh] width-transition`}
      ref={divRef}
      style={{
        width: `${editorWidth! > 0 ? editorWidth + "px" : ""}`,
      }}
    >
      <div
        className={`p-1 font-bold text-center text-2xl ${getClasses(
          "text",
          theme,
          "btn"
        )}`}
      >
        create blog
      </div>
      <PlainInput
        dispatch={dispatch}
        fieldName="title"
        fieldType="TITLE"
        value={title}
      />
      <PlainInput
        dispatch={dispatch}
        fieldName="reading time"
        fieldType="RTIME"
        value={readingTime}
      />
      <PlainInput
        dispatch={dispatch}
        fieldName="excerpt"
        fieldType="EXCERPT"
        value={excerpt}
        isTextArea={true}
      />
      <AddImage name="add images" />
      <PlainInput
        dispatch={dispatch}
        fieldName="tags"
        fieldType="TAGS"
        value={tags.join(",")}
        commaSeparated={true}
        isTextArea={true}
      />
      <div className="flex items-center p-2 m-2 flex-col">
        <div className="flex justify-start w-10/12">
          <label
            className={`${getClasses(
              "text",
              theme,
              "btn"
            )} p-2 text-lg font-bold pl-0`}
            style={{
              textAlign: "left",
            }}
          >
            {"nomark"}:{" "}
          </label>
        </div>
        <AceEditor
          placeholder="nomark data"
          mode="javascript"
          name="blah2"
          onChange={onChange}
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={body}
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
    </div>
  );
}

export default EditBlog;
