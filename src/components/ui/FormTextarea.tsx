import clsx from "clsx";

type Size = "default" | "large";

export type FormTextareaProps = {
  id: string;
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  locked?: boolean;
  size?: Size;
  rows?: number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
};

export function FormTextarea({
  id,
  label,
  value,
  defaultValue,
  placeholder,
  description,
  error,
  disabled,
  locked,
  size = "default",
  rows = 3,
  onChange,
  onBlur,
  onFocus,
}: FormTextareaProps) {
  const describedByIds: string[] = [];
  if (description) describedByIds.push(`${id}-desc`);
  if (error) describedByIds.push(`${id}-err`);

  const baseColors = {
    idle: "border border-[#D6D6CC]",
    focus: "focus-within:border-2 focus-within:border-[#FF6600]",
    filled: (hasText: boolean) => (hasText ? "data-[filled=true]:border-black" : ""),
    error: error ? "border-2 border-[#9B51E0]" : "",
    disabled: disabled ? "opacity-60 cursor-not-allowed" : "",
    locked: locked ? "bg-gray-50 dark:bg-gray-900 cursor-default text-gray-700 dark:text-gray-300" : "",
  };

  const sizeStyles =
    size === "large"
      ? "text-lg p-3"
      : "text-base p-2";

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
          error ? "text-[#9B51E0]" : "text-gray-800 dark:text-gray-200"
        )}
      >
        {label}
      </label>

      <div
        className={clsx(
          "relative transition-colors rounded-md",
          baseColors.idle,
          baseColors.focus,
          baseColors.filled(hasText),
          baseColors.error,
          baseColors.locked,
          baseColors.disabled
        )}
      >
        <textarea
          id={id}
          rows={rows}
          className={clsx(
            "peer w-full bg-transparent outline-none placeholder:text-gray-500 dark:text-gray-400 dark:text-white placeholder:opacity-100 resize-none rounded-md",
            sizeStyles,
            locked && "select-text",
          )}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder || " "}
          aria-invalid={!!error}
          aria-describedby={describedByIds.join(" ") || undefined}
          readOnly={locked}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>

      {description && !error && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 dark:text-gray-400 dark:text-white">
          {description}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-[#9B51E0]">
          {error}
        </p>
      )}
    </div>
  );
}
