'use client'

import { useState } from 'react'

export default function DevSignInPage() {
  const [loading, setLoading] = useState(false)

  const handleDevLogin = async () => {
    setLoading(true)
    window.location.href = '/?dev=true'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            🏎️ Hot Wheels Catalog
          </h2>
          <p className="mt-2 text-gray-600">
            Modo de desenvolvimento
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <div className="text-yellow-400 mr-3">⚠️</div>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  OAuth não configurado
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Configure as credenciais no .env.local para usar GitHub/Google
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDevLogin}
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar como Desenvolvedor'}
          </button>

          <div className="text-center">
            <a 
              href="/auth/signin" 
              className="text-sm text-orange-600 hover:text-orange-700"
            >
              Voltar para login OAuth
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
