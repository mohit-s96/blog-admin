import React, { ReactElement, useContext } from "react";
import marked from "marked";
import { astToHtml, parser } from "nomark-js";
import {
  NewImageData,
  SupaUploadResponseType,
  UploadResponse,
} from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { uploadImages, publishBlog } from "../../utils/fetchResource";
import { changeAstNodes } from "../../utils/misc";
import { useTheme } from "../provider/Provider";
import { EditorContext } from "./editorMain";
import { useHistory } from "react-router";

function SubmitBlog(): ReactElement {
  const { theme } = useTheme();
  const history = useHistory();
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
    dispatch,
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
        images = blogImages.map((img) => ({
          permUri: img.permUri as SupaUploadResponseType[],
          alt: img.alt,
          isHero: img.isHero,
        }));
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
            console.log(quote);

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
        createdAt: Date.now(),
        images,
        blogData: html,
        slugType,
        shares: 0,
        likes: 0,
        excerpt,
        author: "msx47",
        commentsAllowed,
        commentCount: 0,
        readingTime,
        viewCount: 0,
      };

      await publishBlog(finalObject);
      dispatch!({
        type: "SET_LOADING",
        payload: false as any,
      });
      dispatch!({
        type: "SET_ERROR",
        payload: "" as any,
      });
      localStorage.removeItem("/api/list");
      history.push("/");
    } catch (error) {
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
      submit blog
    </button>
  );
}

export default SubmitBlog;
