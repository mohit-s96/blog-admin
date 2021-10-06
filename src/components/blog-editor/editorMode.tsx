import React, { ReactElement } from "react";
import { SlugTuple, SlugType, ThemeType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import DropDown from "../dropdown/droptdown";
import { Solid } from "../svg/collection.svg";

interface Props {
  theme: ThemeType;
  labelName: () => string;
  showDropDown: () => any;
  visible: boolean;
  changeMode: (type: SlugType) => any;
}
const slugModes: SlugTuple[] = [
  { name: "html", type: "html" },
  { name: "markdown", type: "md" },
  { name: "nomark", type: "nm" },
];
function EditorMode({
  theme,
  labelName,
  showDropDown,
  visible,
  changeMode,
}: Props): ReactElement {
  return (
    <div className="flex justify-between w-10/12 relative items-center">
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
        {labelName()}:{" "}
      </label>
      <div
        className="flex p-2 justify-center items-center cursor-pointer"
        onClick={showDropDown}
      >
        <DropDown modes={slugModes} visible={visible} setType={changeMode} />
        <span className={`font-bold p-2 ${getClasses("text", theme, "btn")}`}>
          change
        </span>
        <Solid color={getClasses("accent", theme, "icon")} />
      </div>
    </div>
  );
}

export default EditorMode;
