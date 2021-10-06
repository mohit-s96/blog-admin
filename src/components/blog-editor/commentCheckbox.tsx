import React, { ReactElement } from "react";
import { ThemeType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { Check } from "../svg/collection.svg";

interface Props {
  callback: () => any;
  theme: ThemeType;
  condition: boolean;
}

function CommentCheckbox({ callback, theme, condition }: Props): ReactElement {
  return (
    <div className="flex items-center p-2 m-2 flex-col">
      <div className="flex justify-start w-10/12 relative items-center">
        <label
          className={`${getClasses(
            "text",
            theme,
            "btn"
          )} p-2 text-lg font-bold pl-0`}
          style={{
            textAlign: "left",
          }}
        >
          allow comments:
        </label>
        <div className="relative cursor-pointer translate-y-[-8px]">
          <span
            className="absolute top-0 left-0 h-[22px] w-[22px] flex justify-center items-center rounded-full"
            onClick={callback}
            style={{
              backgroundColor: condition ? "transparent" : "#797979",
            }}
          >
            {condition ? (
              <Check color={getClasses("accent", theme, "icon")} />
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommentCheckbox;
