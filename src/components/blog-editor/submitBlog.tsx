import React, { ReactElement, useContext } from "react";
import marked from "marked";
import { astToHtml, parser } from "nomark-js";
import { NewImageData } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { uploadImages, publishBlog } from "../../utils/fetchResource";
import { changeAstNodes } from "../../utils/misc";
import { useTheme } from "../provider/Provider";
import { EditorContext } from "./editorMain";

function SubmitBlog(): ReactElement {
  const { theme } = useTheme();

  const {
    body,
    title,
    tags,
    excerpt,
    files,
    heroImg,
    readingTime,
    slug,
    slugType,
    commentsAllowed,
    dispatch,
  } = useContext(EditorContext);

  const startSubmitionProcess = async () => {
    try {
      dispatch!({
        type: "SET_LOADING",
        payload: true as any,
      });
      const data = await uploadImages(files);
      const newImageData: NewImageData[] = heroImg.map((img, i) => {
        return {
          ...img,
          permUri: data[i].uri,
        };
      });

      const images = newImageData.map((x) => ({
        uri: x.permUri,
        alt: x.alt,
        isHero: x.isHero,
      }));

      let html = "";

      if (slugType === "nm") {
        const nomarkAst = parser(body);

        changeAstNodes(nomarkAst, newImageData);

        html = astToHtml(nomarkAst);
      } else if (slugType === "md") {
        html = marked(body);
      } else {
        html = body;
      }

      const finalObject = {
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
