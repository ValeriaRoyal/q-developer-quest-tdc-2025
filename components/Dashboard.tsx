'use client'

import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { Header } from './Header'
import { RecentItems } from './RecentItems'
import { StatCard } from './ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faBox, faList, faHeart } from '@fortawesome/free-solid-svg-icons'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { ErrorBoundary } from './ErrorBoundary'

async function fetchCars() {
  const response = await fetch('/api/cars')
  if (!response.ok) throw new Error('Failed to fetch cars')
  return response.json()
}

export function Dashboard() {
  const { data: session } = useSession()
  
  const { data: carsData, isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: fetchCars,
  })

  // Criar métricas baseadas nos carros
  const metrics = carsData ? {
    totalCars: carsData.pagination?.total || 0,
    totalPacks: 0, // TODO: implementar
    totalLists: 0, // TODO: implementar  
    totalFavorites: 0 // TODO: implementar
  } : null

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="w-full px-4 py-4 space-y-6">
        <div className="text-center">
          <h1 className="page-title">
            Olá, {session?.user?.name || 'Desenvolvedor'}! 👋
          </h1>
          <p className="page-subtitle">
            Sua coleção Hot Wheels
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Carros"
            value={metrics?.totalCars || 0}
            icon={<FontAwesomeIcon icon={faCar} className="h-6 w-6" />}
            color="orange"
            loading={isLoading}
          />
          
          <StatCard
            title="Packs"
            value={metrics?.totalPacks || 0}
            icon={<FontAwesomeIcon icon={faBox} className="h-6 w-6" />}
            color="green"
            loading={isLoading}
          />
          
          <StatCard
            title="Listas"
            value={metrics?.totalLists || 0}
            icon={<FontAwesomeIcon icon={faList} className="h-6 w-6" />}
            color="purple"
            loading={isLoading}
          />
          
          <StatCard
            title="Favoritos"
            value={metrics?.totalFavorites || 0}
            icon={<FontAwesomeIcon icon={faHeart} className="h-6 w-6" />}
            color="red"
            loading={isLoading}
          />
        </div>

        <RecentItems cars={carsData?.data || []} loading={isLoading} />
      </main>
    </div>
    </ErrorBoundary>
  )
}
