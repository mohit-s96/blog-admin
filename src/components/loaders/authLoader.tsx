import React, { ReactElement } from "react";
import { ThemeType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { Loader } from "../svg/svg.collection";

interface Props {
  theme: ThemeType;
}

function AuthLoader({ theme }: Props): ReactElement {
  return (
    <div
      className={`w-full h-screen flex justify-center items-center ${getClasses(
        "bg",
        theme
      )}`}
    >
      <div className="w-1/12">
        <Loader color={theme === "light" ? "crimson" : "cyan"} />
      </div>
    </div>
  );
}

export default AuthLoader;
