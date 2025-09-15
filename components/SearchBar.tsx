'use client'

import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FormInput } from './ui'

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilterChange?: (filters: any) => void
  placeholder?: string
  value?: string
}

export function SearchBar({ onSearch, onFilterChange, placeholder = "Buscar carros...", value = "" }: SearchBarProps) {
  const [query, setQuery] = useState(value)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    ano: '',
    raridade: '',
    tipo: ''
  })

  const debouncedSearch = useDebouncedCallback(
    (searchQuery: string) => {
      onSearch(searchQuery)
    },
    300
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    debouncedSearch(newQuery)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = { ano: '', raridade: '', tipo: '' }
    setFilters(emptyFilters)
    onFilterChange?.(emptyFilters)
  }

  return (
    <div className="relative flex gap-2">
      <div className="flex-1">
        <FormInput
          id="search"
          label=""
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          rightIcon={
            query ? (
              <button
                onClick={handleClear}
                className="p-1 hover:bg-gray-100 dark:bg-gray-800 rounded transition-colors"
                aria-label="Limpar busca"
                type="button"
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
              </button>
            ) : undefined
          }
        />
      </div>
      
      {/* Botão de filtro separado */}
      <div className="relative">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md-outlined-button flex items-center gap-2"
          aria-label="Filtros"
          type="button"
        >
          <FontAwesomeIcon icon={faFilter} className="h-4 w-4" />
          Filtros
          <FontAwesomeIcon icon={faChevronDown} className={`h-3 w-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
        
        {/* Dropdown de filtros */}
        {showFilters && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 p-4">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ano</label>
                <select
                  value={filters.ano}
                  onChange={(e) => handleFilterChange('ano', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                >
                  <option value="">Todos os anos</option>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() - i
                    return <option key={year} value={year}>{year}</option>
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raridade</label>
                <select
                  value={filters.raridade}
                  onChange={(e) => handleFilterChange('raridade', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                >
                  <option value="">Todas as raridades</option>
                  <option value="common">Comum</option>
                  <option value="rare">Raro</option>
                  <option value="th">Treasure Hunt</option>
                  <option value="sth">Super Treasure Hunt</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
                <select
                  value={filters.tipo}
                  onChange={(e) => handleFilterChange('tipo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm"
                >
                  <option value="">Todos os tipos</option>
                  <option value="blister">Blister</option>
                  <option value="loose">Loose</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500 dark:text-gray-400 dark:text-gray-500 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:bg-gray-900"
                >
                  Limpar
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-3 py-2 text-sm bg-[#FF6600] text-white rounded-md hover:bg-[#E55A00]"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
