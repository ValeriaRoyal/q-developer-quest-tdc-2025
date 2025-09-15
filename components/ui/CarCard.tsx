import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faEdit, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Button, Badge, RarityBadge, Card } from './index'

interface CarCardProps {
  car: {
    id: string
    nome: string
    ano: number
    raridade: 'common' | 'rare' | 'th' | 'sth'
    tipo: string
    observacoes?: string
    createdAt: string
  }
  onEdit: (car: any) => void
  onDelete: (id: string) => void
  onToggleFavorite?: (id: string) => void
  isFavorite?: boolean
}

export function CarCard({ 
  car, 
  onEdit, 
  onDelete, 
  onToggleFavorite,
  isFavorite = false 
}: CarCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#FF6600] bg-opacity-10 rounded-lg">
            <FontAwesomeIcon icon={faCar} className="h-5 w-5 text-[#FF6600]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
              {car.nome}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{car.ano}</p>
          </div>
        </div>
        
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(car.id)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <FontAwesomeIcon 
              icon={faHeart}
              className={`h-4 w-4 ${isFavorite ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`} 
            />
          </button>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Raridade:</span>
          <RarityBadge rarity={car.raridade} size="sm" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Tipo:</span>
          <Badge variant="default" size="sm">
            {car.tipo}
          </Badge>
        </div>

        {car.observacoes && (
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Observações:</span>
            <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 line-clamp-2">
              {car.observacoes}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
        <Button
          variant="secondary"
          tone="blue"
          size="sm"
          onClick={() => onEdit(car)}
          leftIcon={<FontAwesomeIcon icon={faEdit} className="h-3 w-3" />}
          className="flex-1"
        >
          Editar
        </Button>
        
        <button
          onClick={() => onDelete(car.id)}
          className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
        >
          <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
        </button>
      </div>
    </Card>
  )
}
