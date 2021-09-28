import React, { ReactElement } from "react";
import { Author, Bars, Blogs } from "../svg/svg.collection";
import Sideitem from "./sideitem";

interface Props {
  auth?: boolean;
}

function Sidebar({ auth }: Props): ReactElement {
  return (
    <div className="sidebar bg-primary-dark flex flex-col items-center border-r-2 border-cyan z-10">
      <Sideitem>
        <Blogs color="cyan" />
        Blogs
      </Sideitem>
      <Sideitem>
        <Bars color="cyan" />
        Analytics
      </Sideitem>
      <Sideitem>
        <Author color="cyan" />
        Authors
      </Sideitem>
    </div>
  );
}

export default Sidebar;
