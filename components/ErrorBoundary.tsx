'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faRefresh } from '@fortawesome/free-solid-svg-icons'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Log para analytics em produção
    if (process.env.NODE_ENV === 'production') {
      // Aqui você pode enviar para serviços como Sentry, LogRocket, etc.
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              className="text-red-500 text-4xl mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Oops! Algo deu errado
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ocorreu um erro inesperado. Tente recarregar a página.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              <FontAwesomeIcon icon={faRefresh} />
              Tentar novamente
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
