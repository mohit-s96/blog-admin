import { useEffect, useState } from "react";

function useLocalStorage(key: string) {
  const [state, setState] = useState("");
  useEffect(() => {
    console.log("ran");

    const data = localStorage.getItem(key) || "";
    setState(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return state;
}

export default useLocalStorage;
