"use client";
import useBreakPoint, { BreakPoint } from "../hooks/useBreakingPoint";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { GiHamburgerMenu } from "react-icons/gi";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import Button from "@/components/button/Button";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NumericFormat } from "react-number-format";
import Link from "next/link";

export default function Home() {
  const [hamburguer, setHamburguer] = useState<boolean>(false);
  const [perishable, setPerishable] = useState(false);
  const [quantityValue, setQuantityValue] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const createFormDataSchema = z.object({
    manufacturing: z.coerce
      .date()
      .min(new Date("2020-01-01"), {
        message: "Data minima de fabricação é 2020",
      })
      .max(new Date(), {
        message: "Data de fabricação invalida",
      })
      .refine((data) => data <= new Date(), {
        message: "Data de fabricação invalida",
      }),
    maturity: z.coerce
      .date()
      .min(new Date(), { message: "Data de vencimento invalida" })
      .max(new Date("2045-01-01"), { message: "Data de vencimento invalida" })
      .refine((data) => data > new Date(), {
        message: "Data de vencimento invalida",
      }),
    product: z
      .string()
      .max(50, "O produto pode ter no maximo 50 caracteres")
      .min(1),
    unity: z.string(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createFormDataSchema),
  });

  function createData(data: any) {
    let formData = new Array();

    const storedData = localStorage.getItem("formData");

    if (storedData) {
      formData = JSON.parse(storedData);
    }

    data.perishable = perishable;
    data.quantityValue = quantityValue;
    data.price = price;

    formData.push(data);

    localStorage.setItem("formData", JSON.stringify(formData));
  }

  const [unity, setUnity] = useState<string>("kg");
  const [prefix, setPrefix] = useState<string>("kg");

  const definePrefix = () => {
    if (unity == "kg") {
      setPrefix("kg");
    }
    if (unity == "LT") {
    } else {
      setPrefix("lt");
    }
  };

  if (
    [BreakPoint.MOBILE, BreakPoint.TABLET].includes(useBreakPoint()) &&
    hamburguer === false
  ) {
    return (
      <div className="w-full h-screen flex flex-col items-center bg-primary-black text-text-primary">
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
              onChange={(event) => {
                setUnity(event.target.value);
                definePrefix;
              }}
            >
              <option value="kg">Kilo grama</option>
              <option value="LT">Litros</option>
              <option value="un">Unidade</option>
            </select>
            <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
              Quantidade
            </label>
            {unity === "un" ? (
              <Controller
                name="createFormDataSchema"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <NumericFormat
                    className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
                    thousandSeparator=""
                    decimalSeparator="."
                    prefix=""
                    placeholder="Quantidade"
                    decimalScale={0}
                    {...rest}
                    onChange={(e) => {
                      setQuantityValue(e.target.value);
                    }}
                  />
                )}
              />
            ) : unity === "LT" ? (
              <Controller
                name="createFormDataSchema"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <NumericFormat
                    className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
                    thousandSeparator=","
                    decimalSeparator="."
                    prefix="lt "
                    placeholder="Quantidade"
                    decimalScale={2}
                    {...rest}
                    onChange={(e) => {
                      setQuantityValue(e.target.value);
                    }}
                  />
                )}
              />
            ) : (
              <Controller
                name="createFormDataSchema"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <NumericFormat
                    className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
                    thousandSeparator=","
                    decimalSeparator="."
                    prefix="kg "
                    placeholder="Quantidade"
                    decimalScale={2}
                    {...rest}
                    onChange={(e) => {
                      setQuantityValue(e.target.value);
                    }}
                  />
                )}
              />
            )}
            <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
              Preço
            </label>
            <Controller
              name="createFormDataSchema"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <NumericFormat
                  className="bg-secondary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
                  thousandSeparator=","
                  decimalSeparator="."
                  prefix="R$ "
                  placeholder="Quantidade"
                  decimalScale={2}
                  {...rest}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              )}
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
            {errors.manufacturing && (
              <span className="text-sm text-red-error">{`${errors.manufacturing.message}`}</span>
            )}
            <div className="flex w-full items-center mt-8 gap-2 justify-center">
              {perishable ? (
                <ImCheckboxChecked
                  onClick={() => {
                    setPerishable(false), console.log(perishable);
                  }}
                />
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
              required={perishable == true ? true : false}
              disabled={perishable == true ? false : true}
              {...register("maturity")}
            />
            {errors.maturity && (
              <span className="text-sm text-red-error">{`${errors.maturity.message}`}</span>
            )}
            <div className="w-[50%]">
              <Button name="Salvar" type="submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }

  if (hamburguer === true) {
    return (
      <div>
        <div className="w-full h-screen bg-primary-black text-text-primary flex flex-col items-center justify-center">
          <h1
            onClick={() => setHamburguer(false)}
            className="m-4 text-[36px] hover:text-blue-primary hover:cursor-pointer hover:scale-110 duration-200"
          >
            Formulario
          </h1>
          <h1 className="m-4 text-[36px] hover:text-blue-primary hover:cursor-pointer hover:scale-110 duration-200">
            <Link href="/list">Lista</Link>
          </h1>
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
