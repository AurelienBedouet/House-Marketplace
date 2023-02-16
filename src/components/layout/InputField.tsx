import { IInputField } from "@/types";

const InputField = ({
  inputId,
  inputStyle,
  label,
  isPricePerMonth,
  row,
  ...rest
}: IInputField) => {
  return (
    <div
      className={`flex gap-2 ${
        row ? "flex-row items-center" : "flex-col items-start "
      }`}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={`text-base sm:text-xl font-semibold ${
            row && "min-w-[48px] sm:min-w-[60px]"
          }`}
        >
          {label}
        </label>
      )}

      <div className="w-full flex items-center gap-4">
        <input
          id={inputId}
          {...rest}
          className={`w-full rounded-lg shadow-md border-gray-200 ${inputStyle}`}
          required
        />
        {isPricePerMonth && (
          <span className="min-w-[100px] font-medium text-lg">$ / Month</span>
        )}
      </div>
    </div>
  );
};

export default InputField;
