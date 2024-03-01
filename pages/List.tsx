"use client";
import ListItems from "@/components/listItems/ListItems";
import ListItemsDesktop from "@/components/listItems/ListItemDesktop";
import useBreakPoint, { BreakPoint } from "@/hooks/useBreakingPoint";
import { DataProp } from "@/types/Data.type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Header from "@/components/Header";
import ListItemDesktop from "@/components/listItems/ListItemDesktop";

function List() {
  const [hamburguer, setHamburguer] = useState<boolean>(false);
  const [convertedData, setConvertedData] = useState<any>();

  const parseData = async () => {
    const data = await localStorage.getItem("formData");
    setConvertedData(JSON.parse(`${data}`));
  };

  useEffect(() => {
    parseData();
  }, []);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <div className="flex flex-col w-full text-text-primary h-screen bg-primary-black">
      <div className="w-full">
        <Header />
      </div>
      <div className="w-full h-screen overflow-hidden flex p-4">
        <div className="w-full h-full  flex flex-col justify-between p-4">
          <h1 className="text-text-primary text-[36px]">
            Visualize seus produtos
          </h1>
          <h1 className="text-text-primary text-[36px]">
            Sparti dev / Scrobote
          </h1>
        </div>
        <div className="w-full h-full  bg-secondary-black p-4 rounded-[32px] flex flex-col">
          <div className="w-full flex justify-center items-center font-bold">
            <h1 className="text-text-primary text-[36px] ">Sparti List</h1>
          </div>
          <div
            className="w-full mt-8 overflow-y-scroll scrollbar-thin scrollbar-thumb-scroll-bar-blue scrollbar-track-blue-secondary
"
          >
            {convertedData ? (
              convertedData.map((prop: DataProp, i: number) => (
                <ListItemDesktop
                  manufacturing={prop.manufacturing}
                  maturity={prop.maturity}
                  perishable={prop.perishable}
                  price={prop.price}
                  product={prop.product}
                  quantityValue={prop.quantityValue}
                  key={i}
                />
              ))
            ) : (
              <div className="w-full  scrollbar-none flex flex-col items-center gap-6 justify-center">
                <h1 className="text-2xl">Sem produtos salvos</h1>
                <h1 className="hover:text-blue-primary hover:cursor-pointer hover:scale-110 duration-300">
                  <Link href={"/"}>Adicione novos</Link>
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
