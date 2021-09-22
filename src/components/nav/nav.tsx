import React, { ReactElement } from "react";
import Navitem from "./navitem";
import { Blogs, Branding, Settings } from "../svg/svg.collection";

interface Props {
  auth?: boolean;
}

function Nav({ auth }: Props): ReactElement {
  return (
    <nav className="p-2 bg-primary-dark flex justify-between items-center">
      <div className="cursor-pointer flex justify-center items-center">
        <Branding color="cyan" />
      </div>
      <div className="flex justify-center items-center">
        <Navitem>
          <Blogs color="cyan" /> Blogs
        </Navitem>
        <Navitem>
          <Settings color="cyan" /> Manage
        </Navitem>
      </div>
    </nav>
  );
}

export default Nav;
