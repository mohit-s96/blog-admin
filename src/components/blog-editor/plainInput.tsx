import React, { ReactElement } from "react";
import { ImageData } from "../../types/blogTypes";
import { EditorActionType, Action } from "../../types/globalTypes";
import Input from "../login/input";

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
  function resolveCommas(val: string) {
    let resolvedObject: Array<string> | Partial<ImageData> = {} as ImageData;

    const arr = val.split(",");
    resolvedObject = [];
    resolvedObject = resolvedObject.concat(...arr);

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
        className={`w-full text-2xl ${className}`}
        isTextArea={isTextArea}
      />
    </div>
  );
}

export default PlainInput;
