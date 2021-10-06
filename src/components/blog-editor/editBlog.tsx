import React, { ReactElement, useContext, useEffect, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { EditorContext, WidthContext } from "./editorMain";
import PlainInput from "./plainInput";
import { useTheme } from "../provider/Provider";
import { getClasses } from "../../utils/classNameResolver";
import AddImage from "./addImage";
import SubmitBlog from "./submitBlog";
import CommentCheckbox from "./commentCheckbox";
import Editor from "./editor";

function EditBlog(): ReactElement {
  const { dispatch, title, readingTime, excerpt, tags, slug, commentsAllowed } =
    useContext(EditorContext);

  const { wDispatch, editorWidth } = useContext(WidthContext);

  const divRef = useRef(null);

  const { theme } = useTheme();

  const rect = useRect(divRef);

  useEffect(() => {
    wDispatch!({
      type: "E-RECT",
      payload: (
        divRef.current as unknown as HTMLDivElement
      ).getBoundingClientRect(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);

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
      <CommentCheckbox
        callback={() =>
          dispatch!({
            type: "SET_COMMENT",
            payload: !commentsAllowed as any,
          })
        }
        condition={commentsAllowed}
        theme={theme}
      />
      <Editor theme={theme} />
      <div className="flex justify-center p-2">
        <SubmitBlog />
      </div>
    </div>
  );
}

export default EditBlog;
