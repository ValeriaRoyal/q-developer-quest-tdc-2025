import { useState, useEffect } from 'react'
import { Card, FormInput, Switch, Button, RadioTileGroup, Alert } from './ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, 
  faPalette, 
  faBell, 
  faShield,
  faDownload,
  faUpload,
  faDatabase
} from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'

interface UserSettings {
  name: string
  email: string
  theme: 'light' | 'dark' | 'system'
  notifications: {
    newCars: boolean
    reminders: boolean
    updates: boolean
  }
  privacy: {
    publicProfile: boolean
    shareStats: boolean
    allowSearch: boolean
    publicLists: boolean
  }
}

export function SettingsManager() {
  const [settings, setSettings] = useState<UserSettings>({
    name: 'Colecionador Hot Wheels',
    email: 'user@hotwheels.com',
    theme: 'system',
    notifications: {
      newCars: true,
      reminders: false,
      updates: true
    },
    privacy: {
      publicProfile: false,
      shareStats: false,
      allowSearch: true,
      publicLists: false
    }
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('hotwheels-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Save to localStorage (in production, save to API)
      localStorage.setItem('hotwheels-settings', JSON.stringify(settings))
      
      // Apply theme to document
      if (settings.theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else if (settings.theme === 'light') {
        document.documentElement.classList.remove('dark')
      } else {
        // System theme
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        document.documentElement.classList.toggle('dark', isDark)
      }
      
      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    } finally {
      setIsSaving(false)
    }
  }

  const handleExport = () => {
    const data = {
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0'
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hotwheels-backup.json'
    a.click()
    URL.revokeObjectURL(url)
    
    toast.success('Dados exportados com sucesso!')
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.settings) {
          setSettings(data.settings)
          toast.success('Dados importados com sucesso!')
        }
      } catch (error) {
        toast.error('Arquivo inválido')
      }
    }
    reader.readAsText(file)
  }

  const themeOptions = [
    { value: 'light', label: 'Claro', description: 'Tema claro sempre ativo' },
    { value: 'dark', label: 'Escuro', description: 'Tema escuro sempre ativo' },
    { value: 'system', label: 'Automático', description: 'Segue o sistema operacional' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Perfil */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Perfil</h2>
        </div>
        <div className="space-y-4">
          <FormInput
            id="settings-name"
            label="Nome"
            value={settings.name}
            onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Seu nome"
          />
          <FormInput
            id="settings-email"
            label="Email"
            value={settings.email}
            onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
            placeholder="Seu email"
          />
        </div>
      </Card>

      {/* Aparência */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faPalette} className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Aparência</h2>
        </div>
        <RadioTileGroup
          legend="Tema"
          items={themeOptions}
          value={settings.theme}
          onChange={(value) => setSettings(prev => ({ ...prev, theme: value as any }))}
          colsMd={1}
          colsLg={1}
        />
      </Card>

      {/* Notificações */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faBell} className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notificações</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Novos carros adicionados</span>
            <Switch
              checked={settings.notifications.newCars}
              onChange={(checked) => setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, newCars: checked }
              }))}
              ariaLabel="Novos carros adicionados"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Lembretes de organização</span>
            <Switch
              checked={settings.notifications.reminders}
              onChange={(checked) => setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, reminders: checked }
              }))}
              ariaLabel="Lembretes de organização"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Atualizações do sistema</span>
            <Switch
              checked={settings.notifications.updates}
              onChange={(checked) => setSettings(prev => ({
                ...prev,
                notifications: { ...prev.notifications, updates: checked }
              }))}
              ariaLabel="Atualizações do sistema"
            />
          </div>
        </div>
      </Card>

      {/* Dados */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faDatabase} className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Dados</h2>
        </div>
        <div className="space-y-4">
          <Button
            variant="secondary"
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
            Exportar Coleção
          </Button>
          
          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <Button
              variant="secondary"
              onClick={() => document.getElementById('import-file')?.click()}
              className="w-full flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />
              Importar Dados
            </Button>
          </div>
          
          <Alert variant="warning">
            <strong>Atenção:</strong> A importação substituirá todos os dados atuais.
          </Alert>
        </div>
      </Card>

      {/* Privacidade */}
      <Card className="lg:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <FontAwesomeIcon icon={faShield} className="w-5 h-5 text-red-600 dark:text-red-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Privacidade e Segurança</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Perfil público</span>
              <Switch
                checked={settings.privacy.publicProfile}
                onChange={(checked) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, publicProfile: checked }
                }))}
                ariaLabel="Perfil público"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Compartilhar estatísticas</span>
              <Switch
                checked={settings.privacy.shareStats}
                onChange={(checked) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, shareStats: checked }
                }))}
                ariaLabel="Compartilhar estatísticas"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Permitir busca por nome</span>
              <Switch
                checked={settings.privacy.allowSearch}
                onChange={(checked) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, allowSearch: checked }
                }))}
                ariaLabel="Permitir busca por nome"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Listas públicas por padrão</span>
              <Switch
                checked={settings.privacy.publicLists}
                onChange={(checked) => setSettings(prev => ({
                  ...prev,
                  privacy: { ...prev.privacy, publicLists: checked }
                }))}
                ariaLabel="Listas públicas por padrão"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Botões de ação */}
      <div className="lg:col-span-2 flex justify-end gap-4">
        <Button variant="secondary">
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSave}
          loading={isSaving}
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
