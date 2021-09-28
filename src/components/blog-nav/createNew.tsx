import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

function CreateNew({ children, className = "" }: Props): ReactElement {
  return (
    <button
      className={`flex justify-between items-center p-2 rounded-sm text-primary-dark bg-cyan hover:scale-105 transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default CreateNew;
