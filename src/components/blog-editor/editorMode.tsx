import React, { ReactElement, useRef } from "react";
import { SlugTuple, SlugType, ThemeType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import DropDown from "../dropdown/droptdown";
import Input from "../login/input";
import { Solid } from "../svg/collection.svg";
import { Upload } from "../svg/svg.collection";

interface Props {
  theme: ThemeType;
  labelName: () => string;
  showDropDown: () => any;
  visible: boolean;
  changeMode: (type: SlugType) => any;
  setBody: (body: string) => void;
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
  setBody,
}: Props): ReactElement {
  const clickRef = useRef(null);

  const handleClick = () => {
    if (clickRef.current) {
      (clickRef.current as HTMLInputElement).click();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (file && file.name) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const output = e.target!.result;
        if (typeof output === "string") setBody(output);
      }; //end onload()
      reader.readAsText(file);
    }
  };
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
        <span className="mr-2 flex" onClick={handleClick}>
          upload markdown file:{""}
          <Upload
            color={getClasses("accent", theme, "icon")}
            className="cursor-pointer hover:scale-150 transition-transform duration-300 mx-2"
          />
          <Input
            name="add images"
            onChange={handleChange as any}
            type="file"
            label={false}
            className="hidden"
            clickRef={clickRef}
          />
        </span>
      </label>
      <div
        className="flex p-2 justify-center items-center cursor-pointer"
        onClick={showDropDown}
      >
        <DropDown modes={slugModes} visible={visible} setType={changeMode} />
        <span className={`font-bold p-2 ${getClasses("text", theme, "btn")}`}>
          change editor mode
        </span>
        <Solid color={getClasses("accent", theme, "icon")} />
      </div>
    </div>
  );
}

export default EditorMode;
