import { ReactElement } from "react";
import { ThemeType } from "../../types/globalTypes";

interface Props {
  tag: string;
  theme?: ThemeType;
}

function SimpleTags({ tag, theme }: Props): ReactElement {
  return (
    <button
      className={`p-1 m-1 rounded-sm ${
        theme === "dark"
          ? "bg-accent-dark text-text-neon"
          : theme === "light"
          ? "bg-yellow-400"
          : "bg-accent-neon text-primary-neon"
      }`}
    >
      {"#" + tag}
    </button>
  );
}

export default SimpleTags;
