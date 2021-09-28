import React, { ReactElement } from "react";
import { DeviceTypes, LayoutType, ThemeType } from "../../types/globalTypes";
import NavItem from "./NavItem";
import { Clock } from "../svg/collection.svg";
import PostExcerpt from "./PostExcerpt";
import PostTags from "./PostTags";
import PostTitle from "./PostTitle";
import { CardProps } from "./PostPreview";
import { formatDistance } from "date-fns";

interface Props {
  theme: ThemeType;
  type: LayoutType;
  content: CardProps["data"];
  device?: DeviceTypes;
}

function PostPreviewContent({
  content: { excerpt, createdAt, title, tags },
  type,
  theme,
}: Props): ReactElement {
  return (
    <div
      className={`${
        type === "horiz" ? "w-card-lg-horiz" : "w-full min-h-[50%]"
      } ${theme === "dark" ? "bg-primary-dark" : "bg-primary-light"} ${
        type === "horiz"
          ? "rounded-br-3xl rounded-tr-3xl"
          : "rounded-br-3xl rounded-bl-3xl"
      }`}
    >
      <div className={`p-2 flex flex-col h-full justify-evenly`}>
        <PostTitle text={title} theme={theme} type={type} />
        <PostExcerpt text={excerpt} theme={theme} type={type} />
        <PostTags tags={tags} theme={theme} type={type} />
        <div className="inline-block absolute bottom-2 right-2">
          <NavItem
            size="xsm"
            theme={theme}
            children={formatDistance(createdAt, Date.now(), {
              addSuffix: true,
            })}
            Icon={Clock}
          />
        </div>
      </div>
    </div>
  );
}

export default PostPreviewContent;
