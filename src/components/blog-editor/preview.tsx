import React, { ReactElement, useContext, useEffect, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { testMatch } from "../../utils/constants";
import SimpleTags from "../tags/SimpleTags";
import AuthorBar from "./authorBar";
import BlogImage from "./blogImage";
import { EditorContext, WidthContext } from "./editorMain";
import { astToHtml, parser } from "nomark-js";

function Preview(): ReactElement {
  const { title, readingTime, heroImg, tags, body, excerpt } =
    useContext(EditorContext);

  const { wDispatch, previewWidth } = useContext(WidthContext);

  const divRef = useRef(null);

  const rect = useRect(divRef);

  useEffect(() => {
    wDispatch &&
      wDispatch({
        type: "P-RECT",
        payload: (
          divRef.current as unknown as HTMLDivElement
        ).getBoundingClientRect(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rect]);
  return (
    <div
      className={`w-[49%] bg-[antiquewhite] h-full overflow-hidden overflow-y-scroll style-scroll max-h-[89vh] width-transition`}
      ref={divRef}
      style={{
        width: `${previewWidth! > 0 ? previewWidth + "px" : ""}`,
      }}
    >
      <div className="w-full flex flex-col">
        <div className="flex justify-start p-2 m-4">
          <h1 className="font-bold text-6xl underline cursor-pointer">
            {title}
          </h1>
        </div>
        <div className="flex justify-start px-4">
          <p className="text-md my-2 text-gray-600 p-2">{excerpt}</p>
        </div>
        {heroImg.uri &&
        testMatch.test(heroImg.uri) &&
        heroImg.uri.endsWith(",") ? (
          <BlogImage src={heroImg.uri.slice(0, -1)} alt={heroImg.alt} />
        ) : null}

        <div className="p-2 m-1 flex">
          {tags.length
            ? tags.map((tag) => <SimpleTags tag={tag} key={tag} theme="dark" />)
            : null}
        </div>
        <AuthorBar time={readingTime} />
        <div
          className="p-2 m-1"
          dangerouslySetInnerHTML={{ __html: astToHtml(parser(body, "warn")) }}
        ></div>
      </div>
    </div>
  );
}

export default Preview;
