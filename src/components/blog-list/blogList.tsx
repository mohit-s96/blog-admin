import { ReactElement, useContext } from "react";
import { BlogContext } from "../blog/blog";
import PostPreview from "../card/PostPreview";

interface Props {
  auth?: boolean;
}

function BlogList({}: Props): ReactElement {
  const data = useContext(BlogContext);
  return (
    <div className="flex-col flex">
      {data!
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((blog) => (
          <PostPreview key={blog._id as unknown as string} data={blog} />
        ))}
    </div>
  );
}

export default BlogList;
