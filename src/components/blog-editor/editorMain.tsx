import React, { ReactElement, useEffect, useReducer, useRef } from "react";
import { useRect } from "../../hooks/useRect";
import { getInitialEditorState, reducer } from "../../reducers/editorReducer";
import {
  getInititalWidthState,
  widthReducer,
} from "../../reducers/editorWidthReducer";
import { EditorType, WidthContextType } from "../../types/globalTypes";
import { getClasses } from "../../utils/classNameResolver";
import WithTransition from "../hoc/withTransition";
import { useTheme } from "../provider/Provider";
import { Ripple } from "../svg/svg.collection";
import Overlay from "../util-components/modal";
import EditBlog from "./editBlog";
import PageDivider from "./pageDivider";
import Preview from "./preview";

export const EditorContext = React.createContext<EditorType>(
  getInitialEditorState()
);

export const WidthContext = React.createContext<WidthContextType>(
  getInititalWidthState()
);

function EditorMain(): ReactElement {
  const [data, dispatch] = useReducer(reducer, getInitialEditorState());

  const divRef = useRef(null);

  const rect = useRect(divRef);

  const { theme } = useTheme();

  const [widthData, widthDispatch] = useReducer(
    widthReducer,
    getInititalWidthState()
  );

  useEffect(() => {
    widthDispatch({
      type: "PARENT",
      payload: rect,
    });
  }, [rect]);

  useEffect(() => {
    const data = localStorage.getItem("nomark");
    if (data) {
      dispatch({
        type: "ALL",
        payload: JSON.parse(data),
      });
    }
  }, []);

  return (
    <WithTransition slide="right">
      <EditorContext.Provider
        value={{
          ...data,
          dispatch,
        }}
      >
        <WidthContext.Provider
          value={{
            ...widthData,
            wDispatch: widthDispatch,
          }}
        >
          <div className="w-11/12 flex opacity-[inherit]" ref={divRef}>
            {data.loading ? (
              <Overlay type="loading">
                <Ripple
                  color={getClasses("accent", theme, "icon")}
                  className="scale-150"
                />
              </Overlay>
            ) : data.error ? (
              <Overlay
                type="error"
                cb={() => dispatch({ payload: "" as any, type: "SET_ERROR" })}
              >
                {data.error}
              </Overlay>
            ) : null}
            <EditBlog />
            <PageDivider />
            <Preview />
          </div>
        </WidthContext.Provider>
      </EditorContext.Provider>
    </WithTransition>
  );
}

export default EditorMain;
