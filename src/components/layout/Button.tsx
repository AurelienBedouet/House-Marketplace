import { IButton } from "@/types";

const Button = ({ id, buttonStyle, children, ...rest }: IButton) => {
  return (
    <button
      id={id}
      {...rest}
      className={`w-full py-3 px-5 rounded-xl shadow-lg font-semibold transition duration-200 hover:-translate-y-1 ${buttonStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
