export type InputProp = {
  name: string;
  type: string;
  required?: boolean;
};

export const InputProp = [
  {
    name: "Produto",
    type: "text",
    required: true,
  },
  {
    name: "Unidade de medida",
    type: "text",
    required: true,
  },
  {
    name: "Quantidade",
    type: "text",
    required: false,
  },
  {
    name: "Preço",
    type: "text",
    required: true,
  },
  {
    name: "Fabricação",
    type: "text",
    required: true,
  },
  {
    name: "Validade",
    type: "text",
    required: false,
  },
];
