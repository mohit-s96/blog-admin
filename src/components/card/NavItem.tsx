import React, { ReactElement, ReactNode } from "react";
import { SizeVariantType, ThemeType } from "../../types/globalTypes";
import { SvgProps } from "../svg/collection.svg";

export interface Props {
  children: ReactNode;
  size: "xsm" | SizeVariantType;
  theme: ThemeType;
  Icon?: ({ color, size }: SvgProps) => JSX.Element;
  callback?: () => any;
}

function NavItem({
  children,
  size,
  theme,
  Icon,
  callback = () => {},
}: Props): ReactElement {
  return (
    <div
      tabIndex={1}
      className={`focus:outline-black p-2 flex justify-center items-center font-bold ${
        size === "sm" ? "text-sm" : size === "xsm" ? "text-xsm" : "text-base"
      } ${
        theme === "light"
          ? "text-secondary-text-light"
          : "text-primary-text-dark"
      } cursor-pointer`}
      onClick={() => callback()}
    >
      {Icon && <Icon color={theme} size={size} />}
      <span className="ml-2">{children}</span>
    </div>
  );
}

export default NavItem;
