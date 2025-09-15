'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--md-sys-color-surface)' }}>
          <div className="md-card text-center max-w-md">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="headline-medium mb-4">Algo deu errado!</h2>
            <p className="body-medium mb-6" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
              Ocorreu um erro inesperado. Tente novamente.
            </p>
            <button
              onClick={() => reset()}
              className="md-filled-button"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
