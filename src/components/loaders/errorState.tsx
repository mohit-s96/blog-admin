import React, { ReactElement } from "react";
import { ThemeType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { ErrorCat } from "../svg/appstates.svg";

interface Props {
  theme: ThemeType;
  className?: string;
}

function ErrorState({ theme, className }: Props): ReactElement {
  return (
    <div
      className={`w-full h-screen flex justify-center items-center ${getClasses(
        "bg",
        theme
      )} ${className}`}
    >
      <div className="w-5/12 flex flex-col justify-center items-center">
        <ErrorCat color={theme === "light" ? "crimson" : "cyan"} />
        <span
          className={`p-2 m-1 text-2xl font-bold ${getClasses(
            "text",
            theme,
            "btn"
          )}`}
        >
          Something went wrong. Please refresh and try again
        </span>
      </div>
    </div>
  );
}

export default ErrorState;
