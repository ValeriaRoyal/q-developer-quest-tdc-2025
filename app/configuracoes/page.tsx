/**
 * Settings Page - Hot Wheels Catalog
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

'use client'

import { Header } from '@/components/Header'
import { Breadcrumb } from '@/components/Breadcrumb'
import { SettingsManager } from '@/components/SettingsManager'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

export default function ConfiguracoesPage() {
  const breadcrumbItems = [
    { label: 'Configurações' }
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        
        <main className="w-full px-4 py-4 space-y-6">
          <Breadcrumb items={breadcrumbItems} />
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <FontAwesomeIcon icon={faCog} className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              Configurações
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Personalize sua experiência no catálogo Hot Wheels
            </p>
          </div>

          <SettingsManager />
        </main>
      </div>
    </ErrorBoundary>
  )
}
