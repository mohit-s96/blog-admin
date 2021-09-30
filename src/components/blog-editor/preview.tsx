import React, { ReactElement, useContext, useEffect, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { testMatch } from "../../utils/constants";
import SimpleTags from "../tags/SimpleTags";
import AuthorBar from "./authorBar";
import BlogImage from "./blogImage";
import { EditorContext, WidthContext } from "./editorMain";
import { astToHtml, parser } from "nomark-js";

function Preview(): ReactElement {
  const { title, readingTime, heroImg, tags, body } = useContext(EditorContext);

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
      className="w-[49%] bg-[#f1f1f1] h-full border-2 border-cyan border-l-0  overflow-hidden overflow-y-scroll style-scroll max-h-[89vh]"
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
        <AuthorBar time={readingTime} />
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
        <div
          className="p-2 m-1"
          dangerouslySetInnerHTML={{ __html: astToHtml(parser(body)) }}
        ></div>
      </div>
    </div>
  );
}

export default Preview;
