import { InputHTMLAttributes } from "react";

export type InputProp = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  type: string;
  required?: boolean;
  unity?: string;
};
