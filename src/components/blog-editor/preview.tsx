import React, { ReactElement, useContext, useEffect, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { EditorContext, WidthContext } from "./editorMain";

function Preview(): ReactElement {
  const { title } = useContext(EditorContext);

  const { wDispatch } = useContext(WidthContext);

  const divRef = useRef(null);

  const rect = useRect(divRef);

  useEffect(() => {
    wDispatch &&
      wDispatch({
        type: "P-RECT",
        payload: (
          divRef.current as unknown as HTMLDivElement
        ).getBoundingClientRect(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);
  return (
    <div
      className="w-[49%] bg-primary-text-dark h-full border-2 border-cyan border-l-0  overflow-hidden overflow-y-scroll style-scroll max-h-[89vh]"
      ref={divRef}
    >
      {title}
    </div>
  );
}

export default Preview;
