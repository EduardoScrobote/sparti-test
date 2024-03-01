import { ButtonHTMLAttributes } from "react";

export type ButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
  width: string;
};
