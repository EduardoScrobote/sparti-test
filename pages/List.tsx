"use client";
import ListItems from "@/components/listItems/ListItems";
import useBreakPoint, { BreakPoint } from "@/hooks/useBreakingPoint";
import { DataProp } from "@/types/Data.type";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";

function List() {
  const [hamburguer, setHamburguer] = useState<boolean>(false);

  const data = localStorage.getItem("formData");
  const convertedData = JSON.parse(`${data}`);

  if (
    [BreakPoint.MOBILE, BreakPoint.TABLET].includes(useBreakPoint()) &&
    hamburguer === false
  ) {
    return (
      <div className="w-full overflow-y-scroll  h-screen gap-4 bg-primary-black text-text-primary flex flex-col">
        <div className="flex mt-4 w-[100%] items-center justify-center">
          <div
            onClick={() => setHamburguer(true)}
            className="hover:cursor-pointer"
          >
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
          </div>
          <h1 className="text-[32px] font-bold">Sparti List</h1>
        </div>
        <div className="w-full h-auto overflow-y-scroll flex-col flex">
          {convertedData ? (
            <div>
              {" "}
              {convertedData.map((prop: DataProp, i: number) => (
                <ListItems
                  manufacturing={prop.manufacturing}
                  maturity={prop.maturity}
                  perishable={prop.perishable}
                  price={prop.price}
                  product={prop.product}
                  quantityValue={prop.quantityValue}
                  unity={prop.unity}
                  key={i}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center">
              <h1 className="text-[16px]">Não existe nem um item armazenado</h1>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (hamburguer == true) {
    return (
      <div>
        <div className="w-full h-screen bg-primary-black text-text-primary flex flex-col items-center justify-center">
          <h1 className="m-4 text-[36px] hover:text-blue-primary hover:cursor-pointer hover:scale-110 duration-200">
            <Link href="/">Formulario</Link>
          </h1>
          <h1
            onClick={() => setHamburguer(false)}
            className="m-4 text-[36px] hover:text-blue-primary hover:cursor-pointer hover:scale-110 duration-200"
          >
            Lista
          </h1>
        </div>
      </div>
    );
  }
}

export default List;
