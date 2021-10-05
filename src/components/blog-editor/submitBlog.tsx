import { astToHtml, parser } from "nomark-js";
import ParseTree from "nomark-js/dist/core/parseTree";
import React, { ReactElement, useContext } from "react";
import { NewImageData } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { getUri } from "../../utils/resolvePort";
import { useTheme } from "../provider/Provider";
import { EditorContext } from "./editorMain";

function SubmitBlog(): ReactElement {
  const { theme } = useTheme();

  const { body, title, tags, excerpt, files, heroImg, readingTime } =
    useContext(EditorContext);

  type UploadResponse = {
    message: string;
    uri: string;
  };

  const uploadImages = async () => {
    let promises: Promise<Response>[] = [];
    files.forEach((file) => {
      const image = file.file;
      const formData = new FormData();
      formData.append("image", image, image.name);
      const promise = fetch(`${getUri()}/api/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      promises.push(promise);
    });

    const response = await Promise.all(promises);

    promises = [];

    response.forEach((res) => {
      const promise = res.json();
      promises.push(promise);
    });

    const data = (await Promise.all(promises)) as unknown as UploadResponse[];

    return data;
  };
  const changeAstNodes = (node: ParseTree, imgData: NewImageData[]) => {
    if (node.type === "img") {
      node.attributes = node.attributes!.map((x) => {
        if (x.key !== "src") {
          return x;
        } else {
          const data = imgData.find((img) => img.uri === x.value);
          x.value = data!.permUri;
          return x;
        }
      });
      return;
    } else if (node.children?.length) {
      node.children!.forEach((x) => {
        changeAstNodes(x, imgData);
      });
    } else return;
  };

  const startSubmitionProcess = async () => {
    if (files.length > 0) {
      const data = await uploadImages();
      const newImageData: NewImageData[] = heroImg.map((img, i) => {
        return {
          ...img,
          permUri: data[i].uri,
        };
      });
      const nomarkAst = parser(body);

      changeAstNodes(nomarkAst, newImageData);

      const images = newImageData.map((x) => ({
        uri: x.permUri,
        alt: x.alt,
        isHero: x.isHero,
      }));

      const html = astToHtml(nomarkAst);

      const finalObject = {
        title,
        tags,
        createdAt: Date.now(),
        images,
        blogData: html,
        slugType: "html",
        shares: 0,
        likes: 0,
        excerpt,
        author: "msx47",
        commentsAllowed: true,
        commentCount: 0,
        readingTime,
        //to-do add fields for comments allowed and add extract metadata from parsetree
      };
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
