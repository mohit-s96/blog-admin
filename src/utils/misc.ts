import ParseTree from "nomark-js/dist/core/parseTree";
import { NewImageData } from "../types/globalTypes";

export const changeAstNodes = (node: ParseTree, imgData: NewImageData[]) => {
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
