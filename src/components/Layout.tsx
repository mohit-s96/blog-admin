import React, { ReactElement, ReactNode } from "react";
import Nav from "./nav/nav";
import Sidebar from "./sidebar/sidebar";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props): ReactElement {
  return (
    <div>
      <Nav />
      <Sidebar />
      {children}
    </div>
  );
}

export default Layout;
