import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { DeviceTypes, LayoutType, ThemeType } from "../../types/globalTypes";
import SimpleTags from "../tags/SimpleTags";

interface Props {
  tags: Array<string>;
  theme: ThemeType;
  type: LayoutType;
  device?: DeviceTypes;
}

function PostTags({ tags, type, theme }: Props): ReactElement {
  const [loaded, setLoaded] = useState(false);
  const filterIfSmallScreen = useCallback(() => {
    if (typeof window === "undefined") return tags;
    if (window.innerWidth > 1500) return tags;
    else {
      return tags.filter((_, i) => i < 4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <div
      className={`p-2 ${
        type === "horiz" ? "w-6/12" : "w-11/12"
      } flex flex-wrap`}
    >
      {filterIfSmallScreen().map((tag) => (
        <SimpleTags tag={tag} theme={theme} key={tag} />
      ))}
    </div>
  );
}

export default PostTags;
