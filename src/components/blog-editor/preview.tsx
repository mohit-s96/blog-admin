import React, { ReactElement, useContext } from "react";
import { EditorContext } from "./editorMain";

function Preview(): ReactElement {
  const { title } = useContext(EditorContext);

  return (
    <div className="w-6/12 bg-primary-text-dark h-full border-2 border-cyan">
      {title}
    </div>
  );
}

export default Preview;
