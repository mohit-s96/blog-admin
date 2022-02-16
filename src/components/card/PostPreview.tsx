import React, { ReactElement, useEffect, useState } from "react";
import { BlogListType } from "../../types/blogTypes";
import { DeviceTypes, SupaUploadResponseType } from "../../types/globalTypes";
import { useTheme } from "../provider/Provider";
import PostPreviewContent from "./PostPreviewContent";
import PostPreviewImage from "./PostPreviewImage";

export interface CardProps {
  data: BlogListType;
}
function PostPreview({ data, data: { images } }: CardProps): ReactElement {
  const [deviceType, setDeviceType] = useState<DeviceTypes>("ipad");
  const { theme } = useTheme();
  useEffect(() => {
    const targetWidth = window.innerWidth;
    if (targetWidth < 1024) {
      setDeviceType("mobile");
    } else if (targetWidth >= 1024 && targetWidth <= 1200) {
      setDeviceType("ipad");
    } else {
      setDeviceType("regular");
    }
  }, []);
  function resolveLayouts() {
    let str = "flex relative mb-6";
    if (deviceType === "mobile" || deviceType === "ipad") {
      str += " w-full mt-8";
      str += deviceType === "mobile" ? " flex-col" : "";
    } else if (1) {
      str += " w-full";
    } else {
      str += " w-card-lg-vert flex-col";
    }

    return str;
  }
  return (
    <>
      <div className={resolveLayouts()}>
        {deviceType === "regular" ? (
          <>
            <PostPreviewImage
              type="horiz"
              uri={
                images.find((img) => img.isHero)
                  ?.permUri as SupaUploadResponseType[]
              }
              alt={images[0].alt}
            />
            <PostPreviewContent content={data} type="horiz" theme={theme} />
          </>
        ) : deviceType === "mobile" ? (
          <>
            <PostPreviewImage
              type="vert"
              uri={images[0].permUri as SupaUploadResponseType[]}
              alt={images[0].alt}
            />
            <PostPreviewContent content={data} type="vert" theme={theme} />
          </>
        ) : (
          <>
            <PostPreviewImage
              type="horiz"
              uri={images[0].permUri as SupaUploadResponseType[]}
              alt={images[0].alt}
            />
            <PostPreviewContent content={data} type="horiz" theme={theme} />
          </>
        )}
      </div>
    </>
  );
}

export default PostPreview;
