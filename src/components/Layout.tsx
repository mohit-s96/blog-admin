import React, { ReactElement } from "react";
import { useRouteMatch } from "react-router";
import EditorMain from "./blog-editor/editorMain";
import Blog from "./blog/blog";
import Nav from "./nav/nav";
import Sidebar from "./sidebar/sidebar";

function Layout(): ReactElement {
  let { path } = useRouteMatch();

  return (
    <div>
      <Nav />
      <div className="flex w-full bg-primary-dark">
        <Sidebar />
        {path === "/" ? <Blog /> : <EditorMain />}
      </div>
    </div>
  );
}

export default Layout;
