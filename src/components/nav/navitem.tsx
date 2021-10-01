import React, { ReactElement, ReactNode } from "react";
import { getClasses } from "../../utils/classNameResolver";
import { useTheme } from "../provider/Provider";

interface Props {
  children: ReactNode;
  callback?: () => any;
  className?: string;
}

function Navitem({ children, callback, className = "" }: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <button
      onClick={() => callback && callback()}
      className={`p-1 bg-transparent flex justify-between items-center rounded-sm ml-8 ${getClasses(
        "text",
        theme,
        "neon"
      )} hover:scale-110 transition-all duration-300 font-bold ${className}`}
    >
      {children}
    </button>
  );
}

export default Navitem;
