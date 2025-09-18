import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, Button, EmptyState, LoadingSpinner, Dropdown } from './ui'
import { ListModal } from './ListModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlus, faUsers, faLock, faEllipsisV, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'

interface List {
  id: string
  nome: string
  descricao?: string
  isPublic: boolean
  itemCount: number
  createdAt: string
}

async function fetchLists() {
  const response = await fetch('/api/lists')
  if (!response.ok) throw new Error('Failed to fetch lists')
  return response.json()
}

async function deleteList(id: string) {
  const response = await fetch(`/api/lists/${id}`, { method: 'DELETE' })
  if (!response.ok) throw new Error('Failed to delete list')
  return response.json()
}

export function ListsManager() {
  const [showModal, setShowModal] = useState(false)
  const [editingList, setEditingList] = useState<List | null>(null)
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['lists'],
    queryFn: fetchLists
  })

  const deleteMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lists'] })
      toast.success('Lista excluída com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao excluir lista')
    }
  })

  const handleEdit = (list: List) => {
    setEditingList(list)
    setShowModal(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta lista?')) {
      deleteMutation.mutate(id)
    }
  }

  const getActionOptions = (list: List) => [
    { value: 'edit', label: 'Editar' },
    { value: 'delete', label: 'Excluir' }
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" text="Carregando listas..." />
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon="list"
        title="Erro ao carregar listas"
        description="Não foi possível carregar suas listas. Tente novamente."
        actionLabel="Tentar novamente"
        onActionClick={() => queryClient.invalidateQueries({ queryKey: ['lists'] })}
      />
    )
  }

  const lists: List[] = data?.data || []

  if (lists.length === 0) {
    return (
      <>
        <EmptyState
          icon="list"
          title="Nenhuma lista criada"
          description="Organize sua coleção em listas personalizadas por tema, ano ou categoria"
          actionLabel="Criar Primeira Lista"
          onActionClick={() => setShowModal(true)}
        />
        
        {showModal && (
          <ListModal
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['lists'] })
              setShowModal(false)
            }}
          />
        )}
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map((list) => (
          <Card key={list.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon 
                  icon={faList} 
                  className="w-5 h-5 text-blue-600 dark:text-blue-400" 
                />
                <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                  {list.nome}
                </h2>
              </div>
              
              <div className="flex items-center gap-2">
                <FontAwesomeIcon 
                  icon={list.isPublic ? faUsers : faLock} 
                  className={`w-4 h-4 ${list.isPublic ? 'text-green-500' : 'text-gray-400 dark:text-white'}`}
                />
                
                <Dropdown
                  label="Ações"
                  items={getActionOptions(list)}
                  onChange={(action) => {
                    if (action === 'edit') handleEdit(list)
                    if (action === 'delete') handleDelete(list.id)
                  }}
                  align="end"
                />
              </div>
            </div>
            
            {list.descricao && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {list.descricao}
              </p>
            )}
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{list.itemCount} {list.itemCount === 1 ? 'item' : 'itens'}</span>
              <span>{list.isPublic ? 'Pública' : 'Privada'}</span>
            </div>
          </Card>
        ))}

        {/* Card para criar nova lista */}
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-500 transition-colors">
          <button
            onClick={() => setShowModal(true)}
            className="w-full h-full flex flex-col items-center justify-center py-8 text-center focus:outline-none focus:ring-2 focus:ring-orange-500/40 rounded-lg"
          >
            <FontAwesomeIcon 
              icon={faPlus} 
              className="w-8 h-8 text-gray-400 dark:text-white mb-3" 
            />
            <h2 className="font-medium text-gray-600 dark:text-gray-400 mb-2">
              Criar Nova Lista
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Organize seus carros por tema, ano ou categoria
            </p>
          </button>
        </Card>
      </div>

      {showModal && (
        <ListModal
          list={editingList}
          onClose={() => {
            setShowModal(false)
            setEditingList(null)
          }}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['lists'] })
            setShowModal(false)
            setEditingList(null)
          }}
        />
      )}
    </>
  )
}
