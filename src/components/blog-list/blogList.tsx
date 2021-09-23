import React, { ReactElement } from "react";
import { BlogListType } from "../../types/blogTypes";

interface Props {
  auth?: boolean;
  data: [BlogListType];
}

function BlogList({ auth, data }: Props): ReactElement {
  return (
    <div className="flex w-11/12 bg-red-700 h-96 mt-6">{data[0].excerpt}</div>
  );
}

export default BlogList;
