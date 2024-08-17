import { ReactElement } from "react";
import { LayoutType, ThemeType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";

interface Props {
  text: string;
  theme: ThemeType;
  type: LayoutType;
}

function PostExcerpt({ text, theme, type }: Props): ReactElement {
  return (
    <div
      className={`p-2 leading-7 ${
        type === "horiz" ? "w-8/12" : "w-full"
      } ${getClasses("text", theme, "text")}`}
    >
      {type === "horiz"
        ? text
        : text.length > 150
        ? text.slice(0, 150).concat("...")
        : text}
    </div>
  );
}

export default PostExcerpt;
