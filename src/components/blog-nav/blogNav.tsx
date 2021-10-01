import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { getClasses } from "../../utils/classNameResolver";
import { useTheme } from "../provider/Provider";
import { Author } from "../svg/svg.collection";
import CreateNew from "./createNew";

interface Props {
  auth?: boolean;
  count: number;
}

function BlogNav({ auth, count }: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <nav
      className={`flex w-9/12 p-2 justify-between border-b-2 ${getClasses(
        "border",
        theme,
        "btn"
      )}`}
    >
      <span
        className={`p-2 ${
          theme === "dark"
            ? "text-accent-dark"
            : theme === "light"
            ? "text-accent-light"
            : "text-accent-neon"
        } font-bold`}
      >
        {count >= 0 ? `Welcome! - ${count} blogs published` : "Welcome!"}
      </span>

      <CreateNew>
        <Author color={getClasses("", theme, "icon")} />
        <Link to="/create" className="font-bold">
          Create New
        </Link>
      </CreateNew>
    </nav>
  );
}

export default BlogNav;
