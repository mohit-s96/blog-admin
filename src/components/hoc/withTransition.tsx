import { ReactElement, ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  slide?: "left" | "right";
}

function WithTransition({ children, slide = "left" }: Props): ReactElement {
  const classRef = useRef(null);
  useEffect(() => {
    const node = classRef.current;
    setTimeout(() => {
      (classRef.current as unknown as HTMLDivElement).classList.add("slide-in");
    }, 0);
    return () => {
      (node as unknown as HTMLDivElement).classList.remove("slide-in");
    };
  }, []);
  return (
    <div className="w-full relative flex justify-center">
      <div
        className={`${
          slide === "left" ? "hidden-left" : "hidden-right"
        } transition-all duration-[300ms] w-full flex justify-center`}
        ref={classRef}
      >
        {children}
      </div>
    </div>
  );
}

export default WithTransition;
