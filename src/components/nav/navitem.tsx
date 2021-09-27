import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  callback?: () => any;
}

function Navitem({ children, callback }: Props): ReactElement {
  return (
    <button
      onClick={() => callback && callback()}
      className="p-1 bg-transparent flex justify-between items-center rounded-sm ml-8 text-cyan hover:scale-110 transition-all duration-300 font-bold"
    >
      {children}
    </button>
  );
}

export default Navitem;
