import React, { ReactElement } from "react";

interface Props {
  time: string;
}

function AuthorBar({ time }: Props): ReactElement {
  return (
    <div className="flex p-2 justify-between items-center">
      <div className="mx-2 flex justify-center items-center">
        <img
          src="https://mohits.dev/favicon/favicon.png"
          alt="author avatar"
          className="w-10"
        />
        <div className="mx-2">msx47</div>
      </div>
      <div className="text-gray-600 font-bold">{time} read</div>
    </div>
  );
}

export default AuthorBar;
