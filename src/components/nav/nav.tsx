import React, { ReactElement } from "react";
import Navitem from "./navitem";
import { Blogs, Branding, Settings } from "../svg/svg.collection";
import { Link } from "react-router-dom";

interface Props {
  auth?: boolean;
}

function Nav({ auth }: Props): ReactElement {
  return (
    <nav className="p-2 bg-primary-dark flex justify-between items-center border-b-2 border-cyan">
      <Link to="/" className="cursor-pointer flex justify-center items-center">
        <Branding color="cyan" />
      </Link>
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
