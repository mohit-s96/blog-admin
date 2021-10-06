import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRect } from "../../hooks/useRect";
import { EditorContext, WidthContext } from "./editorMain";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import PlainInput from "./plainInput";
import { useTheme } from "../provider/Provider";
import { getClasses } from "../../utils/classNameResolver";
import AddImage from "./addImage";
import SubmitBlog from "./submitBlog";
import { SlugTuple, SlugType } from "../../types/globalTypes";
import DropDown from "../dropdown/droptdown";
import { Check, Solid } from "../svg/collection.svg";

function EditBlog(): ReactElement {
  const {
    dispatch,
    title,
    readingTime,
    excerpt,
    tags,
    body,
    slugType,
    slug,
    commentsAllowed,
  } = useContext(EditorContext);

  const { wDispatch, editorWidth } = useContext(WidthContext);

  const [visible, setVisible] = useState(false);

  const divRef = useRef(null);

  const { theme } = useTheme();

  const rect = useRect(divRef);

  const slugModes: SlugTuple[] = [
    { name: "html", type: "html" },
    { name: "markdown", type: "md" },
    { name: "nomark", type: "nm" },
  ];

  useEffect(() => {
    wDispatch!({
      type: "E-RECT",
      payload: (
        divRef.current as unknown as HTMLDivElement
      ).getBoundingClientRect(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);
  function onChange(val: string) {
    dispatch!({ type: "BODY", payload: val as any });
  }
  function resolveSlugType(type: SlugType) {
    return type === "nm" ? "nomark" : type === "html" ? "html" : "markdown";
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
        fieldName="slug"
        fieldType="SET_SLUG"
        value={slug}
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
        <div className="flex justify-start w-10/12 relative items-center">
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
            allow comments:
          </label>
          <div className="relative cursor-pointer translate-y-[-8px]">
            <input
              className={`absolute opacity-0 cursor-pointer h-0 w-0`}
              type="checkbox"
              checked={commentsAllowed}
            />
            <span
              className="absolute top-0 left-0 h-[22px] w-[22px] flex justify-center items-center rounded-full"
              onClick={() =>
                dispatch!({
                  type: "SET_COMMENT",
                  payload: !commentsAllowed as any,
                })
              }
              style={{
                backgroundColor: commentsAllowed ? "transparent" : "#797979",
              }}
            >
              {commentsAllowed ? (
                <Check color={getClasses("accent", theme, "icon")} />
              ) : null}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center p-2 m-2 flex-col">
        <div className="flex justify-between w-10/12 relative items-center">
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
            {resolveSlugType(slugType)}:{" "}
          </label>
          <div
            className="flex p-2 justify-center items-center cursor-pointer"
            onClick={() => setVisible(!visible)}
          >
            <DropDown
              modes={slugModes}
              visible={visible}
              setType={(type) => {
                dispatch!({ type: "CHANGE_MODE", payload: type as any });
              }}
            />
            <span
              className={`font-bold p-2 ${getClasses("text", theme, "btn")}`}
            >
              change
            </span>
            <Solid color={getClasses("accent", theme, "icon")} />
          </div>
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
      <div className="flex justify-center p-2">
        <SubmitBlog />
      </div>
    </div>
  );
}

export default EditBlog;
