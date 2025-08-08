import { useEffect, useRef } from "react";

function useFirstRender() {
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    console.log("first render to false!");
    return () => {
      isFirstRender.current = true;
      console.log("Cleaning up first render to false");
    };
  }, []);

  /* 
    This is used to flag if its first render, because isFirstRender flag
    is used to choose the url of api (external system), i think using effect 
    is the correct answer here
  */

  return isFirstRender.current;
}

export default useFirstRender;
