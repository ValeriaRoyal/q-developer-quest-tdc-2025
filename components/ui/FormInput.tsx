import { ReactNode } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

type Size = "default" | "large";

export type FormInputProps = {
  id: string;
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
  error?: string;               // erro vindo de fora (tem precedência)
  required?: boolean;           // <-- NOVO
  requiredMessage?: string;     // <-- NOVO (padrão: "mensagem de erro")
  disabled?: boolean;
  locked?: boolean;
  size?: Size;
  rightIcon?: ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
};

export function FormInput({
  id,
  label,
  value,
  defaultValue,
  placeholder,
  description,
  error,
  required = false,
  requiredMessage = "Este campo é obrigatório",
  disabled,
  locked,
  size = "default",
  rightIcon,
  onChange,
  onBlur,
  onFocus,
}: FormInputProps) {
  const text = (value ?? defaultValue ?? "").toString();
  const isEmpty = text.trim().length === 0;
  const computedError = error; // Só usa erro passado externamente
  const hasText = !isEmpty;

  const sizeCls = size === "large" ? "text-lg py-3" : "text-base py-2";

  const describedBy: string[] = [];
  if (description && !computedError) describedBy.push(`${id}-desc`);
  if (computedError) describedBy.push(`${id}-err`);

  return (
    <div className={clsx("w-full", disabled && "pointer-events-none")} data-filled={hasText ? "true" : undefined}>
      <label
        htmlFor={id}
        className={clsx(
          "mb-1 block text-sm",
          disabled ? "text-gray-400 dark:text-gray-500" : computedError ? "text-red-600 dark:text-red-400" : "text-gray-800 dark:text-gray-200"
        )}
      >
        {label}
        {required && <span className="text-red-600 dark:text-red-400 ml-1">*</span>}
      </label>

      <div
        className={clsx(
          "relative flex items-center gap-2 transition-colors",
          // idle
          "border-b border-[#D6D6CC]",
          // focus
          !computedError && "focus-within:border-b-2 focus-within:border-[#FF6600]",
          // filled (quando perde o foco e tem valor, mantém borda preta)
          !computedError && "data-[filled=true]:border-black",
          // error
          computedError && "border-b-2 border-red-600",
          // locked/disabled
          locked && "bg-gray-50 dark:bg-gray-900 cursor-default text-gray-700 dark:text-gray-300",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        <input
          id={id}
          type="text"
          className={clsx(
            "peer w-full bg-transparent outline-none text-gray-900 dark:text-gray-100",
            "placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:opacity-100",
            sizeCls,
            locked && "select-text",
            disabled && "text-gray-400 dark:text-gray-500"
          )}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder || "Digite aqui..."}
          aria-invalid={!!computedError}
          aria-required={required || undefined}
          aria-describedby={describedBy.join(" ") || undefined}
          readOnly={locked}
          disabled={disabled}
          onChange={onChange}
          onBlur={(e) => {
            onBlur?.(e);
          }}
          onFocus={onFocus}
        />

        {rightIcon && (
          <span
            aria-hidden
            className={clsx(
              "pointer-events-none pr-1",
              size === "large" ? "text-xl" : "text-base",
              (locked || disabled) ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400"
            )}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {/* description / error */}
      {description && !computedError && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}

      {computedError && (
        <p id={`${id}-err`} className="mt-1 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
          <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4" aria-hidden />
          {computedError}
        </p>
      )}
    </div>
  );
}
