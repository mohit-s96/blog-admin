import React, { ReactElement, useContext, useEffect, useRef } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useRect } from "../../hooks/useRect";
import { EditorContext, WidthContext } from "./editorMain";
import PlainInput from "./plainInput";

function EditBlog(): ReactElement {
  const { dispatch, title, readingTime, excerpt, heroImg, tags, body } =
    useContext(EditorContext);

  const { wDispatch, editorWidth } = useContext(WidthContext);

  const divRef = useRef(null);

  const rect = useRect(divRef);

  const lsData = useLocalStorage("nomark");

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

  return (
    <div
      className={`w-[49%] h-full border-2 border-cyan border-r-0 overflow-hidden overflow-y-scroll style-scroll max-h-[89vh]`}
      ref={divRef}
      style={{
        width: `${editorWidth! > 0 ? editorWidth + "px" : ""}`,
      }}
    >
      <div className="p-1 font-bold text-center text-primary-dark text-2xl bg-cyan">
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
      <PlainInput
        dispatch={dispatch}
        fieldName="hero image"
        fieldType="HEROIMG"
        value={
          heroImg.uri +
          (heroImg.uri && heroImg.alt !== undefined ? "\n" + heroImg.alt : "")
        }
        commaSeparated={true}
        isTextArea={true}
      />
      <PlainInput
        dispatch={dispatch}
        fieldName="tags"
        fieldType="TAGS"
        value={tags.join(",")}
        commaSeparated={true}
        isTextArea={true}
      />
      <PlainInput
        dispatch={dispatch}
        fieldName="nomark"
        fieldType="BODY"
        value={body || lsData}
        isTextArea={true}
        className="min-h-[80vh]"
      />
    </div>
  );
}

export default EditBlog;
