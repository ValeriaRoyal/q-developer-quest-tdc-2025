import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTriangleExclamation,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

type Variant = "full" | "inline";

type Props = {
  variant?: Variant;
  title?: string;                 // ex.: "algo deu errado :("
  message: string;                // ex.: "Não foi possível carregar as informações."
  onRetry?: () => void;           // botão "tentar novamente"
  retryLabel?: string;            // default: "tentar novamente"
  loading?: boolean;              // desabilita o retry
  illustrationSrc?: string;       // opcional (para a versão full)
  className?: string;
};

export default function ErrorState({
  variant = "full",
  title = "algo deu errado :(",
  message,
  onRetry,
  retryLabel = "tentar novamente",
  loading = false,
  illustrationSrc,
  className = "",
}: Props) {
  const Panel = (
    <div
      className="rounded-md border border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20 px-4 py-3"
      role="alert"
      aria-live="polite"
    >
      <p className="text-gray-900 dark:text-gray-100">{message}</p>
    </div>
  );

  const Retry =
    onRetry ? (
      <button
        type="button"
        onClick={onRetry}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-md border border-orange-600 dark:border-orange-500 px-4 py-2 text-orange-700 dark:text-orange-400
                   hover:bg-orange-50 dark:hover:bg-orange-900/20 disabled:opacity-50 focus:outline-none focus-visible:ring-2
                   focus-visible:ring-orange-500/40 transition-colors"
      >
        <FontAwesomeIcon icon={faRotateRight} className="h-4 w-4" />
        {retryLabel}
      </button>
    ) : null;

  if (variant === "inline") {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="mt-1 h-5 w-5 text-red-600 dark:text-red-400"
          aria-hidden="true"
        />
        <div className="space-y-2">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          {Panel}
          {Retry}
        </div>
      </div>
    );
  }

  // full
  return (
    <section className={`flex w-full flex-col items-center text-center ${className}`}>
      {illustrationSrc ? (
        <img
          src={illustrationSrc}
          alt=""
          aria-hidden="true"
          className="mb-6 h-40 w-40 object-contain"
        />
      ) : (
        <div className="mb-6 grid h-40 w-40 place-items-center rounded-full bg-orange-100 dark:bg-orange-900/20">
          <FontAwesomeIcon icon={faTriangleExclamation} className="h-12 w-12 text-red-600 dark:text-red-400" />
        </div>
      )}

      <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
      <div className="mx-auto mb-4 max-w-xl">{Panel}</div>
      {Retry}
    </section>
  );
}
