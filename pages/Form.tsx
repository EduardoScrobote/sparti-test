"use client";
import useBreakPoint, { BreakPoint } from "../hooks/useBreakingPoint";

import { GiHamburgerMenu } from "react-icons/gi";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import Button from "@/components/button/Button";
import { useState } from "react";

import { useForm } from "react-hook-form";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [perishable, setPerishable] = useState(false);

  function createData(data: any) {
    let formData = new Array();

    const storedData = localStorage.getItem("formData");

    if (storedData) {
      formData = JSON.parse(storedData);
    }

    formData.push(data);

    localStorage.setItem("formData", JSON.stringify(formData));

    console.log(formData);
  }

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
        <form
          className="w-full flex flex-col justify-center items-center"
          onSubmit={handleSubmit(createData)}
        >
          <div className="w-full p-6 flex flex-col justify-center items-center">
            <label className="block mb-2 text-[16px] font-medium text-gray-900 dark:text-white w-full">
              Produto
            </label>
            <input
              type="text"
              className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
              placeholder="Produto"
              required
              {...register("product")}
            />
            <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
              Unidade de medida
            </label>
            <select
              className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5 "
              required
              {...register("unity")}
            >
              <option value="kg">Kilo grama</option>
              <option value="un">Unidade</option>
              <option value="lt">Litros</option>
            </select>
            <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
              Quantidade
            </label>
            <input
              type="text"
              className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
              placeholder="John"
              required
              {...register("quantity")}
            />
            <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
              Preço
            </label>
            <input
              type="text"
              className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
              placeholder="Preço"
              required
              {...register("price")}
            />
            <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
              Fabricação
            </label>
            <input
              type="date"
              className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
              placeholder="John"
              required
              {...register("manufacturing")}
            />

            <div className="flex w-full items-center mt-8 gap-2 justify-center">
              {perishable ? (
                <ImCheckboxChecked onClick={() => setPerishable(false)} />
              ) : (
                <ImCheckboxUnchecked onClick={() => setPerishable(true)} />
              )}
              <h1 className="text-lg">Produto perecível</h1>
            </div>
            <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
              Vencimento
            </label>
            <input
              type="date"
              className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
              required
              {...register("maturity")}
            />
            <div className="w-[50%]">
              <Button name="Salvar" type="submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-primary-black text-text-primary">
      Desktop
    </div>
  );
}
