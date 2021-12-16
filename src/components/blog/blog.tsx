import React, { ReactElement } from "react";
import { useFetch } from "../../hooks/useFetch";
import { BlogListType } from "../../types/blogTypes";
import BlogLists from "../blog-list/blogLists";
import BlogNav from "../blog-nav/blogNav";
import WithTransition from "../hoc/withTransition";
import AuthLoader from "../loaders/authLoader";
import ErrorState from "../loaders/errorState";
import { useTheme } from "../provider/Provider";

export const BlogContext = React.createContext<[BlogListType] | null>(null);

async function fetcher(uri: string) {
  const json = await fetch(uri, {
    credentials: "include",
  });
  let data;
  if (json.ok) {
    data = await json.json();
  } else {
    throw new Error("internal server error");
  }

  return data as [BlogListType];
}

function Blog(): ReactElement {
  const { data, error, loading } = useFetch("/api/list", fetcher, true, 3600);

  const { theme } = useTheme();

  function getPublishedBlogCount(blogs: [BlogListType]) {
    let published = 0;
    let unPublished = 0;
    blogs.forEach((x) => {
      if (x.isArchived) unPublished++;
      else published++;
    });
    return [unPublished, published];
  }

  const render = loading ? (
    <AuthLoader theme={theme} className="h-full z-10" />
  ) : data ? (
    <BlogContext.Provider value={data}>
      <div className="flex flex-col w-10/12 items-center opacity-[inherit]">
        <BlogNav count={data ? getPublishedBlogCount(data) : [-1]} />
        <BlogLists />
      </div>
    </BlogContext.Provider>
  ) : error ? (
    <ErrorState theme={theme} className="h-full z-10" />
  ) : (
    <ErrorState theme={theme} className="h-full z-10" />
  );

  return <WithTransition children={render} />;
}

export default Blog;
