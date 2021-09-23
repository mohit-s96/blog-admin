import React, { ReactElement } from "react";
import { useFetch } from "../../hooks/useFetch";
import { BlogListType } from "../../types/blogTypes";
import BlogList from "../blog-list/blogList";
import BlogNav from "../blog-nav/blogNav";

interface Props {
  auth?: boolean;
}

async function fetcher(uri: string) {
  const json = await fetch(uri);
  const data = await json.json();

  return data as [BlogListType];
}

function Blog({ auth }: Props): ReactElement {
  const { data, error, loading } = useFetch("/api/list", fetcher);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>Something went wrong</div>;
  }
  return (
    <div className="flex flex-col w-10/12 items-center">
      <BlogNav />
      <BlogList data={data as [BlogListType]} />
    </div>
  );
}

export default Blog;
