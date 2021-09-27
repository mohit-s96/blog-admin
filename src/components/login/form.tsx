import React, {
  ReactElement,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { CatPosition } from "../../hooks/useAnimation";
import FormCat from "../cat/cat";
import Button from "./button";
import Input from "./input";

interface Props {
  submit: (uname: string, pass: string) => Promise<void>;
}

type FormState = {
  uname: string;
  pass: string;
  error: string;
};

type ActionTypes = "CHANGE_UNAME" | "CHANGE_PASS" | "SET_ERROR";

type Action = {
  type: ActionTypes;
  payload?: any;
};

const initialState: FormState = {
  pass: "",
  uname: "",
  error: "",
};

const reducer = (
  state: FormState = initialState,
  action: Action
): FormState => {
  if (action.type === "CHANGE_UNAME") {
    return {
      ...state,
      uname: action.payload,
    };
  }
  if (action.type === "CHANGE_PASS") {
    return {
      ...state,
      pass: action.payload,
    };
  }
  if (action.type === "SET_ERROR") {
    return {
      ...state,
      error: action.payload,
    };
  }
  return state;
};

function LoginForm({ submit }: Props): ReactElement {
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);
  const [passFieldActive, setPassFieldActive] = useState(false);
  const [position, setPosition] = useState<CatPosition>("H");
  const rectRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setDimensions((rectRef as any).current.getBoundingClientRect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChange(type: ActionTypes, value: string) {
    if (value.length < 35) {
      dispatch({
        type,
        payload: value,
      });
    }
  }

  async function handleSubmit() {
    try {
      await submit(state.uname, state.pass);
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: (err as any).message,
      });
    }
  }

  return (
    <>
      {dimensions ? (
        <FormCat
          dimensions={dimensions as DOMRect}
          position={position}
          isPassword={passFieldActive}
        />
      ) : null}
      <div
        className="w-clamp min-h-[500px] border-4 border-cyan rounded-sm shadow-2xl bg-primary-dark flex flex-col items-center"
        ref={rectRef}
        style={{ zIndex: 1 }}
      >
        <div className="p-4">
          <h1
            className="font-extrabold text-cyan p-1 text-2xl"
            tabIndex={1}
            onMouseEnter={() => setPosition(Math.random() < 0.5 ? "TL" : "TR")}
            onFocus={() => setPosition("T")}
            onBlur={() => setPosition("H")}
          >
            [ login to dashboard ]
          </h1>
        </div>
        <div className="h-[30px]">
          {state.error ? (
            <p className="font-bold text-red-500">{state.error}</p>
          ) : null}
        </div>
        <Input
          name="username"
          type="text"
          value={state.uname}
          id="unid"
          onChange={(e) => handleChange("CHANGE_UNAME", e.target.value)}
          onFocus={() => {
            dispatch({ type: "SET_ERROR", payload: "" });

            setPosition(Math.random() < 0.5 ? "ML" : "MR");
          }}
          onBlur={() => setPosition("H")}
        />
        <Input
          name="password"
          type="password"
          value={state.pass}
          id="passid"
          onChange={(e) => handleChange("CHANGE_PASS", e.target.value)}
          onFocus={() => {
            dispatch({ type: "SET_ERROR", payload: "" });
            setPosition(Math.random() < 0.5 ? "ML" : "MR");
            setPassFieldActive(true);
          }}
          onBlur={() => {
            setPassFieldActive(false);
            setPosition("H");
          }}
        />
        <Button
          value="log in"
          onClick={handleSubmit}
          onFocus={() => setPosition("BM")}
          onHover={() => setPosition(Math.random() < 0.5 ? "BL" : "BR")}
          onBlur={() => setPosition("H")}
          onLeave={() => setPosition("H")}
        />
      </div>
    </>
  );
}

export default LoginForm;
