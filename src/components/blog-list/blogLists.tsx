import { ReactElement } from "react";
import { getClasses } from "../../utils/classNameResolver";
import { useTheme } from "../provider/Provider";
import BlogList from "./blogList";

interface Props {
  auth?: boolean;
}

function BlogLists({}: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <div className="flex w-11/12 mt-6 flex-col items-start">
      <div
        className={`${getClasses("text", theme, "btn")} p-2 text-lg font-bold`}
      >
        Manage blogs:
      </div>
      <BlogList />
    </div>
  );
}

export default BlogLists;
