import { Action, EditorType } from "../types/globalTypes";

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
    case "SET_SLUG":
      return "slug";
    case "SET_COMMENT":
      return "commentsAllowed";
    case "CHANGE_MODE":
      return "slugType";
    default:
      return "";
  }
}
export function syncToLocalStorage(
  data: any,
  type: Action["type"],
  state: EditorType
) {
  if (type !== "HEROIMG" && type !== "ADD_FILE" && type !== "RESET_STATE") {
    const temp: EditorType = {
      ...state,
      heroImg: [],
      files: [],
      [resolveType(type)]: data,
    };
    localStorage.setItem("nomark", JSON.stringify(temp));
  }
}
