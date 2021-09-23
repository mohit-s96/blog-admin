import React, { ReactElement } from "react";
import BlogNav from "../blog-nav/blogNav";

interface Props {
  auth?: boolean;
}

function Blog({ auth }: Props): ReactElement {
  return (
    <div className="flex flex-col w-10/12 items-center">
      <BlogNav />
    </div>
  );
}

export default Blog;
