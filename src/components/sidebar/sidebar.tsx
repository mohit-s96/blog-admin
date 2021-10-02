import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getClasses } from "../../utils/classNameResolver";
import Navitem from "../nav/navitem";
import { useTheme } from "../provider/Provider";
import { Author, Bars, Blogs, LeftArrow } from "../svg/svg.collection";
import Sideitem from "./sideitem";
import SwitchTheme from "./switchTheme";

interface Props {
  show: boolean;
  setShow: (val: boolean) => any;
}

function Sidebar({ show, setShow }: Props): ReactElement {
  const [hidden, setHidden] = useState(false);
  const hideRef = useRef(null);

  const { theme } = useTheme();

  useEffect(() => {
    if (hidden) {
      (hideRef.current as unknown as HTMLDivElement).classList.add(
        "w-null",
        "border-r-0"
      );

      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden]);

  useEffect(() => {
    if (show) {
      (hideRef.current as unknown as HTMLDivElement).classList.remove(
        "w-null",
        "border-r-0"
      );

      setHidden(false);
    }
  }, [show]);

  return (
    <div
      className={`w-1/6 sidebar ${
        theme === "dark"
          ? "bg-primary-dark"
          : theme === "light"
          ? "bg-accent-light"
          : "bg-primary-neon"
      } flex flex-col items-center justify-between border-r-2 ${
        theme === "dark"
          ? "border-accent-dark"
          : theme === "light"
          ? "border-accent-light"
          : "border-accent-neon"
      } z-10 relative transition-all duration-200 overflow-hidden`}
      ref={hideRef}
    >
      <div
        className={`w-[inherit] h-full ${show ? "fixed" : ""}`}
        style={{
          backgroundColor: "inherit",
          border: "inherit",
        }}
      >
        <Navitem
          className="font-bold absolute top-0 right-1"
          callback={() => setHidden(true)}
        >
          <LeftArrow color={getClasses("sb", theme, "icon")} />
        </Navitem>

        <div className="w-full flex flex-col items-end">
          <Sideitem>
            <Blogs color={getClasses("sb", theme, "icon")} />
            <Link to="/" children="blogs" />
          </Sideitem>
          <Sideitem>
            <Bars color={getClasses("sb", theme, "icon")} />
            analytics
          </Sideitem>
          <Sideitem>
            <Author color={getClasses("sb", theme, "icon")} />
            authors
          </Sideitem>
        </div>
      </div>
      <div
        className={`text-primary-light font-extrabold text-xl flex-col flex items-start ${
          show ? "fixed" : ""
        } top-[88vh]`}
      >
        <SwitchTheme />
      </div>
    </div>
  );
}

export default Sidebar;
