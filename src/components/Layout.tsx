import React, { ReactElement, useState } from "react";
import { useRouteMatch } from "react-router";
import EditorMain from "./blog-editor/editorMain";
import Blog from "./blog/blog";
import Nav from "./nav/nav";
import Navitem from "./nav/navitem";
import Sidebar from "./sidebar/sidebar";
import { RightArrow } from "./svg/svg.collection";

function Layout(): ReactElement {
  let { path } = useRouteMatch();
  const [show, setShow] = useState(false);
  return (
    <div>
      <Nav />
      <div className="flex w-full bg-primary-dark relative">
        <Sidebar show={show} setShow={(val: boolean) => setShow(val)} />
        <Navitem
          className="absolute top-2 left-0 z-[5]"
          callback={() => setShow(true)}
        >
          <RightArrow color="cyan" />
        </Navitem>
        {path === "/" ? <Blog /> : <EditorMain />}
      </div>
    </div>
  );
}

export default Layout;
