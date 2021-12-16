import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { getClasses } from "../../utils/classNameResolver";
import { getUri } from "../../utils/resolvePort";
import { useTheme } from "../provider/Provider";
import { Author, Settings } from "../svg/svg.collection";
import CreateNew from "./createNew";

interface Props {
  count: number[];
}

function BlogNav({ count }: Props): ReactElement {
  const { theme } = useTheme();

  const [deploying, setDeploying] = useState(false);

  async function redeployBlog() {
    setDeploying(true);

    try {
      await fetch(`${getUri()}/api/build`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    } catch (error) {
      console.log(error);
    }

    setDeploying(false);
  }

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
        {count.length > 1
          ? `Welcome! - ${count[1]} blogs published - [ ${count[0]} archived ]`
          : "Welcome!"}
      </span>

      <div className="flex">
        <CreateNew className="mx-2">
          <Settings color={getClasses("", theme, "icon")} />
          <button
            disabled={deploying}
            className="font-bold"
            onClick={redeployBlog}
          >
            redeploy{" "}
          </button>
        </CreateNew>
        <CreateNew className="mx-2">
          <Author color={getClasses("", theme, "icon")} />
          <Link to="/create" className="font-bold">
            Create New
          </Link>
        </CreateNew>
      </div>
    </nav>
  );
}

export default BlogNav;
