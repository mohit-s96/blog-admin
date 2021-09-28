import React, { ReactElement } from "react";
import { ThemeType } from "../../types/globalTypes";

interface Props {
  tag: string;
  theme?: ThemeType;
}

function SimpleTags({ tag, theme }: Props): ReactElement {
  return (
    <button
      className={`p-1 m-1 rounded-sm ${
        theme === "dark" ? "bg-cyan text-primary-dark" : "bg-yellow-400"
      }`}
    >
      {"#" + tag}
    </button>
  );
}

export default SimpleTags;
