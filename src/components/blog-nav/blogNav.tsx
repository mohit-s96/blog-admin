import React, { ReactElement } from "react";
import { Author } from "../svg/svg.collection";
import CreateNew from "./createNew";

interface Props {
  auth?: boolean;
  count: number;
}

function BlogNav({ auth, count }: Props): ReactElement {
  return (
    <nav className="flex w-9/12 p-2 justify-between border-b-2 border-cyan">
      <span className="p-2 text-cyan font-bold">
        {count >= 0 ? `Welcome! - ${count} blogs published` : "Welcome!"}
      </span>

      <CreateNew>
        <Author color="rgba(11, 6, 64)" />
        <span className="font-bold">Create New</span>
      </CreateNew>
    </nav>
  );
}

export default BlogNav;
