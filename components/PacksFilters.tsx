/**
 * Packs Filters Component
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faTimes } from '@fortawesome/free-solid-svg-icons'

interface PacksFiltersProps {
  filters: {
    serie: string
    ano: string
    quantidade: string
  }
  onFiltersChange: (filters: any) => void
}

export function PacksFilters({ filters, onFiltersChange }: PacksFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange((prev: any) => ({ ...prev, [key]: value, page: 1 }))
  }

  const clearFilters = () => {
    onFiltersChange((prev: any) => ({ 
      ...prev, 
      serie: '', 
      ano: '', 
      quantidade: '',
      page: 1 
    }))
  }

  const hasActiveFilters = filters.serie || filters.ano || filters.quantidade

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
          <span className="font-medium">Filtros</span>
          {hasActiveFilters && (
            <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs px-2 py-1 rounded-full">
              Ativos
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
            Limpar
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Série</label>
            <select
              value={filters.serie}
              onChange={(e) => handleFilterChange('serie', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas as séries</option>
              <option value="Mainline">Mainline</option>
              <option value="Car Culture">Car Culture</option>
              <option value="Premium">Premium</option>
              <option value="Team Transport">Team Transport</option>
              <option value="Fast & Furious">Fast & Furious</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ano</label>
            <select
              value={filters.ano}
              onChange={(e) => handleFilterChange('ano', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos os anos</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantidade</label>
            <select
              value={filters.quantidade}
              onChange={(e) => handleFilterChange('quantidade', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Qualquer quantidade</option>
              <option value="1">1 item</option>
              <option value="2-5">2-5 itens</option>
              <option value="6-10">6-10 itens</option>
              <option value="10+">Mais de 10</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
