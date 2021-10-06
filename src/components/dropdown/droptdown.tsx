import React, { ReactElement, useContext, useState } from "react";
import { SlugTuple, SlugType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { EditorContext } from "../blog-editor/editorMain";
import { useTheme } from "../provider/Provider";
import { Check } from "../svg/collection.svg";

export interface Props {
  visible: boolean;
  setType: (type: SlugType) => any;
  modes: SlugTuple[];
}

function DropDown({ visible, modes, setType }: Props): ReactElement {
  const { theme } = useTheme();
  const { slugType } = useContext(EditorContext);
  const [active, setActive] = useState<SlugType>(slugType);
  return (
    <div
      className={`${visible ? "h-auto p-2" : "h-0"} ${
        visible ? (theme === "light" ? "shadow-md border-b-2" : "") : ""
      } transition-all overflow-hidden flex duration-200 rounded-b-md justify-center flex-col w-36 absolute z-10 top-12`}
    >
      {modes.map((mode) => (
        <div
          className={`${getClasses("bg", theme, "btn")} ${getClasses(
            "text",
            theme,
            ""
          )} p-2 flex justify-between cursor-pointer`}
          onClick={() => {
            setActive(mode.type);
            setType(mode.type);
          }}
          key={mode.name}
        >
          <span
            className={`${
              theme === "light"
                ? "text-primary-text-light"
                : "text-primary-text-dark"
            }`}
          >
            {mode.name}
          </span>
          {active === mode.type && (
            <Check accent={true} color={getClasses("", theme, "icon")} />
          )}
        </div>
      ))}
    </div>
  );
}

export default DropDown;
