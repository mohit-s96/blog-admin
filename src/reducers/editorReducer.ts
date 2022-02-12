import { BlogSlug, ImageData } from "../types/blogTypes";
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
  slugType: "md",
  commentsAllowed: true,
  slug: "",
  loading: false,
  error: "",
  isArchived: false,
};

export function getInitialEditorState(state: BlogSlug | undefined) {
  if (!state) return initialState;
  else {
    let initState: EditorType;
    initState = {
      body: state.rawBody as string,
      heroImg: state.images,
      commentsAllowed: state.commentsAllowed,
      error: "",
      loading: false,
      tags: state.tags,
      excerpt: state.excerpt,
      readingTime: state.readingTime,
      files: [],
      slugType: state.slugType,
      slug: state.uri,
      title: state.title,
      isArchived: state.isArchived,
    };
    return initState;
  }
}

export const reducer = (
  state = initialState,
  { payload, type }: Action
): EditorType => {
  syncToLocalStorage(payload, type, state);
  switch (type) {
    case "RESET_STATE":
      localStorage.removeItem("nomark");
      return initialState;
    case "SET_LOADING":
      return {
        ...state,
        loading: payload as any,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: payload,
      };
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
    case "SET_PERM_URI":
      return {
        ...state,
        heroImg: payload as unknown as ImageData[],
      };
    case "SET_ARCHIVE":
      return {
        ...state,
        isArchived: payload as unknown as boolean,
      };
    default:
      return state;
  }
};
