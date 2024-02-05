import { useState, useEffect } from "react";

function getWindowSize() {
  const { innerWidth } = window;
  return innerWidth;
}

export function useWindowSize() {
  const [windowDimensions, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
