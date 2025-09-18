import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CarCard, PackCard, LoadingSpinner, EmptyState } from './ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCar, faBox } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'

interface Favorite {
  id: string
  itemType: 'car' | 'pack'
  itemId: string
  createdAt: string
  item?: any
}

async function fetchFavorites() {
  const response = await fetch('/api/favorites')
  if (!response.ok) throw new Error('Failed to fetch favorites')
  return response.json()
}

async function removeFavorite(id: string) {
  const response = await fetch(`/api/favorites/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to remove favorite')
  return response.json()
}

export function FavoritesList() {
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites
  })

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      toast.success('Removido dos favoritos!')
    },
    onError: () => {
      toast.error('Erro ao remover dos favoritos')
    }
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Carregando favoritos..." />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon="heart"
        title="Erro ao carregar favoritos"
        description="Não foi possível carregar seus favoritos. Tente novamente."
        actionLabel="Tentar novamente"
        onActionClick={() => queryClient.invalidateQueries({ queryKey: ['favorites'] })}
      />
    )
  }

  const favorites: Favorite[] = data?.data || []

  if (favorites.length === 0) {
    return (
      <EmptyState
        icon="heart"
        title="Nenhum favorito ainda"
        description="Adicione carros e packs aos seus favoritos clicando no ❤️"
        actionLabel="Explorar Carros"
        linkLabel="Ver Packs"
        onActionClick={() => window.location.href = '/cars'}
        onLinkClick={() => window.location.href = '/packs'}
      />
    )
  }

  // Separar por tipo
  const carFavorites = favorites.filter(f => f.itemType === 'car')
  const packFavorites = favorites.filter(f => f.itemType === 'pack')

  const handleRemoveFavorite = (favoriteId: string) => {
    removeMutation.mutate(favoriteId)
  }

  return (
    <div className="space-y-8">
      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <FontAwesomeIcon icon={faHeart} className="w-8 h-8 text-red-500 mb-2" />
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {favorites.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Favoritos</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <FontAwesomeIcon icon={faCar} className="w-8 h-8 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {carFavorites.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Carros</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <FontAwesomeIcon icon={faBox} className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {packFavorites.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Packs</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mb-2 mx-auto">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold text-sm">TH</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {carFavorites.filter(f => f.item?.raridade === 'th' || f.item?.raridade === 'sth').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Treasure Hunts</div>
        </div>
      </div>

      {/* Carros Favoritos */}
      {carFavorites.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faCar} className="w-5 h-5 text-orange-500" />
            Carros Favoritos ({carFavorites.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {carFavorites.map((favorite) => (
              <CarCard
                key={favorite.id}
                car={favorite.item}
                onEdit={() => {}} // Disabled in favorites view
                onDelete={() => {}} // Disabled in favorites view
                onToggleFavorite={() => handleRemoveFavorite(favorite.id)}
                isFavorite={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Packs Favoritos */}
      {packFavorites.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faBox} className="w-5 h-5 text-green-500" />
            Packs Favoritos ({packFavorites.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packFavorites.map((favorite) => (
              <PackCard
                key={favorite.id}
                pack={favorite.item}
                onEdit={() => {}} // Disabled in favorites view
                onDelete={() => {}} // Disabled in favorites view
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
