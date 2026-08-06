// import ParseTree from "nomark-js/dist/core/parseTree";
import { UploadResponse } from "../types/globalTypes";

// export const changeAstNodes = (node: ParseTree, imgData: NewImageData[]) => {
//   if (node.type === "img") {
//     node.type = "picture";
//     let data: NewImageData | undefined;
//     node.attributes = node.attributes!.map((x) => {
//       if (x.key !== "src") {
//         return x;
//       } else {
//         data = imgData.find((img) => img.uri === x.value);
//         x.value = data!.permUri![1].data!.Key;
//         return x;
//       }
//     });

//     const temp = node.attributes;

//     const s1 = generateParseTree({
//       attributes: [
//         { key: "media", value: "(max-width: 799px)" },
//         { key: "srcset", value: data!.permUri![1].data!.Key },
//       ],
//       type: "source",
//     });
//     const s2 = generateParseTree({
//       attributes: [
//         { key: "media", value: "(min-width: 800px)" },
//         { key: "srcset", value: data!.permUri![2].data!.Key },
//       ],
//       type: "source",
//     });
//     const s3 = generateParseTree({ attributes: [...temp], type: "img" });
//     node.children = [s1, s2, s3];

//     node.attributes = [];

//     return;
//   } else if (node.children?.length) {
//     node.children!.forEach((x) => {
//       changeAstNodes(x, imgData);
//     });
//   } else return;
// };

const selfClosingTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];
export function isSelfClosing(tag: string) {
  return selfClosingTags.indexOf(tag) !== -1;
}

function astToHtml(tree: ParseTree): string {
  return createElementFromAstNode(tree);
}

function createElementFromAstNode(node: ParseTree) {
  let html = "";

  if (node.isTextNode) {
    html += node.text;
    return " " + html + " ";
  }

  const type = node.type || "div";

  const classes = node.classes?.join(" ");

  const id = node.id;

  const attributes = node.attributes
    ?.map((attr) => `${attr.key}="${attr.value}"`)
    .join(" ");

  html = `<${type} class="${classes}" id="${id}" ${attributes}`;

  if (isSelfClosing(type)) {
    html += "/>";
    return html;
  }

  html += ">";
  node.children?.forEach((child) => {
    html += createElementFromAstNode(child);
  });

  html += `</${type}>`;

  return html;
}

export type HtmlAttributeType = {
  key: string;
  value: string;
};

export type ParseTreeInitializer = {
  type?: string;
  classes?: Array<string>;
  id?: string;
  attributes?: Array<HtmlAttributeType>;
  text?: string;
  isTextNode?: boolean;
  children?: Array<ParseTree>;
};

class ParseTree {
  type: string | undefined;
  classes: Array<string> | undefined;
  id: string | undefined;
  attributes: Array<HtmlAttributeType> | undefined;
  text: string | undefined;
  children: Array<ParseTree> | undefined;
  isTextNode?: boolean | undefined;

  constructor(init?: ParseTreeInitializer) {
    init = init || {};
    this.type = init.type || "";
    this.classes = init.classes || [];
    this.id = init.id || "";
    this.attributes = init.attributes || [];
    this.text = init.text || "";
    this.children = init.children || [];
    this.isTextNode = init.isTextNode || false;
  }
}

export function generateParseTree(options?: ParseTreeInitializer) {
  return new ParseTree(options);
}

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
      { key: "loading", value: "lazy" },
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
