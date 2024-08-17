import { ReactElement, useContext, useEffect, useRef } from "react";
import DomPurify from "dompurify";
import { useRect } from "../../hooks/useRect";
import { testMatch } from "../../utils/constants";
import SimpleTags from "../tags/SimpleTags";
import AuthorBar from "./authorBar";
import BlogImage from "./blogImage";
import marked from "marked";
import { EditorContext, WidthContext } from "./editorMain";
import { astToHtml, parser } from "nomark-js";
import Prism from "prismjs";
import "../../styles/prism.css";

function Preview(): ReactElement {
  const { title, readingTime, heroImg, tags, body, excerpt, slugType } =
    useContext(EditorContext);

  const { wDispatch, previewWidth } = useContext(WidthContext);

  const divRef = useRef(null);

  const rect = useRect(divRef);

  // useEffect(() => {
  //   const element = divRef.current as unknown as HTMLDivElement;
  //   element.scrollTop = element.scrollHeight - element.clientHeight;
  // }, [body]);

  function sanitizeHTML(html: string) {
    return DomPurify.sanitize(html);
  }

  function resolveBodyType() {
    if (slugType === "nm") {
      return astToHtml(parser(body || "", "warn"));
    } else if (slugType === "html") {
      return body;
    } else {
      return sanitizeHTML(marked.parse(body));
    }
  }

  useEffect(() => {
    //@ts-ignore
    import("prismjs/plugins/line-numbers/prism-line-numbers");
    //@ts-ignore
    import("prismjs/plugins/toolbar/prism-toolbar").then(() => {
      let promises: Promise<any>[] = [];
      promises.push(
        //@ts-ignore
        import("prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard")
      );
      Promise.all(promises).then(() => {
        //do smthg
      });
    });
    const renderer = {
      blockquote(quote: string) {
        if (quote.startsWith("<p>@warn")) {
          quote = quote.replace("@warn", "");
          return `<blockquote class="bq-warn">${quote}</blockquote>`;
        } else if (quote.startsWith("<p>@err")) {
          quote = quote.replace("@err", "");
          return `<blockquote class="bq-err">${quote}</blockquote>`;
        } else {
          return `<blockquote>${quote}</blockquote>`;
        }
      },
    };
    marked.use({ renderer });
  }, []);

  useEffect(() => {
    // Prism.manual = true;
    let links = document.links;

    for (let i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[i].hostname !== window.location.hostname) {
        links[i].target = "_blank";
      }
    }
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
          <p className="text-md my-2 text-gray-600 italic text-xl font-bold p-1">
            {excerpt}
          </p>
        </div>
        <section
          className="p-2 m-1 md-render-parent line-numbers"
          dangerouslySetInnerHTML={{ __html: resolveBodyType() }}
        ></section>
      </div>
    </div>
  );
}

export default Preview;
