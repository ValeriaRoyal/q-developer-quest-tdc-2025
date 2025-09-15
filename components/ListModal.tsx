import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Modal, FormInput, TextArea, Switch, Button } from './ui'
import toast from 'react-hot-toast'

interface List {
  id: string
  nome: string
  descricao?: string
  isPublic: boolean
}

interface ListModalProps {
  list?: List | null
  onClose: () => void
  onSuccess: () => void
}

async function saveList(data: any, id?: string) {
  const url = id ? `/api/lists/${id}` : '/api/lists'
  const method = id ? 'PUT' : 'POST'
  
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) throw new Error('Failed to save list')
  return response.json()
}

export function ListModal({ list, onClose, onSuccess }: ListModalProps) {
  const [formData, setFormData] = useState({
    nome: list?.nome || '',
    descricao: list?.descricao || '',
    isPublic: list?.isPublic || false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const mutation = useMutation({
    mutationFn: (data: any) => saveList(data, list?.id),
    onSuccess: () => {
      toast.success(list ? 'Lista atualizada!' : 'Lista criada!')
      onSuccess()
    },
    onError: () => {
      toast.error('Erro ao salvar lista')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setErrors({})
    mutation.mutate(formData)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={list ? 'Editar Lista' : 'Criar Nova Lista'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="list-nome"
          label="Nome da Lista"
          value={formData.nome}
          onChange={(value) => handleChange('nome', value)}
          error={errors.nome}
          placeholder="Ex: Treasure Hunts 2024"
          required
        />

        <TextArea
          label="Descrição"
          value={formData.descricao}
          onChange={(value) => handleChange('descricao', value)}
          placeholder="Descreva o tema ou critério desta lista (opcional)"
          rows={3}
          maxLength={300}
        />

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100">
              Lista Pública
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Outras pessoas poderão ver esta lista
            </p>
          </div>
          <Switch
            checked={formData.isPublic}
            onChange={(checked) => handleChange('isPublic', checked)}
            ariaLabel="Tornar lista pública"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={mutation.isPending}
            className="flex-1"
          >
            {list ? 'Atualizar' : 'Criar Lista'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
