import React, { ReactElement, useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router";
import { getClasses } from "../utils/classNameResolver";
import EditorMain from "./blog-editor/editorMain";
import Blog from "./blog/blog";
import Nav from "./nav/nav";
import Navitem from "./nav/navitem";
import { useTheme } from "./provider/Provider";
import Sidebar from "./sidebar/sidebar";
import { RightArrow } from "./svg/svg.collection";

interface Props {
  data: any;
}

function Layout({ data }: Props): ReactElement {
  let { path } = useRouteMatch();

  const { theme } = useTheme();

  const [show, setShow] = useState(true);

  if (path === "/edit" && !data) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Nav />
      <div className={`flex w-full ${getClasses("bg", theme)} relative`}>
        <Sidebar show={show} setShow={(val: boolean) => setShow(val)} />
        <Navitem
          className="absolute top-2 left-0 z-[5]"
          callback={() => setShow(true)}
          label="open sidebar"
        >
          <RightArrow color={getClasses("accent", theme, "icon")} />
        </Navitem>
        {path === "/" ? <Blog /> : <EditorMain state={data} />}
      </div>
    </div>
  );
}

export default Layout;
