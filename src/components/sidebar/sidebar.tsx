import React, { ReactElement, useEffect, useRef, useState } from "react";
import Navitem from "../nav/navitem";
import { Author, Bars, Blogs, LeftArrow } from "../svg/svg.collection";
import Sideitem from "./sideitem";

interface Props {
  show: boolean;
  setShow: (val: boolean) => any;
}

function Sidebar({ show, setShow }: Props): ReactElement {
  const [hidden, setHidden] = useState(false);
  const hideRef = useRef(null);
  useEffect(() => {
    console.log(
      (hideRef.current as unknown as HTMLDivElement).classList,
      hidden
    );
    if (hidden) {
      (hideRef.current as unknown as HTMLDivElement).classList.add(
        "w-0",
        "border-r-0"
      );

      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  useEffect(() => {
    if (show) {
      (hideRef.current as unknown as HTMLDivElement).classList.remove(
        "w-0",
        "border-r-0"
      );

      setHidden(false);
    }
  }, [show]);

  return (
    <div
      className="sidebar bg-primary-dark flex flex-col items-center border-r-2 border-cyan z-10 relative transition-all duration-200 overflow-hidden"
      ref={hideRef}
    >
      <Navitem
        className="font-bold absolute top-0 right-1"
        callback={() => setHidden(true)}
      >
        <LeftArrow color="cyan" />
      </Navitem>

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
