import React, { ReactElement } from "react";
import { getClasses } from "../../utils/classNameResolver";
import { useTheme } from "../provider/Provider";

interface Props {
  onClick: () => any;
  onFocus?: () => any;
  onHover?: () => any;
  onLeave?: () => any;
  onBlur?: () => any;
  value: string;
  className?: string;
}

function Button({
  value,
  className = "",
  onClick,
  onBlur,
  onFocus,
  onHover,
  onLeave,
}: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <button
      className={`p-2 ${getClasses("bg", theme, "btn")} font-bold ${getClasses(
        "text",
        theme
      )} rounded-sm ${className}`}
      onClick={onClick}
      onBlur={() => onBlur && onBlur()}
      onFocus={() => onFocus && onFocus()}
      onMouseEnter={() => onHover && onHover()}
      onMouseLeave={() => onLeave && onLeave()}
    >
      {value}
    </button>
  );
}

export default Button;
