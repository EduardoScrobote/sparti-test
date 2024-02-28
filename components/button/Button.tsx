import { ButtonProp } from "@/types/Button.type";

function Button({ name }: ButtonProp) {
  return (
    <div>
      <button
        className={`text-text-primary w-[100%] h-[45px] rounded-lg text-lg font-bold hover:bg-blue-secondary bg-blue-primary`}
      >
        {name}
      </button>
    </div>
  );
}

export default Button;
