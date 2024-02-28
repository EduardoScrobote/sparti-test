import { InputProp } from "@/types/Input.type";

function Input({ name, type, required }: InputProp) {
  return (
    <div>
      <label
        htmlFor={`${name}`}
        className="block mb-2 ml-1 text-[16px] font-medium text-text-primary dark:text-white"
      >
        {name}
      </label>
      <input
        type={`${type}`}
        id={`${name}`}
        className="bg-secondary-black text-gray-900 outline-none text-sm rounded-lg focus:border-2 focus:border-blue-primary ease-linear  block w-full p-2.5"
        placeholder={`${name}`}
        required={required}
      />
    </div>
  );
}

export default Input;
