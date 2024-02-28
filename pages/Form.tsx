"use client";
import useBreakPoint, { BreakPoint } from "../hooks/useBreakingPoint";

export default function Home() {
  if ([BreakPoint.MOBILE, BreakPoint.TABLET].includes(useBreakPoint())) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-purple">
        Mobile / Table
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-purple">
      Desktop
    </div>
  );
}
