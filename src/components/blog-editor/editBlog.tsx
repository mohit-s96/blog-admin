import { ReactElement, useContext, useEffect, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { EditorContext, WidthContext } from "./editorMain";
import PlainInput from "./plainInput";
import { useTheme } from "../provider/Provider";
import { getClasses } from "../../utils/classNameResolver";
import AddImage from "./addImage";
import SubmitBlog from "./submitBlog";
import CommentCheckbox from "./commentCheckbox";
import Editor from "./editor";
import { BlogSlug } from "../../types/blogTypes";

interface Props {
  state: BlogSlug | undefined;
}

function EditBlog({ state }: Props): ReactElement {
  const {
    dispatch,
    title,
    readingTime,
    excerpt,
    tags,
    slug,
    commentsAllowed,
    isArchived,
    keywords,
  } = useContext(EditorContext);

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
      <AddImage name="add image" />
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
        fieldName="keywords"
        fieldType="KEYWORDS"
        value={keywords.join(",")}
        commaSeparated={true}
        isTextArea={true}
      />
      <CommentCheckbox
        name="allow comments:"
        callback={() =>
          dispatch!({
            type: "SET_COMMENT",
            payload: !commentsAllowed as any,
          })
        }
        condition={commentsAllowed}
        theme={theme}
      />
      <CommentCheckbox
        name="is archived ?"
        callback={() =>
          dispatch!({
            type: "SET_ARCHIVE",
            payload: !isArchived as any,
          })
        }
        condition={isArchived}
        theme={theme}
      />
      <Editor theme={theme} />
      <div className="flex justify-center p-2">
        <button
          onClick={() => {
            dispatch!({
              type: "RESET_STATE",
              payload: "",
            });
          }}
          className={`p-2 m-2 rounded-md ${getClasses(
            "bg",
            theme,
            "btn"
          )} ${getClasses("text", theme, "")}`}
        >
          reset editor
        </button>
        <SubmitBlog state={state} />
      </div>
    </div>
  );
}

export default EditBlog;
