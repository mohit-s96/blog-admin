import React, { ReactElement } from "react";
import BlogList from "./blogList";

interface Props {
  auth?: boolean;
}

function BlogLists({ auth }: Props): ReactElement {
  return (
    <div className="flex w-11/12 mt-6 flex-col items-start">
      <div className="text-cyan p-2 text-lg font-bold">Manage blogs:</div>
      <BlogList />
    </div>
  );
}

export default BlogLists;
