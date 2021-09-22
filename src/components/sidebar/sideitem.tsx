import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Sideitem({ children }: Props): ReactElement {
  return (
    <button className="p-2 rounded-sm flex justify-between items-center mt-12 w-11/12 text-cyan shadow-md hover:scale-110 transition-all duration-300 border-b border-cyan border-l-4">
      {children}
    </button>
  );
}

export default Sideitem;
