import { ReactNode } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

type Size = "default" | "large";

export type FormSelectProps = {
  id: string;
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  locked?: boolean;
  size?: Size;
  children: ReactNode; // <option> elements
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
};

export function FormSelect({
  id,
  label,
  value,
  defaultValue,
  placeholder,
  description,
  error,
  required = false,
  disabled,
  locked,
  size = "default",
  children,
  onChange,
  onBlur,
  onFocus,
}: FormSelectProps) {
  const describedByIds: string[] = [];
  if (description) describedByIds.push(`${id}-desc`);
  if (error) describedByIds.push(`${id}-err`);

  const baseColors = {
    idle: "border-b border-[#D6D6CC]",
    focus: "focus-within:border-b-2 focus-within:border-[#FF6600]",
    filled: (hasText: boolean) => (hasText ? "data-[filled=true]:border-black" : ""),
    error: error ? "border-b-2 border-red-600" : "",
    disabled: disabled ? "opacity-60 cursor-not-allowed" : "",
    locked: locked ? "bg-gray-50 dark:bg-gray-900 cursor-default text-gray-700 dark:text-gray-300" : "",
  };

  const sizeStyles =
    size === "large"
      ? "text-lg py-3"
      : "text-base py-2";

  const hasText = (value ?? defaultValue ?? "").toString().length > 0;

  return (
    <div
      className={clsx("w-full", disabled && "pointer-events-none")}
      data-filled={hasText}
    >
      <label
        htmlFor={id}
        className={clsx(
          "mb-1 block text-sm",
          disabled ? "text-gray-400 dark:text-gray-500" : error ? "text-red-600 dark:text-red-400" : "text-gray-800 dark:text-gray-200"
        )}
      >
        {label}
        {required && <span className="text-red-600 dark:text-red-400 ml-1">*</span>}
      </label>

      <div
        className={clsx(
          "relative flex items-center gap-2 transition-colors",
          baseColors.idle,
          baseColors.focus,
          baseColors.filled(hasText),
          baseColors.error,
          baseColors.locked,
          baseColors.disabled
        )}
      >
        <select
          id={id}
          className={clsx(
            "peer w-full bg-transparent outline-none appearance-none cursor-pointer",
            sizeStyles,
            locked && "cursor-default",
            disabled && "cursor-not-allowed"
          )}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={!!error}
          aria-describedby={describedByIds.join(" ") || undefined}
          disabled={disabled || locked}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={clsx(
            "pointer-events-none",
            size === "large" ? "h-5 w-5" : "h-4 w-4",
            locked || disabled ? "text-gray-400 dark:text-gray-500" : "text-gray-500 dark:text-gray-400 dark:text-gray-500"
          )}
        />
      </div>

      {description && !error && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-gray-500">
          {description}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
