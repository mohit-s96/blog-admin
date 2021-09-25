import React, { ReactElement } from "react";
import { Loader } from "../svg/svg.collection";

function AuthLoader(): ReactElement {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-primary-dark">
      <div className="w-1/12">
        <Loader color="cyan" />
      </div>
    </div>
  );
}

export default AuthLoader;
