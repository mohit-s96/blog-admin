import React, { ReactElement, useContext } from "react";
import { ImageData } from "../../types/blogTypes";
import Input from "../login/input";
import { Action, EditorActionType, EditorContext } from "./editorMain";

interface Props {
  commaSeparated?: boolean;
  fieldName: string;
  fieldType: EditorActionType;
  value: string;
  isTextArea?: boolean;
  className?: string;
  dispatch?: React.Dispatch<Action>;
}

function PlainInput({
  commaSeparated,
  fieldName,
  dispatch,
  value,
  fieldType,
  isTextArea = false,
  className = "",
}: Props): ReactElement {
  const { heroImg } = useContext(EditorContext);

  function resolveCommas(val: string) {
    let resolvedObject: Array<string> | Partial<ImageData> = {} as ImageData;
    if (fieldType === "HEROIMG") {
      val = val.replace(/\n/, "");
      const arr = val.split(",");
      resolvedObject = { alt: undefined, uri: undefined } as Partial<ImageData>;

      if (heroImg.alt !== undefined && heroImg.uri) {
        resolvedObject.uri = heroImg.uri;
        resolvedObject.alt = arr[1];
      } else if (arr[0]) {
        resolvedObject.uri = arr[0];
      }

      if (val.endsWith(",")) {
        if (heroImg.alt === undefined) {
          resolvedObject.alt = "";
          resolvedObject.uri += ",";
        }
      }
    }
    if (fieldType === "TAGS") {
      const arr = val.split(",");

      resolvedObject = [];

      resolvedObject = resolvedObject.concat(...arr);
    }
    if (fieldType === "BODY") {
      if (val.endsWith("{")) {
        return (val += "\n\t}");
      }
      if (val.endsWith("*")) {
        return (val += "*");
      }
      return val;
    }
    return resolvedObject;
  }
  return (
    <div className="p-2 m-2 flex-col flex items-center w-full">
      <Input
        name={fieldName}
        type="text"
        value={value}
        onChange={(e) =>
          dispatch &&
          dispatch({
            type: fieldType,
            payload: commaSeparated
              ? (resolveCommas(e.target.value) as Action["payload"])
              : (e.target.value as Action["payload"]),
          })
        }
        containerClassName="w-10/12 items-center"
        labelClassName="w-full text-2xl"
        className={`w-full text-2xl bg-primary-bg-light bg-opacity-95 focus-visible:bg-opacity-100 transition-all ${className}`}
        isTextArea={isTextArea}
      />
    </div>
  );
}

export default PlainInput;
