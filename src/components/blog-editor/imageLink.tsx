import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ThemeType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import Button from "../login/button";
import { Close } from "../svg/svg.collection";

interface Props {
  theme: ThemeType;
  uri: string;
  alt: string;
  removeCb?: () => any;
}

function ImageLink({
  theme,
  uri,
  alt,
  removeCb = () => {},
}: Props): ReactElement {
  const [copied, setCopied] = useState(false);

  const imgRef = useRef(null);

  const copyUri = (uri: string) => {
    navigator.clipboard.writeText(uri);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  useEffect(() => {
    setTimeout(() => {
      (imgRef.current as unknown as HTMLImageElement).classList.add("img-anim");
    }, 100);
  }, [theme]);

  return (
    <div
      className={`m-1 w-2/12 border-2 rounded-md overflow-hidden ${getClasses(
        "border",
        theme,
        "btn"
      )} ${getClasses(
        "text",
        theme,
        ""
      )} flex-col justify-center items-center hidden scale-0 opacity-0 transition-all duration-300`}
      ref={imgRef}
    >
      <div className="p-2 w-full relative">
        <img src={uri} alt={alt} height={120} title={alt} />
        <span
          className="absolute top-0 right-0 cursor-pointer"
          onClick={removeCb}
        >
          <Close
            color={getClasses("accent", theme, "icon")}
            className="scale-75"
          />
        </span>
      </div>
      <Button
        value={copied ? "copied" : "copy"}
        onClick={() => copyUri(uri)}
        className={`mt-0 mb-1 ${getClasses("bg", theme, "btn")} ${getClasses(
          "text",
          theme,
          ""
        )} w-[90%]`}
      />
    </div>
  );
}

export default ImageLink;
