'use client'

import { useState, useEffect } from 'react'
import { Modal, FormInput, FormSelect, TextArea, Button } from './ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons'

interface Car {
  id: string
  nome: string
  ano: number
  raridade: string
  tipo: string
  observacoes?: string
}

interface CarModalProps {
  car?: Car | null
  isOpen: boolean
  onClose: () => void
  onSave: (car: Partial<Car>) => void
  loading?: boolean
}

export function CarModal({ car, isOpen, onClose, onSave, loading = false }: CarModalProps) {
  console.log('🔄 CarModal renderizado - isOpen:', isOpen, 'car:', car)
  const [formData, setFormData] = useState({
    nome: car?.nome || '',
    ano: car?.ano || new Date().getFullYear(),
    raridade: car?.raridade || 'common',
    tipo: car?.tipo || 'blister',
    observacoes: car?.observacoes || '',
  })

  useEffect(() => {
    if (car) {
      setFormData({
        nome: car.nome,
        ano: car.ano,
        raridade: car.raridade,
        tipo: car.tipo,
        observacoes: car.observacoes || '',
      })
    }
  }, [car])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={car ? 'Editar Carrinho' : 'Novo Carrinho'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="nome"
          label="Nome"
          value={formData.nome}
          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          placeholder="Ex: Lamborghini Huracán"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="ano"
            label="Ano"
            value={formData.ano.toString()}
            onChange={(e) => setFormData(prev => ({ ...prev, ano: parseInt(e.target.value) }))}
          />

          <FormSelect
            id="raridade"
            label="Raridade"
            value={formData.raridade}
            onChange={(e) => setFormData(prev => ({ ...prev, raridade: e.target.value }))}
          >
            <option value="common">Comum</option>
            <option value="rare">Raro</option>
            <option value="th">Treasure Hunt</option>
            <option value="sth">Super Treasure Hunt</option>
          </FormSelect>
        </div>

        <FormSelect
          id="tipo"
          label="Tipo"
          value={formData.tipo}
          onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
        >
          <option value="blister">Blister</option>
          <option value="loose">Loose</option>
          <option value="premium">Premium</option>
        </FormSelect>

        <TextArea
          label="Observações"
          value={formData.observacoes}
          onChange={(value) => setFormData(prev => ({ ...prev, observacoes: value }))}
          placeholder="Observações adicionais sobre o carro..."
          rows={3}
          maxLength={500}
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            tone="brand"
            leftIcon={<FontAwesomeIcon icon={faSave} className="h-4 w-4" />}
            loading={loading}
            disabled={loading}
            fullWidth
          >
            {car ? 'Salvar' : 'Adicionar'}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            tone="blue"
            onClick={onClose}
            leftIcon={<FontAwesomeIcon icon={faTimes} className="h-4 w-4" />}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
