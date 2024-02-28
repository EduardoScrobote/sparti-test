"use client";
import useBreakPoint, { BreakPoint } from "../hooks/useBreakingPoint";

import { GiHamburgerMenu } from "react-icons/gi";
import Input from "@/components/input/Input";
import { InputProp } from "@/types/Input.type";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import Button from "@/components/button/Button";
import { useState } from "react";

export default function Home() {
  const [perishable, setPerishable] = useState(false);

  if ([BreakPoint.MOBILE, BreakPoint.TABLET].includes(useBreakPoint())) {
    return (
      <div className="w-full h-screen flex flex-col items-center bg-primary-black text-text-primary">
        <div className="flex mt-4 w-[100%] items-center justify-center">
          <GiHamburgerMenu
            color="white"
            size={32}
            style={{
              marginRight: "8px",
              position: "absolute",
              left: "26px",
              top: "26px",
            }}
          />
          <h1 className="text-[32px] font-bold">Sparti Form</h1>
        </div>
        <div className="flex flex-col justify-center items-center mt-2 w-full p-4">
          {InputProp.map((prop, i) => (
            <div className="w-[100%] h-[100px]" key={i}>
              <Input
                name={prop.name}
                type={prop.type}
                required={prop.required}
              />
            </div>
          ))}
          <div className="flex w-full items-center gap-2 justify-center">
            {perishable ? (
              <ImCheckboxChecked onClick={() => setPerishable(false)} />
            ) : (
              <ImCheckboxUnchecked onClick={() => setPerishable(true)} />
            )}
            Produto perecível ?
          </div>
        </div>
        <div className="w-[50%]">
          <Button name="Salvar" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-primary-black text-text-primary">
      Desktop
    </div>
  );
}
