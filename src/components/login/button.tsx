import React, { ReactElement } from "react";

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
  return (
    <button
      className="p-2 mt-8 bg-cyan font-bold text-primary-dark w-6/12 rounded-sm"
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
