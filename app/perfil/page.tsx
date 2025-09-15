/**
 * Profile Page - Hot Wheels Catalog
 * Desenvolvido com Amazon Q Developer para TDC São Paulo 2025
 */

import { Header } from '@/components/Header'
import { Breadcrumb } from '@/components/Breadcrumb'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, 
  faCar, 
  faHeart, 
  faList, 
  faBox,
  faTrophy,
  faCalendar,
  faEdit
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function PerfilPage() {
  const breadcrumbItems = [
    { label: 'Meu Perfil' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="w-full px-4 py-4 space-y-6">
        <Breadcrumb items={breadcrumbItems} />

        {/* Header do Perfil */}
        <div className="md-card">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="w-12 h-12 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="display-large">Desenvolvedor</h1>
                <Link href="/configuracoes" className="md-text-button">
                  <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </div>
              <p className="body-large text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-4">
                Colecionador Hot Wheels desde 2024
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                  Membro desde Jan 2024
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faTrophy} className="w-4 h-4" />
                  Colecionador Iniciante
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="md-card text-center">
            <FontAwesomeIcon icon={faCar} className="w-8 h-8 text-orange-500 mb-3" />
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">Carros</div>
          </div>
          
          <div className="md-card text-center">
            <FontAwesomeIcon icon={faBox} className="w-8 h-8 text-green-500 mb-3" />
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">Packs</div>
          </div>
          
          <div className="md-card text-center">
            <FontAwesomeIcon icon={faList} className="w-8 h-8 text-purple-500 mb-3" />
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">Listas</div>
          </div>
          
          <div className="md-card text-center">
            <FontAwesomeIcon icon={faHeart} className="w-8 h-8 text-red-500 mb-3" />
            <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">0</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">Favoritos</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Conquistas */}
          <div className="md-card">
            <h2 className="title-large mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faTrophy} className="w-5 h-5 text-yellow-500" />
              Conquistas
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg opacity-50">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faCar} className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-400 dark:text-gray-500">Primeiro Carro</div>
                  <div className="text-sm text-gray-400 dark:text-gray-500">Adicione seu primeiro Hot Wheels</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg opacity-50">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold text-xs">TH</span>
                </div>
                <div>
                  <div className="font-medium text-gray-400 dark:text-gray-500">Caçador de Tesouros</div>
                  <div className="text-sm text-gray-400 dark:text-gray-500">Encontre seu primeiro Treasure Hunt</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg opacity-50">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faList} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-400 dark:text-gray-500">Organizador</div>
                  <div className="text-sm text-gray-400 dark:text-gray-500">Crie sua primeira lista</div>
                </div>
              </div>
            </div>
          </div>

          {/* Atividade Recente */}
          <div className="md-card">
            <h2 className="title-large mb-4">Atividade Recente</h2>
            <div className="text-center py-8">
              <FontAwesomeIcon icon={faCalendar} className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500">Nenhuma atividade ainda</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Suas ações aparecerão aqui
              </p>
            </div>
          </div>

          {/* Coleção Favorita */}
          <div className="md-card lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="title-large">Coleção em Destaque</h2>
              <Link href="/cars" className="md-text-button">Ver Todos</Link>
            </div>
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faCar} className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="title-medium text-gray-600 dark:text-gray-400 dark:text-gray-500 mb-2">Sua coleção está vazia</h3>
              <p className="body-medium text-gray-500 dark:text-gray-400 mb-6">
                Comece adicionando seus primeiros Hot Wheels para ver sua coleção aqui
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
