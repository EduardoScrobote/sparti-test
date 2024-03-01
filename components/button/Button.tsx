import { ButtonProp } from "@/types/Button.type";

function Button({ name, width }: ButtonProp) {
  return (
    <div>
      <button
        className={`text-text-primary ${width} h-[45px] mt-8 rounded-lg text-lg font-bold hover:bg-blue-secondary bg-blue-primary`}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
