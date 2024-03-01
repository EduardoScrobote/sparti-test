import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex h-[75px] text-text-primary items-center justify-center w-full bg-secondary-black">
      <h1 className="text-[24px] mr-48 hover:text-blue-primary hover:cursor-pointer hover:scale-110 duration-300">
        <Link href="/">Formulario</Link>
      </h1>
      <h1 className="text-[24px] hover:text-blue-primary hover:cursor-pointer hover:scale-110 duration-300">
        <Link href="/list">Lista</Link>
      </h1>
    </div>
  );
}

export default Header;
