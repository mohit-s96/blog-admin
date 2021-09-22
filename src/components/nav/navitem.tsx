import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Navitem({ children }: Props): ReactElement {
  return (
    <button className="p-1 bg-transparent flex justify-between items-center rounded-sm ml-8 text-cyan hover:scale-110 transition-all duration-300">
      {children}
    </button>
  );
}

export default Navitem;
