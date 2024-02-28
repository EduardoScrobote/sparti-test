import { useEffect, useState } from "react";

export enum BreakPoint {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
}

const useBreakPoint = () => {
  const [breakPoint, setBreakPoint] = useState<BreakPoint>(BreakPoint.MOBILE);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakPoint(BreakPoint.MOBILE);
      } else if (width < 1024) {
        setBreakPoint(BreakPoint.TABLET);
      } else {
        setBreakPoint(BreakPoint.DESKTOP);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakPoint;
};

export default useBreakPoint;
