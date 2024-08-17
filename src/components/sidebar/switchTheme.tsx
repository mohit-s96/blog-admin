import { ReactElement } from "react";
import { useTheme } from "../provider/Provider";

function SwitchTheme({ isNav }: { isNav?: boolean }): ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {!isNav ? (
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
      ) : null}
      <div
        className={`flex justify-between ${!isNav ? "w-full py-2 my-2" : ""}`}
      >
        <span
          className={`h-6 w-6 rounded-full bg-accent-neon my-2 cursor-pointer ${
            isNav ? "mx-2" : ""
          }`}
          title="neon theme"
          onClick={() => setTheme && setTheme("neon")}
        ></span>
        <span
          className={`h-6 w-6 rounded-full bg-accent-dark my-2 cursor-pointer ${
            isNav ? "mx-2" : ""
          }`}
          title="dark theme"
          onClick={() => setTheme && setTheme("dark")}
        ></span>
        <span
          className={`h-6 w-6 rounded-full bg-yellow-200 my-2 cursor-pointer ${
            isNav ? "mx-2" : ""
          }`}
          title="light theme"
          onClick={() => setTheme && setTheme("light")}
        ></span>
      </div>
    </>
  );
}

export default SwitchTheme;
