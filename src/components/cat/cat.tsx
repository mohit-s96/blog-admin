import React, { ReactElement, useEffect } from "react";
import useAnimation, { CatPosition } from "../../hooks/useAnimation";
import { Cat } from "../svg/svg.collection";

interface Props {
  dimensions: DOMRect;
  position: CatPosition;
  isPassword: boolean;
  hasInit?: boolean;
}

function FormCat({ dimensions, isPassword, position }: Props): ReactElement {
  const { blinking, pos, rotation, tilt, setCurrentPos, setPass } =
    useAnimation(dimensions, {
      height: 200,
      width: 200,
    });
  useEffect(() => {
    setCurrentPos(position);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
  useEffect(() => {
    setPass(isPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPassword]);
  return (
    <div
      className="absolute"
      style={{
        transition: "all 0.4s linear",
        top: `${dimensions.top}px`,
        left: `${dimensions.left}px`,
        transform: `translate(${pos.x}px, ${pos.y}px) rotate(${rotation}deg)`,
      }}
    >
      <Cat closed={!blinking} tilt={tilt.current} />
    </div>
  );
}

export default FormCat;
