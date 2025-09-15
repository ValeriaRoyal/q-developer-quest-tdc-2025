'use client'

import Link from 'next/link'

interface RecentItemsProps {
  cars: any[]
  loading: boolean
}

export function RecentItems({ cars, loading }: RecentItemsProps) {
  if (loading) {
    return (
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Adicionados Recentemente</h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Adicionados Recentemente</h2>
        <Link href="/cars" className="text-[#FF6600] hover:text-[#E55A00] text-sm">
          Ver todos
        </Link>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">🚗</div>
          <p>Nenhum carro cadastrado ainda</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cars.map((car) => (
            <div key={car.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <span className="text-[#FF6600] font-semibold">
                  {car.nome.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{car.nome}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-500">
                  {car.serie} • {car.ano} • {car.raridade}
                </p>
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-500">
                {new Date(car.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
