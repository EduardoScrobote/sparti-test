import { DataProp } from "@/types/Data.type";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function ListItems({ ...prop }: DataProp, key: number) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      {isOpen == false ? (
        <div className="w-full h-[35px] mb-2 mt-12 duration-300 bg-secondary-black flex flex-col">
          <div
            className="w-full p-4 justify-between bg-secondary-black flex "
            key={key}
          >
            <h1>{prop.product}</h1>
            <div
              onClick={() => setIsOpen(true)}
              className="flex w-8 h-8 rounded-full hover:cursor-pointer hover:scale-110 bg-primary-black items-center justify-center"
            >
              <IoIosArrowDown />
            </div>
          </div>
          <div className="w-full h-screen bg-secondary-black duration-300 mt-8"></div>
        </div>
      ) : (
        <div className="w-full h-[250px]  mb-2 duration-300 mt-6 bg-secondary-black flex flex-col">
          <div
            className="w-full p-4 justify-between bg-secondary-black flex "
            key={key}
          >
            <h1>{prop.product}</h1>
            <div
              onClick={() => setIsOpen(false)}
              className="flex w-8 h-8 rounded-full hover:cursor-pointer hover:scale-110 bg-primary-black items-center justify-center"
            >
              <IoIosArrowUp />
            </div>
          </div>
          <div className="w-full h-screen flex flex-col bg-secondary-black duration-300 mt-8">
            <div className="flex p-4 duration-300 justify-between w-full">
              <h1 className="decoration-solid">{prop.quantityValue}</h1>
              <h1 className="decoration-solid">{prop.price}</h1>
            </div>
            <div className="flex justify-between duration-300 p-4 w-full">
              <h1 className="decoration-solid">
                <span>F: </span>
                {new Date(prop.manufacturing).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </h1>
              <h1 className="decoration-solid">
                <span>V: </span>
                {new Date(prop.maturity).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItems;
