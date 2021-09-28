import React, { ReactElement } from "react";
import WithTransition from "../hoc/withTransition";

function EditorMain(): ReactElement {
  return (
    <WithTransition slide="right">
      <div className="w-11/12 bg-red-600 h-64 flex-col flex items-center justify-center opacity-[inherit]">
        ola
      </div>
    </WithTransition>
  );
}

export default EditorMain;
