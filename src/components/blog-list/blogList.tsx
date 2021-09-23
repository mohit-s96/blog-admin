import React, { ReactElement, useContext } from "react";
import { BlogContext } from "../blog/blog";
import BlogCard from "./blogCard";

interface Props {
  auth?: boolean;
}

function BlogList({ auth }: Props): ReactElement {
  const data = useContext(BlogContext);
  return (
    <div className="flex-col flex">
      {data!.map((blog) => (
        <BlogCard data={blog} key={blog._id as unknown as string} />
      ))}
    </div>
  );
}

export default BlogList;
