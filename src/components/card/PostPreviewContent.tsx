import React, { ReactElement } from "react";
import { DeviceTypes, LayoutType, ThemeType } from "../../types/globalTypes";
import NavItem from "./NavItem";
import { Clock } from "../svg/collection.svg";
import PostExcerpt from "./PostExcerpt";
import PostTags from "./PostTags";
import PostTitle from "./PostTitle";
import { CardProps } from "./PostPreview";
import { formatDistance } from "date-fns";
import CreateNew from "../blog-nav/createNew";
import { Author } from "../svg/svg.collection";
import { getClasses } from "../../utils/classNameResolver";

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
      } ${getClasses("bg", theme)} ${
        type === "horiz"
          ? "rounded-br-3xl rounded-tr-3xl"
          : "rounded-br-3xl rounded-bl-3xl"
      } border-4 border-l-0 border-cyan`}
    >
      <div className={`p-2 flex flex-col h-full justify-evenly`}>
        <CreateNew className="inline-block absolute top-2 right-2 mt-2 mr-2">
          <Author color={getClasses("", theme, "icon")} />
          <span className="font-bold">edit blog</span>
        </CreateNew>
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
