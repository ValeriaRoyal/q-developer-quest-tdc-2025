import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faEdit, faTrash, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { Button, Badge, Card } from './index'

interface PackCardProps {
  pack: {
    id: string
    nome: string
    ano: number
    quantidade: number
    observacoes?: string
    createdAt: string
  }
  onEdit: (pack: any) => void
  onDelete: (id: string) => void
}

export function PackCard({ pack, onEdit, onDelete }: PackCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <FontAwesomeIcon icon={faBox} className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
            {pack.nome}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 text-gray-400 dark:text-gray-500" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{pack.ano}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Quantidade:</span>
          <Badge variant="info" size="sm">
            {pack.quantidade} {pack.quantidade === 1 ? 'item' : 'itens'}
          </Badge>
        </div>

        {pack.observacoes && (
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Observações:</span>
            <p className="text-sm text-gray-800 dark:text-gray-200 mt-1 line-clamp-2">
              {pack.observacoes}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(pack)}
          className="flex-1"
        >
          <FontAwesomeIcon icon={faEdit} className="h-3 w-3 mr-1" />
          Editar
        </Button>
        
        <button
          onClick={() => onDelete(pack.id)}
          className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
        >
          <FontAwesomeIcon icon={faTrash} className="h-3 w-3" />
        </button>
      </div>
    </Card>
  )
}
