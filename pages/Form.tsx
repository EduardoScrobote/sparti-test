"use client";
import useBreakPoint, { BreakPoint } from "../hooks/useBreakingPoint";
import Link from "next/link";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { GiHamburgerMenu } from "react-icons/gi";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import Button from "@/components/button/Button";
import { ToastContainer, toast } from "react-toastify";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NumericFormat } from "react-number-format";
import Header from "@/components/Header";

export default function Home() {
  const [hamburguer, setHamburguer] = useState<boolean>(false);
  const [perishable, setPerishable] = useState(false);
  const [quantityValue, setQuantityValue] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const exibrNotify = () => {
    setSuccess(true);
    console.log(success);
    setTimeout(removeNotify, 5000);
    console.log(success);
  };

  const removeNotify = () => {
    setSuccess(false);
  };

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
      })
      .optional(),
    product: z
      .string()
      .max(50, "O produto pode ter no maximo 50 caracteres")
      .min(1),
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
    exibrNotify();
  }

  const [unity, setUnity] = useState<string>("kg");
  const [prefix, setPrefix] = useState<string>("kg");

  const definePrefix = () => {
    if (unity == "kg") {
      setPrefix("kg");
    }
    if (unity == "LT") {
      setPrefix("lt");
    } else {
    }
  };

  if (
    [BreakPoint.MOBILE, BreakPoint.TABLET].includes(useBreakPoint()) &&
    hamburguer === false
  ) {
    return (
      <div className="w-full h-screen flex flex-col items-center bg-primary-black text-text-primary">
        {success === true ? (
          <div className="w-[16rem] mt-4 absolute rounded-lg transition ease-in  duration-300 bg-[#198754] items-center justify-center flex h-[75px]">
            <h1 className="select-none">Produto Salvo</h1>
          </div>
        ) : null}
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
              {...register(`${perishable ? "maturity" : null}`)}
            />
            {errors.maturity && (
              <span className="text-sm text-red-error">{`${errors.maturity.message}`}</span>
            )}
            <div className="w-[50%]">
              <Button width="w-[100%]" name="Salvar" type="submit" />
            </div>
            <h1 className="hover:text-red-error mt-6 hover:cursor-pointer hover:scale-110 duration-300">
              <Link href={"/list"}>Cancelar</Link>
            </h1>
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
    <div className="flex flex-col w-full h-screen text-text-primary bg-primary-black">
      {success === true ? (
        <div className="w-[16rem] mt-4 absolute self-center rounded-lg transition ease-in  duration-300 bg-[#198754] items-center justify-center flex h-[75px]">
          <h1 className="select-none">Produto Salvo</h1>
        </div>
      ) : null}
      <Header />
      <div className="w-full h-screen flex  p-4">
        <div className="w-full h-full  flex flex-col justify-between p-4">
          <h1 className="text-text-primary text-[36px]">
            Adicione seu produto
          </h1>
          <h1 className="text-text-primary text-[36px]">
            Sparti dev / Scrobote
          </h1>
        </div>
        <div className="w-full h-full bg-secondary-black p-4 rounded-[32px] flex flex-col">
          <div className="w-full flex justify-center items-center font-bold">
            <h1 className="text-text-primary text-[36px] ">Sparti form</h1>
          </div>
          <form
            className="w-full flex flex-col mt-16"
            onSubmit={handleSubmit(createData)}
          >
            <div className="w-full p-6 flex flex-col justify-center items-center">
              <div className="w-full  gap-8 flex">
                <div className="w-full">
                  <label className="block mb-2 text-[16px] font-medium text-gray-900 dark:text-white w-full">
                    Produto
                  </label>
                  <input
                    type="text"
                    className="bg-primary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
                    placeholder="Produto"
                    required
                    {...register("product")}
                  />
                </div>
                <div className="w-full">
                  <label className="mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
                    Unidade de medida
                  </label>
                  <select
                    className="bg-primary-black mt-2 border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5 "
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
                </div>
              </div>
              <div className="w-full gap-8 flex">
                <div className="w-full">
                  <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
                    Quantidade
                  </label>
                  {unity === "un" ? (
                    <Controller
                      name="createFormDataSchema"
                      control={control}
                      render={({ field: { ref, ...rest } }) => (
                        <NumericFormat
                          className="bg-primary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
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
                          className="bg-primary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
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
                          className="bg-primary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
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
                </div>
                <div className="w-full">
                  <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
                    Preço
                  </label>
                  <Controller
                    name="createFormDataSchema"
                    control={control}
                    render={({ field: { ref, ...rest } }) => (
                      <NumericFormat
                        className="bg-primary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
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
                </div>
              </div>
              <div className="w-full ">
                <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
                  Fabricação
                </label>
                <input
                  type="date"
                  className="bg-primary-black border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block w-full p-2.5"
                  placeholder="John"
                  required
                  {...register("manufacturing")}
                />
              </div>
              <div className="w-full">
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
                  <h1 className="text-lg">Produto perecível ?</h1>
                </div>
                <label className="block mb-2 mt-4 text-[16px] font-medium text-gray-900 dark:text-white w-full">
                  Vencimento
                </label>
                <input
                  type="date"
                  className="bg-primary-black w-[50%] border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:border-2 focus:border-blue-primary block p-2.5"
                  required={perishable == true ? true : false}
                  disabled={perishable == true ? false : true}
                  {...register("maturity")}
                />
                {errors.maturity && (
                  <span className="text-sm text-red-error">{`${errors.maturity.message}`}</span>
                )}
              </div>
            </div>
            <div className="w-full  justify-center flex flex-col items-center">
              <Button name="Salvar" width="w-[26rem]" type="submit" />
              <h1 className="mt-4 hover:text-red-error hover:cursor-pointer">
                <Link href="/list">Cancelar</Link>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
