import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { ImageData } from "../../types/blogTypes";
import WithTransition from "../hoc/withTransition";
import EditBlog from "./editBlog";
import PageDivider from "./pageDivider";
import Preview from "./preview";

export type EditorActionType =
  | "TITLE"
  | "EXCERPT"
  | "RTIME"
  | "BODY"
  | "TAGS"
  | "HEROIMG"
  | "ALL";

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
function resolveType(type: Action["type"]) {
  switch (type) {
    case "BODY":
      return "body";
    case "EXCERPT":
      return "excerpt";
    case "HEROIMG":
      return "heroImg";
    case "RTIME":
      return "readingTime";
    case "TAGS":
      return "tags";
    case "TITLE":
      return "title";
    default:
      return "";
  }
}
function syncToLocalStorage(
  data: any,
  type: Action["type"],
  state: EditorType
) {
  const temp = {
    ...state,
    [resolveType(type)]: data,
  };
  localStorage.setItem("nomark", JSON.stringify(temp));
}
const reducer = (
  state = initialState,
  { payload, type }: Action
): EditorType => {
  syncToLocalStorage(payload, type, state);
  switch (type) {
    case "ALL":
      return {
        ...(payload as any),
      };
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
        tags: payload,
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

export type WidthActionType =
  | "E-RECT"
  | "P-RECT"
  | "E-WIDTH"
  | "P-WIDTH"
  | "PARENT";

export type WidthAction = {
  type: WidthActionType;
  payload: any;
};

export interface WidthContextType {
  editorRect: DOMRect | {};
  previewRect: DOMRect | {};
  parentRect: DOMRect | {};
  editorWidth: number | null;
  previewWidth: number | null;
  wDispatch?: React.Dispatch<WidthAction>;
}

const initialWidthState: WidthContextType = {
  editorRect: {},
  previewRect: {},
  parentRect: {},
  editorWidth: 0,
  previewWidth: 0,
};

const widthReducer = (
  state = initialWidthState,
  { type, payload }: WidthAction
): WidthContextType => {
  switch (type) {
    case "E-WIDTH":
      return {
        ...state,
        editorWidth: payload,
      };
    case "E-RECT":
      return {
        ...state,
        editorRect: payload,
      };
    case "P-RECT":
      return {
        ...state,
        previewRect: payload,
      };
    case "P-WIDTH":
      return {
        ...state,
        previewWidth: payload,
      };
    case "PARENT":
      return {
        ...state,
        parentRect: payload,
      };
    default:
      return state;
  }
};

export const WidthContext =
  React.createContext<WidthContextType>(initialWidthState);

function EditorMain(): ReactElement {
  const [data, dispatch] = useReducer(reducer, initialState);
  const divRef = useRef(null);
  const rect = useRect(divRef);
  const [widthData, widthDispatch] = useReducer(
    widthReducer,
    initialWidthState
  );

  useEffect(() => {
    widthDispatch({
      type: "PARENT",
      payload: rect,
    });
  }, [rect]);

  useEffect(() => {
    const data = localStorage.getItem("nomark");
    if (data) {
      dispatch({
        type: "ALL",
        payload: JSON.parse(data),
      });
    }
  }, []);

  return (
    <WithTransition slide="right">
      <EditorContext.Provider
        value={{
          ...data,
          dispatch,
        }}
      >
        <WidthContext.Provider
          value={{
            ...widthData,
            wDispatch: widthDispatch,
          }}
        >
          <div className="w-11/12 flex opacity-[inherit]" ref={divRef}>
            <EditBlog />
            <PageDivider />
            <Preview />
          </div>
        </WidthContext.Provider>
      </EditorContext.Provider>
    </WithTransition>
  );
}

export default EditorMain;
