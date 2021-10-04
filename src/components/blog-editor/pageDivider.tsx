import React, {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getClasses } from "../../utils/classNameResolver";
import { useTheme } from "../provider/Provider";
import { WidthContext } from "./editorMain";

function PageDivider(): ReactElement {
  const { editorRect, previewRect, wDispatch, parentRect } =
    useContext(WidthContext);
  const [isPressed, setIsPressed] = useState(false);

  const { theme } = useTheme();

  // w/o usecallback removeEventListener matches stale version of managewidth and doesn't remove the listener on mouseup (could be achieved by adding managewidth to the useeffect's dependency array but whatever)
  // added editor and previewrects in dependency array because managewidth was operating on stale values. also had to update the useeffect dependency with these 2 values

  const manageWidth = useCallback(
    (e: MouseEvent) => {
      const { pageX } = e;
      e.preventDefault();

      const editor = editorRect as DOMRect;

      const preview = previewRect as DOMRect;

      let editorW = editor.width + editor.x;

      let previewW = preview.x;

      if (pageX > editorW) {
        editorW = editor.width + (pageX - editorW);
        previewW = (parentRect as DOMRect).width - editorW;
      } else {
        previewW = preview.width + (editorW - pageX);
        editorW = (parentRect as DOMRect).width - previewW;
      }
      // 200 is minimum width we want for any of the screen, should be change later for smaller devices
      if (previewW > 200 && editorW > 200) {
        //@ts-ignore
        wDispatch &&
          wDispatch({
            type: "E-WIDTH",
            payload: editorW,
          });

        wDispatch &&
          wDispatch({
            type: "P-WIDTH",
            payload: previewW,
          });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editorRect, previewRect]
  );

  // setup global mouse move listener
  useEffect(() => {
    if (isPressed) {
      window.addEventListener("mousemove", manageWidth);
    } else {
      window.removeEventListener("mousemove", manageWidth);
    }
    return () => window.removeEventListener("mousemove", manageWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPressed, manageWidth]);

  //setup global mouseup listener because the one on the target element doesn't fire if cursor is outside it's rect
  const mouseup = useCallback(() => {
    setIsPressed((prev) => {
      if (prev) {
        return !prev;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", mouseup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`w-[0.3%] mx-2.5 max-h-[89vh] ${getClasses(
        "bg",
        theme,
        "btn"
      )} flex-col flex justify-center items-center cursor-[col-resize]`}
      onMouseDown={() => setIsPressed(true)}
    ></div>
  );
}

export default PageDivider;
