import React, { ReactElement, ReactNode } from "react";
import { useTheme } from "../provider/Provider";

interface Props {
  children: ReactNode;
  className?: string;
}

function Sideitem({ children, className = "" }: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <button
      className={`p-2 rounded-sm flex justify-between items-center mt-12 w-11/12 ${
        theme === "dark"
          ? "text-accent-dark"
          : theme === "light"
          ? "text-primary-light"
          : "text-accent-neon"
      } shadow-md hover:scale-110 transition-all duration-300 border-b ${
        theme === "dark"
          ? "border-accent-dark"
          : theme === "light"
          ? "border-primary-light"
          : "border-accent-neon"
      } border-l-4 font-bold ${className}`}
    >
      {children}
    </button>
  );
}

export default Sideitem;
