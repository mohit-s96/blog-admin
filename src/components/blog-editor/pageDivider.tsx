import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DoubleArrow } from "../svg/svg.collection";
import { WidthContext } from "./editorMain";

function PageDivider(): ReactElement {
  const { editorRect, previewRect, wDispatch } = useContext(WidthContext);
  const [isPressed, setIsPressed] = useState(false);

  // w/o usecallback removeEventListener matches stale version of managewidth and soesn't remove the listener on mouseup (could be achieved by adding managewidth to the useeffect's dependency array but whatever)
  // added editor and previewrects in dependency array because managewidth was operating on stale values. also had to update the useeffect dependency with these 2 values
  const manageWidth = useCallback(
    (e: MouseEvent) => {
      console.log("even object => ", e);

      console.log({ editorRect, previewRect });
    },
    [editorRect, previewRect]
  );

  // setup global mouse move listener
  useEffect(() => {
    if (isPressed) {
      window.addEventListener("mousemove", manageWidth);
    } else {
      window.removeEventListener("mousemove", manageWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPressed, editorRect, previewRect]);

  //setup global mouseup listener because the one on the traget element doesn't fire if cursor is outside it's rect

  useEffect(() => {
    window.addEventListener("mouseup", () => {
      setIsPressed((prev) => {
        if (prev) {
          return !prev;
        }
        return prev;
      });
    });
  }, []);

  return (
    <div className="w-[0.3%] mx-2.5 max-h-[89vh] bg-[#318add] flex-col flex justify-center items-center">
      <span
        className="hover:scale-150  cursor-pointer transition-all"
        onMouseDown={() => setIsPressed(true)}
      >
        <DoubleArrow color="cyan" />
      </span>
    </div>
  );
}

export default PageDivider;
