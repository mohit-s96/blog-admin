import { ReactElement, ReactNode } from "react";
import { getClasses } from "../../utils/classNameResolver";
import { useTheme } from "../provider/Provider";

interface Props {
  children: ReactNode;
  className?: string;
}

function CreateNew({ children, className = "" }: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <div
      className={`flex justify-between items-center p-2 rounded-sm ${getClasses(
        "text",
        theme
      )} ${getClasses(
        "bg",
        theme,
        "btn"
      )} hover:scale-105 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default CreateNew;
