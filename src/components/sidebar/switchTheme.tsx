import React, { ReactElement } from "react";
import { useTheme } from "../provider/Provider";

function SwitchTheme(): ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div
        className={`p-2 font-bold ${
          theme === "dark"
            ? "text-accent-dark"
            : theme === "light"
            ? "text-primary-light"
            : "text-accent-neon"
        }`}
      >
        Change theme
      </div>
      <div className="flex py-2 my-2 justify-between w-full">
        <span
          className="h-6 w-6 rounded-full bg-accent-neon my-2 cursor-pointer"
          title="neon theme"
          onClick={() => setTheme && setTheme("neon")}
        ></span>
        <span
          className="h-6 w-6 rounded-full bg-accent-dark my-2 cursor-pointer"
          title="dark theme"
          onClick={() => setTheme && setTheme("dark")}
        ></span>
        <span
          className="h-6 w-6 rounded-full bg-text-neon my-2 cursor-pointer"
          title="light theme"
          onClick={() => setTheme && setTheme("light")}
        ></span>
      </div>
    </>
  );
}

export default SwitchTheme;
