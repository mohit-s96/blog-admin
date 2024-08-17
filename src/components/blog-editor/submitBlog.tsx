import { ReactElement, useContext } from "react";
import marked from "marked";
import { astToHtml, parser } from "nomark-js";
import {
  NewImageData,
  SupaUploadResponseType,
  UploadResponse,
} from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import {
  uploadImages,
  publishBlog,
  publishChanges,
} from "../../utils/fetchResource";
import { changeAstNodes } from "../../utils/misc";
import { useTheme } from "../provider/Provider";
import { EditorContext } from "./editorMain";
import { useLocation, useNavigate } from "react-router-dom";
import { BlogSlug } from "../../types/blogTypes";
import { getUri } from "../../utils/resolvePort";

interface Props {
  state: BlogSlug | undefined;
}

function SubmitBlog({ state }: Props): ReactElement {
  const { theme } = useTheme();
  const location = useLocation();
  let path = location.pathname;

  const navigate = useNavigate();
  const {
    body,
    title,
    tags,
    excerpt,
    files,
    heroImg: blogImages,
    readingTime,
    slug,
    slugType,
    commentsAllowed,
    isArchived,
    dispatch,
    keywords,
  } = useContext(EditorContext);

  const validFormFields = (): boolean => {
    if (
      !body.length ||
      !title.length ||
      !tags.length ||
      !excerpt.length ||
      !blogImages.length ||
      !readingTime.length ||
      !slug
    ) {
      return false;
    }
    return true;
  };

  const startSubmitionProcess = async () => {
    try {
      if (!validFormFields()) {
        dispatch!({
          type: "SET_ERROR",
          payload: "one or more fields empty" as any,
        });
        return;
      }
      dispatch!({
        type: "SET_LOADING",
        payload: true as any,
      });

      let data: UploadResponse[] = [];

      let images;

      let newImageData: NewImageData[] = [];

      if (slugType === "nm") {
        data = await uploadImages(files);
        newImageData = blogImages.map((img, i) => {
          return {
            ...img,
            permUri: data[i].uri,
          };
        });

        images = newImageData.map((x) => ({
          permUri: x.permUri,
          alt: x.alt,
          isHero: x.isHero,
        }));
      } else {
        // if (path === "/create") {
        images = blogImages.map((img) => ({
          permUri: img.permUri as SupaUploadResponseType[],
          alt: img.alt,
          isHero: img.isHero,
        }));
        // }
        //  else {
        //   images = blogImages;
        // }
      }

      let html = "";

      let rawBody = "";

      if (slugType === "nm") {
        const nomarkAst = parser(body);

        changeAstNodes(nomarkAst, newImageData);

        html = astToHtml(nomarkAst);

        // rawBody = JSON.stringify(nomarkAst);
      } else if (slugType === "md") {
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
        html = marked.parse(body);
      } else {
        html = body;
      }
      rawBody = body;

      const finalObject = {
        rawBody,
        title,
        tags,
        uri: slug,
        createdAt: path === "/edit" ? state!.createdAt : Date.now(),
        images,
        blogData: html,
        slugType,
        shares: 0,
        likes: 0,
        excerpt,
        keywords,
        author: "msx47",
        commentsAllowed,
        commentCount: 0,
        readingTime,
        viewCount: 0,
        lastEdited: path === "/edit" ? Date.now() : null,
        isArchived,
      };

      if (isArchived && path === "/edit") {
        const res = await fetch(
          getUri("query") + "/api/comment/" + state!.uri,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw Error("error while running post archive cleanup");
        }
        const data = await res.json();
        if (data.message !== "success") {
          throw Error(
            "didn't receive success response for post archive cleanup. expected -> 'success' received -> " +
              JSON.stringify(data.message ?? "")
          );
        }
      }
      if (path === "/edit") {
        (finalObject as BlogSlug)._id = state!._id;
      }
      debugger;
      if (path === "/edit") await publishChanges(finalObject);
      else await publishBlog(finalObject);

      dispatch!({
        type: "SET_LOADING",
        payload: false as any,
      });
      dispatch!({
        type: "SET_ERROR",
        payload: "" as any,
      });
      localStorage.removeItem("/api/list");
      navigate("/");
    } catch (error) {
      console.log(error);

      dispatch!({
        type: "SET_LOADING",
        payload: false as any,
      });
      dispatch!({
        type: "SET_ERROR",
        payload: (error as any).message,
      });
    }
  };

  return (
    <button
      onClick={startSubmitionProcess}
      className={`p-2 m-2 rounded-md ${getClasses(
        "bg",
        theme,
        "btn"
      )} ${getClasses("text", theme, "")}`}
    >
      {path === "/create" ? "publish blog" : "publish changes"}
    </button>
  );
}

export default SubmitBlog;
