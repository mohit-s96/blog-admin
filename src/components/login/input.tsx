import React, { ReactElement } from "react";
import { getClasses } from "../../utils/classNameResolver";
import { useTheme } from "../provider/Provider";

interface Props {
  name: string;
  type: string;
  value: string;
  id?: string;
  containerClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => any;
  onFocus?: () => any;
  onBlur?: () => any;
  isTextArea?: boolean;
}

function Input({
  name,
  type,
  value,
  id,
  containerClassName = "",
  className = "",
  labelClassName = "",
  isTextArea = false,
  onChange,
  onBlur,
  onFocus,
}: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <div className={`flex flex-col items-start mb-8 ${containerClassName}`}>
      <label
        htmlFor={id}
        className={`${getClasses(
          "text",
          theme,
          "btn"
        )} p-2 text-lg font-bold pl-0 ${labelClassName}`}
        style={{
          textAlign: "left",
        }}
      >
        {name}:{" "}
      </label>
      {isTextArea ? (
        <textarea
          className={`p-2 w-full rounded-sm fix-focus-${theme} ${className} ${getClasses(
            "bg",
            theme,
            "btn"
          )} focus-visible:bg-white transition-all placeholder-white ${
            theme === "neon"
              ? "text-black"
              : "text-white focus-visible:text-black"
          }`}
          placeholder={name}
          value={value}
          id={id}
          onChange={(e) => onChange(e)}
          onFocus={() => onFocus && onFocus()}
          onBlur={() => onBlur && onBlur()}
        />
      ) : (
        <input
          className={`p-2 w-full rounded-sm fix-focus-${theme} ${className} ${getClasses(
            "bg",
            theme,
            "btn"
          )} focus-visible:bg-white transition-all placeholder-white ${
            theme === "neon" ? "text-black" : "text-white"
          } focus-visible:text-black`}
          type={type}
          placeholder={name}
          value={value}
          id={id}
          onChange={(e) => onChange(e)}
          onFocus={() => onFocus && onFocus()}
          onBlur={() => onBlur && onBlur()}
        />
      )}
      <p className="pt-0 w-0 h-[4px]"></p>
    </div>
  );
}

export default Input;
