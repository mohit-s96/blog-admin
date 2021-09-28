import React, { ReactElement } from "react";
import { LayoutType } from "../../types/globalTypes";

interface Props {
  type: LayoutType;
  uri: string;
  alt: string;
}

function PostPreviewImage({ type, uri, alt }: Props): ReactElement {
  return (
    <div className={`${type === "horiz" ? "w-card-lg-vert" : "w-full h-3/6"}`}>
      <img
        src={uri}
        alt={alt}
        className={`w-full h-full ${
          type === "horiz"
            ? "rounded-tl-3xl rounded-bl-3xl"
            : "rounded-tl-3xl rounded-tr-3xl"
        }`}
      />
    </div>
  );
}

export default PostPreviewImage;
