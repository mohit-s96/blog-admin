import React, { ReactElement, useReducer } from "react";
import { ImageData } from "../../types/blogTypes";
import WithTransition from "../hoc/withTransition";
import EditBlog from "./editBlog";
import Preview from "./preview";

export type EditorActionType =
  | "TITLE"
  | "EXCERPT"
  | "RTIME"
  | "BODY"
  | "TAGS"
  | "HEROIMG";

export interface EditorType {
  title: string;
  heroImg: ImageData;
  tags: Array<string>;
  excerpt: string;
  readingTime: string;
  body: string;
  dispatch?: React.Dispatch<Action>;
}

const initialState: EditorType = {
  title: "",
  heroImg: {
    alt: "",
    uri: "",
  },
  tags: [],
  excerpt: "",
  readingTime: "",
  body: "",
};
export const EditorContext = React.createContext<EditorType>(initialState);

export type Action = {
  type: EditorActionType;
  payload: string & ImageData & [string];
};

const reducer = (
  state = initialState,
  { payload, type }: Action
): EditorType => {
  switch (type) {
    case "BODY":
      return {
        ...state,
        body: payload,
      };
    case "EXCERPT":
      return {
        ...state,
        excerpt: payload,
      };
    case "HEROIMG":
      return {
        ...state,
        heroImg: {
          alt: payload.alt,
          uri: payload.uri,
        },
      };
    case "RTIME":
      return {
        ...state,
        readingTime: payload,
      };
    case "TAGS":
      return {
        ...state,
        tags: state.tags.concat(payload),
      };
    case "TITLE":
      return {
        ...state,
        title: payload,
      };
    default:
      return state;
  }
};

function EditorMain(): ReactElement {
  const [data, dispatch] = useReducer(reducer, initialState);
  return (
    <WithTransition slide="right">
      <EditorContext.Provider
        value={{
          ...data,
          dispatch,
        }}
      >
        <div className="w-11/12 flex opacity-[inherit]">
          <EditBlog />
          <Preview />
        </div>
      </EditorContext.Provider>
    </WithTransition>
  );
}

export default EditorMain;
