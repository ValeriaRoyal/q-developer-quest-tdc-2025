import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Modal, FormInput, FormSelect, TextArea, Button } from './ui'
import { packSchema } from '@/lib/validations'
import toast from 'react-hot-toast'

interface Pack {
  id: string
  nome: string
  serie: string
  ano: number
  quantidade: number
  observacoes?: string
}

interface PackModalProps {
  pack?: Pack | null
  onClose: () => void
  onSuccess: () => void
}

async function savePack(data: any, id?: string) {
  const url = id ? `/api/packs/${id}` : '/api/packs'
  const method = id ? 'PUT' : 'POST'
  
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  
  if (!response.ok) throw new Error('Failed to save pack')
  return response.json()
}

export function PackModal({ pack, onClose, onSuccess }: PackModalProps) {
  const [formData, setFormData] = useState({
    nome: pack?.nome || '',
    serie: pack?.serie || '',
    ano: pack?.ano || new Date().getFullYear(),
    quantidade: pack?.quantidade || 1,
    observacoes: pack?.observacoes || ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const mutation = useMutation({
    mutationFn: (data: any) => savePack(data, pack?.id),
    onSuccess: () => {
      toast.success(pack ? 'Pack atualizado!' : 'Pack adicionado!')
      onSuccess()
    },
    onError: () => {
      toast.error('Erro ao salvar pack')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = packSchema.parse(formData)
      setErrors({})
      mutation.mutate(validatedData)
    } catch (error: any) {
      const fieldErrors: Record<string, string> = {}
      error.errors?.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message
      })
      setErrors(fieldErrors)
    }
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
      title={pack ? 'Editar Pack' : 'Adicionar Pack'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="pack-nome"
          label="Nome do Pack"
          value={formData.nome}
          onChange={(value) => handleChange('nome', value)}
          error={errors.nome}
          placeholder="Ex: Fast & Furious 5-Pack"
          required
        />

        <FormSelect
          id="pack-serie"
          label="Série"
          value={formData.serie}
          onChange={(value) => handleChange('serie', value)}
          error={errors.serie}
          required
        >
          <option value="">Selecione uma série</option>
          <option value="Mainline">Mainline</option>
          <option value="Car Culture">Car Culture</option>
          <option value="Premium">Premium</option>
          <option value="Team Transport">Team Transport</option>
          <option value="Fast & Furious">Fast & Furious</option>
          <option value="Mario Kart">Mario Kart</option>
          <option value="Forza Motorsport">Forza Motorsport</option>
        </FormSelect>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Ano *
            </label>
            <input
              type="number"
              value={formData.ano}
              onChange={(e) => handleChange('ano', parseInt(e.target.value) || new Date().getFullYear())}
              min={1968}
              max={new Date().getFullYear() + 1}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
              required
            />
            {errors.ano && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ano}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quantidade de Itens *
            </label>
            <input
              type="number"
              value={formData.quantidade}
              onChange={(e) => handleChange('quantidade', parseInt(e.target.value) || 1)}
              min={1}
              max={50}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
              required
            />
            {errors.quantidade && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.quantidade}</p>
            )}
          </div>
        </div>

        <TextArea
          label="Observações"
          value={formData.observacoes}
          onChange={(value) => handleChange('observacoes', value)}
          placeholder="Observações sobre o pack (opcional)"
          rows={3}
          maxLength={500}
        />

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
            {pack ? 'Atualizar' : 'Adicionar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
