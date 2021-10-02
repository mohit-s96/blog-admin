import { astToHtml, parser } from "nomark-js";
import React, { ReactElement, useState } from "react";

function Test(): ReactElement {
  const [val, setVal] = useState("");
  return (
    <div className="flex-col flex justify-center items-center">
      <div>
        <textarea
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="bottom-2 border-black"
        />
      </div>
      <textarea name="wergs" value={astToHtml(parser(val))} cols={60} />
    </div>
  );
}

export default Test;
