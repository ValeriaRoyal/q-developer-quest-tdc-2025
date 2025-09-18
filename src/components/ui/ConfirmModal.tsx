/**
 * Confirmation Modal Component
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

import { Modal } from './Modal'
import { Button } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info'
  loading?: boolean
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger',
  loading = false
}: ConfirmModalProps) {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return faTrash
      case 'warning':
        return faExclamationTriangle
      case 'info':
        return faCheck
    }
  }

  const getIconColor = () => {
    switch (type) {
      case 'danger':
        return 'text-red-500'
      case 'warning':
        return 'text-yellow-500'
      case 'info':
        return 'text-blue-500'
    }
  }

  const getConfirmButtonStyle = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white'
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700 text-white'
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="text-center py-4">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
          <FontAwesomeIcon 
            icon={getIcon()} 
            className={`w-6 h-6 ${getIconColor()}`}
          />
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 dark:text-white mb-6">
          {message}
        </p>

        <div className="flex gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            leftIcon={<FontAwesomeIcon icon={faTimes} className="w-4 h-4" />}
          >
            {cancelText}
          </Button>
          
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`
              px-4 py-2 rounded-md font-medium transition-colors
              flex items-center gap-2
              ${getConfirmButtonStyle()}
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            {loading ? (
              <FontAwesomeIcon icon={faCheck} className="w-4 h-4 animate-spin" />
            ) : (
              <FontAwesomeIcon icon={getIcon()} className="w-4 h-4" />
            )}
            {loading ? 'Processando...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}
