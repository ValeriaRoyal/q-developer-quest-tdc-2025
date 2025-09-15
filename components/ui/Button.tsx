import clsx from "clsx";
import { ReactNode } from "react";

type Variant = "primary" | "secondary";
type Contrast = "default" | "high";
type Size = "sm" | "md" | "lg";
type Tone = "brand" | "blue" | "gold";

type ButtonProps = {
  children?: ReactNode;
  variant?: Variant;
  contrast?: Contrast;
  size?: Size;
  tone?: Tone;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

const colors = {
  brand:   { base: "#FF6600", hover: "#E65C00", ring: "rgba(255,102,0,0.35)", ghost: "rgba(255,102,0,0.08)" },
  blue:    { base: "#2B78E4", hover: "#2569C8", ring: "rgba(43,120,228,0.32)", ghost: "rgba(43,120,228,0.08)" },
  gold:    { base: "#D4AF37", hover: "#BE9C31", ring: "rgba(212,175,55,0.28)",  ghost: "rgba(212,175,55,0.08)" },
  neutral: { bg: "#F1F1EE", text: "#8E8E87" }
};

export function Button({
  children = "label",
  variant = "primary",
  contrast = "default",
  size = "md",
  tone = "brand",
  leftIcon,
  rightIcon,
  loading,
  disabled,
  fullWidth,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const pal = colors[tone];

  const sizeCls =
    size === "sm" ? "h-9 px-3 text-sm"
    : size === "lg" ? "h-12 px-6 text-base"
    : "h-10 px-4 text-sm";

  const base =
    variant === "secondary"
      ? clsx(
          "bg-white dark:bg-gray-800 text-[color:var(--btn-accent)]",
          "border border-[color:var(--btn-accent)]",
          "hover:bg-[color:var(--btn-ghost)] dark:hover:bg-[color:var(--btn-ghost)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--btn-ring)]",
          "disabled:bg-[#E9E9E3] dark:disabled:bg-gray-700 disabled:text-[#B7B7B0] dark:disabled:text-gray-500 disabled:border-[#D6D6CC] dark:disabled:border-gray-600"
        )
      : contrast === "high"
      ? clsx(
          "bg-white dark:bg-gray-800",
          "border",
          "text-[color:var(--btn-accent)] border-[color:var(--btn-accent)]",
          "hover:bg-[color:var(--btn-accent)] hover:text-white",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--btn-ring)]",
          "disabled:bg-[#E9E9E3] dark:disabled:bg-gray-700 disabled:text-[#B7B7B0] dark:disabled:text-gray-500 disabled:border-[#D6D6CC] dark:disabled:border-gray-600"
        )
      : clsx(
          "text-white border border-transparent",
          "bg-[color:var(--btn-accent)] hover:bg-[color:var(--btn-accent-hover)]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--btn-ring)]",
          "disabled:bg-[#E9E9E3] dark:disabled:bg-gray-700 disabled:text-[#B7B7B0] dark:disabled:text-gray-500"
        );

  return (
    <button
      type={type}
      onClick={onClick}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      disabled={isDisabled}
      style={{
        "--btn-accent": pal.base,
        "--btn-accent-hover": pal.hover,
        "--btn-ring": pal.ring,
        "--btn-ghost": pal.ghost,
      } as React.CSSProperties}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200",
        "focus-visible:outline-none",
        sizeCls,
        base,
        fullWidth && "w-full",
        isDisabled && "cursor-not-allowed",
        className
      )}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {leftIcon && !loading && leftIcon}
      {children}
      {rightIcon && rightIcon}
    </button>
  );
}
