import React, { ReactElement } from "react";
import { LayoutType, SupaUploadResponseType } from "../../types/globalTypes";
import ResImage from "../util-components/resImage";

interface Props {
  type: LayoutType;
  uri: SupaUploadResponseType[];
  alt: string;
}

function PostPreviewImage({ type, uri, alt }: Props): ReactElement {
  return (
    <div className={`${type === "horiz" ? "w-card-lg-vert" : "w-full h-3/6"}`}>
      <ResImage className={`w-full h-72  ${
          type === "horiz"
            ? "rounded-tl-3xl rounded-bl-3xl"
            : "rounded-tl-3xl rounded-tr-3xl"
        }`} alt={alt} uris={uri}/>
    </div>
  );
}

export default PostPreviewImage;
