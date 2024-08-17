import { ReactElement, ReactNode } from "react";
import { SizeVariantType, ThemeType } from "../../types/globalTypes";
import { Solid } from "../svg/collection.svg";

export interface TagProps {
  children: ReactNode;
  variant?: SizeVariantType;
  theme?: ThemeType;
  triangular?: boolean;
  accent?: boolean;
  classes?: string;
  callback?: () => void;
}

function Tags({
  children,
  variant,
  theme,
  triangular,
  accent,
  classes,
  callback,
}: TagProps): ReactElement {
  return (
    <button
      onClick={() => callback && callback()}
      className={`${classes ? classes : ""} ${
        triangular
          ? `relative before:absolute before:h-0 before:w-0 ${
              variant === "sm" ? "before:left-sm" : "before:left-md"
            } before:top-0 ${
              variant === "sm" ? "before:border-t-sm-2" : "before:border-t-md-2"
            } ${
              variant === "sm" ? "before:border-r-sm" : "before:border-r-md"
            } ${
              variant === "sm" ? "before:border-b-sm-2" : "before:border-b-md-2"
            } before:border-l-0 before:border-t-transparent before:border-b-transparent ${
              !accent
                ? theme === "light"
                  ? "before:border-r-primary-light"
                  : "before:border-r-primary-dark"
                : "before:border-r-primary-accent-light flex items-center justify-center"
            }`
          : ""
      } ${
        !accent
          ? theme === "dark"
            ? "bg-primary-dark text-primary-text-dark"
            : "bg-primary-light text-primary-text-light"
          : "bg-primary-accent-light flex items-center justify-center text-primary-text-dark"
      } ${variant === "md" ? "min-w-btn-md" : "min-w-btn-sm"} ${
        variant === "md" ? "h-btn-md" : "h-btn-sm"
      } border-none ${
        !triangular
          ? variant === "md"
            ? "rounded-brc-md p-2 px-8"
            : "rounded-brc-sm px-8"
          : "pr-4"
      } text-sm`}
    >
      {triangular ? <span className="absolute left-neg p-one">•</span> : null}{" "}
      {children}
    </button>
  );
}
export function Sort() {
  return (
    <Tags theme="dark" variant="sm" accent={true}>
      Sort <Solid color="dark" />
    </Tags>
  );
}
export default Tags;
