import React, { ReactElement, useContext } from "react";
import { EditorContext } from "./editorMain";
import PlainInput from "./plainInput";
const testMatch =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
function EditBlog(): ReactElement {
  const { dispatch, title, readingTime, excerpt, heroImg, tags } =
    useContext(EditorContext);
  return (
    <div className="w-6/12 h-full border-2 border-cyan">
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
      {heroImg.uri &&
      testMatch.test(heroImg.uri) &&
      heroImg.uri.endsWith(",") ? (
        <div className="p-2 m-2 w-10/12">
          <img
            src={heroImg.uri.slice(0, -1)}
            alt={heroImg.alt}
            className="w-full"
          />
        </div>
      ) : null}
    </div>
  );
}

export default EditBlog;
