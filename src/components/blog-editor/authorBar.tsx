import React, { ReactElement } from "react";

interface Props {
  time: string;
}

function AuthorBar({ time }: Props): ReactElement {
  return (
    <div className="flex p-2 justify-between">
      <div className="mx-2 flex justify-center items-center">
        <img
          src="https://mohits.dev/_next/static/image/public/favicon/icon-512x512.e3f591a961f834e716b793ee5b9f37f5.png"
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
