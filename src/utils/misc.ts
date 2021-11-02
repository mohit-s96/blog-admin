import ParseTree from "nomark-js/dist/core/parseTree";
import { astToHtml, generateParseTree } from "nomark-js";
import { NewImageData, UploadResponse } from "../types/globalTypes";

export const changeAstNodes = (node: ParseTree, imgData: NewImageData[]) => {
  if (node.type === "img") {
    node.type = "picture";
    let data: NewImageData | undefined;
    node.attributes = node.attributes!.map((x) => {
      if (x.key !== "src") {
        return x;
      } else {
        data = imgData.find((img) => img.uri === x.value);
        x.value = data!.permUri[1].data!.Key;
        return x;
      }
    });

    const temp = node.attributes;

    const s1 = generateParseTree({
      attributes: [
        { key: "media", value: "(max-width: 799px)" },
        { key: "srcset", value: data!.permUri[1].data!.Key },
      ],
      type: "source",
    });
    const s2 = generateParseTree({
      attributes: [
        { key: "media", value: "(min-width: 800px)" },
        { key: "srcset", value: data!.permUri[2].data!.Key },
      ],
      type: "source",
    });
    const s3 = generateParseTree({ attributes: [...temp], type: "img" });
    node.children = [s1, s2, s3];

    node.attributes = [];

    return;
  } else if (node.children?.length) {
    node.children!.forEach((x) => {
      changeAstNodes(x, imgData);
    });
  } else return;
};

export const generateResponsiveImageHtml = (images: UploadResponse): string => {
  const s1 = generateParseTree({
    attributes: [
      { key: "media", value: "(max-width: 799px)" },
      { key: "srcset", value: images.uri[1].data!.Key },
    ],
    type: "source",
  });
  const s2 = generateParseTree({
    attributes: [
      { key: "media", value: "(min-width: 800px)" },
      { key: "srcset", value: images.uri[2].data!.Key },
    ],
    type: "source",
  });
  const s3 = generateParseTree({
    attributes: [
      { key: "src", value: images.uri[1].data!.Key },
      { key: "width", value: "400" },
      { key: "height", value: "225" },
    ],
    type: "img",
    classes: ["w-full"],
  });

  const node = generateParseTree({
    children: [s1, s2, s3],
    type: "picture",
  });

  const html = astToHtml(node);

  return html;
};
