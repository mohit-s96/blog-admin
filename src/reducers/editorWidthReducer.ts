import { WidthContextType, WidthAction } from "../types/globalTypes";

const initialWidthState: WidthContextType = {
  editorRect: {},
  previewRect: {},
  parentRect: {},
  editorWidth: 0,
  previewWidth: 0,
};

export function getInititalWidthState() {
  return initialWidthState;
}

export const widthReducer = (
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
