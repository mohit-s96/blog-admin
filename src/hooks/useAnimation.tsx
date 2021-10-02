import { useEffect, useRef, useState } from "react";

type Vector = {
  x: number;
  y: number;
};
type Dimensions = {
  height: number;
  width: number;
};
export type CatPosition =
  | "TL"
  | "TR"
  | "TM"
  | "BL"
  | "BR"
  | "BM"
  | "ML"
  | "MR"
  | "H"
  | "T";

interface Params {
  animType?: CatPosition;
  child: Dimensions;
  rect: DOMRect;
}

function useAnimation(rect: Params["rect"], child: Params["child"]) {
  const initState = {
    x: rect.width / 2 - child.width / 2,
    y: -child.height / 4,
  };
  const [pos, setPos] = useState<Vector>(initState);
  const [rotation, setRotation] = useState(0);
  const [pass, setPass] = useState(false);
  const [blinking, setBlinking] = useState(true);
  const [currentPos, setCurrentPos] = useState<CatPosition>("TM");
  const tilt = useRef(0);

  useEffect(() => {
    applyTransform(currentPos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPos]);

  useEffect(() => {
    let id: NodeJS.Timeout;
    function blink() {
      if (!pass) {
        setBlinking(() => false);
        setTimeout(() => {
          setBlinking(() => true);
        }, 200);
      } else {
        id && clearTimeout(id);
        setBlinking(false);
      }
      id = setTimeout(blink, 4000);
    }

    blink();
    return () => {
      id && clearTimeout(id);
    };
  }, [pass]);

  function applyTransform(animType: Params["animType"]) {
    switch (animType) {
      case "H":
        setPos({
          ...initState,
          y: 0,
        });
        setRotation(0);
        tilt.current = 0;
        break;
      case "TL":
        setPos({
          ...initState,
          x: -(child.width / 2) + 25,
        });
        setRotation(0);
        tilt.current = -30;

        break;
      case "TR":
        setPos({
          ...initState,
          x: rect.width - child.width / 2,
        });
        setRotation(0);
        tilt.current = 30;

        break;
      case "TM":
        setPos(initState);
        setRotation(0);
        tilt.current = 0;

        break;
      case "T":
        setPos({
          ...initState,
          y: -child.height / 2,
        });
        setRotation(0);
        tilt.current = 0;
        break;
      case "ML":
        setPos({
          x: -(child.width / 2) + 25,
          y: rect.height / 2 - child.height / 2,
        });
        setRotation(0);
        tilt.current = -30;

        break;
      case "MR":
        setPos({
          x: rect.width - child.width / 2,
          y: rect.height / 2 - child.height / 2,
        });
        setRotation(0);
        tilt.current = 30;

        break;
      case "BM":
        setPos({
          ...initState,
          y: rect.height - child.height / 2,
        });

        setRotation(180);

        tilt.current = 0;

        break;
      case "BL":
        setPos({
          x: -(child.width / 2) + 25,
          y: rect.height - child.height / 2,
        });
        setRotation(180);

        tilt.current = 30;
        break;
      case "BR":
        setPos({
          x: rect.width - child.width / 2 - 25,
          y: rect.height - child.height / 2,
        });

        setRotation(180);

        tilt.current = -30;
        break;
      default:
        break;
    }
  }
  return {
    pos,
    rotation,
    tilt,
    blinking,
    setPass,
    setCurrentPos,
  };
}

export default useAnimation;
