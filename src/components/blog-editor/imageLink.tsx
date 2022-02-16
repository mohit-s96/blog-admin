import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ThemeType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import Button from "../login/button";
import { Close } from "../svg/svg.collection";
import { EditorContext } from "./editorMain";

interface Props {
  theme: ThemeType;
  uri: string;
  alt: string;
  removeCb?: () => any;
  uploadImage?: () => Promise<string>;
  isHero: boolean;
  setHero: () => void;
}

function ImageLink({
  theme,
  uri,
  alt,
  removeCb = () => {},
  uploadImage = () => Promise.resolve(""),
  isHero,
  setHero,
}: Props): ReactElement {
  const [copied, setCopied] = useState(false);

  const [imageHtml, setImageHtml] = useState("");

  const { dispatch } = useContext(EditorContext);

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

  const copyHtml = async () => {
    if (imageHtml) {
      copyUri(imageHtml);
    } else {
      try {
        dispatch!({ type: "SET_LOADING", payload: true as any });
        const html = await uploadImage();
        dispatch!({ type: "SET_LOADING", payload: false as any });
        setImageHtml(html);
        copyUri(html);
      } catch (error) {
        dispatch!({
          type: "SET_ERROR",
          payload: "error uploading image" as any,
        });
      }
    }
  };

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
      <Button
        value={copied ? "copied" : "copy html"}
        onClick={copyHtml}
        className={`mt-0 mb-1 ${getClasses("bg", theme, "btn")} ${getClasses(
          "text",
          theme,
          ""
        )} w-[90%]`}
      />
      {!isHero ? (
        <Button
          value={"make hero"}
          onClick={setHero}
          className={`mt-0 mb-1 ${getClasses("bg", theme, "btn")} ${getClasses(
            "text",
            theme,
            ""
          )} w-[90%]`}
        />
      ) : null}
    </div>
  );
}

export default ImageLink;
