import React, { ReactElement, useContext, useEffect, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { testMatch } from "../../utils/constants";
import SimpleTags from "../tags/SimpleTags";
import AuthorBar from "./authorBar";
import BlogImage from "./blogImage";
import marked from "marked";
import { EditorContext, WidthContext } from "./editorMain";
import { astToHtml, parser } from "nomark-js";
import Prism from "prismjs";
import "prismjs/components/prism-bash";
// import "prismjs/components/prism-cpp";
import "prismjs/themes/prism-tomorrow.css";

function Preview(): ReactElement {
  const { title, readingTime, heroImg, tags, body, excerpt, slugType } =
    useContext(EditorContext);

  const { wDispatch, previewWidth } = useContext(WidthContext);

  const divRef = useRef(null);

  const rect = useRect(divRef);

  useEffect(() => {
    const element = divRef.current as unknown as HTMLDivElement;
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }, [body]);

  function resolveBodyType() {
    if (slugType === "nm") {
      return astToHtml(parser(body, "warn"));
    } else if (slugType === "html") {
      return body;
    } else {
      return marked(body);
    }
  }

  useEffect(() => {
    // Prism.manual = true;
      Prism.highlightAll();
  }, [body]);

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
        {heroImg[0]?.uri &&
        testMatch.test(heroImg[0].uri) &&
        heroImg[0].uri.endsWith(",") ? (
          <BlogImage src={heroImg[0].uri.slice(0, -1)} alt={heroImg[0].alt} />
        ) : null}

        <div className="p-2 m-1 flex">
          {tags.length
            ? tags.map((tag) => <SimpleTags tag={tag} key={tag} theme="dark" />)
            : null}
        </div>
        <AuthorBar time={readingTime} />
        <div className="flex justify-start px-2">
          <p className="text-md my-2 text-gray-600 italic text-xl font-bold p-1">{excerpt}</p>
        </div>
        <div
          className="p-2 m-1"
          dangerouslySetInnerHTML={{ __html: resolveBodyType() }}
        ></div>
      </div>
    </div>
  );
}

export default Preview;
