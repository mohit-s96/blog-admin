import { ImageData } from "../types/blogTypes";
import { Action, EditorType } from "../types/globalTypes";
import { syncToLocalStorage } from "../utils/syncToLs";

const initialState: EditorType = {
  title: "",
  heroImg: [],
  tags: [],
  excerpt: "",
  readingTime: "",
  files: [],
  body: "",
  slugType: "nm",
  commentsAllowed: true,
  slug: "",
};

export function getInitialEditorState() {
  return initialState;
}

export const reducer = (
  state = initialState,
  { payload, type }: Action
): EditorType => {
  syncToLocalStorage(payload, type, state);
  switch (type) {
    case "SET_COMMENT":
      return {
        ...state,
        commentsAllowed: payload as any,
      };
    case "SET_SLUG":
      return {
        ...state,
        slug: payload,
      };
    case "CHANGE_MODE":
      return {
        ...state,
        slugType: payload as any,
      };
    case "ADD_FILE":
      return {
        ...state,
        files: payload as any,
      };
    case "REM_IMG":
      return {
        ...state,
        heroImg: state.heroImg.filter((img) => img.uri !== payload),
      };
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
      if (!state.heroImg.length) {
        const heroImgData = payload as unknown as ImageData;
        heroImgData.isHero = true;
        payload = heroImgData as any;
      }
      return {
        ...state,
        heroImg: state.heroImg.concat(payload as any),
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
