import { useEffect, useState } from "react";
import { EditorType } from "../components/blog-editor/editorMain";

function useLocalStorage(key: string, refetchValues: EditorType) {
  const { readingTime, body, heroImg, excerpt, tags, title } = refetchValues;
  const [state, setState] = useState({});

  useEffect(() => {
    const data = localStorage.getItem(key) || "";
    setState(JSON.parse(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readingTime, body, heroImg, excerpt, tags, title]);
  return state as EditorType;
}

export default useLocalStorage;
