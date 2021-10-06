import marked from "marked";
import { astToHtml, parser } from "nomark-js";
import ParseTree from "nomark-js/dist/core/parseTree";
import React, { ReactElement, useContext } from "react";
import { BlogSlug } from "../../types/blogTypes";
import { NewImageData } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import { getUri } from "../../utils/resolvePort";
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
  } = useContext(EditorContext);

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

  const publishBlog = async (obj: BlogSlug) => {
    try {
      const response = await fetch(`${getUri()}/api/publish`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ data: obj }),
      });
      if (!response.ok) {
        throw new Error("publish failed");
      }
      console.log("blog published");
    } catch (error) {
      console.log((error as any).message);
    }
  };

  const startSubmitionProcess = async () => {
    const data = await uploadImages();
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
      //to-do add fields for comments allowed and add extract metadata from parsetree and slugtype
    };

    await publishBlog(finalObject);
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
