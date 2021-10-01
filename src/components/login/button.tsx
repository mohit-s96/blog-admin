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
}

function Button({
  value,
  onClick,
  onBlur,
  onFocus,
  onHover,
  onLeave,
}: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <button
      className={`p-2 mt-8 ${getClasses(
        "bg",
        theme,
        "btn"
      )} font-bold ${getClasses("text", theme)} w-6/12 rounded-sm`}
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
