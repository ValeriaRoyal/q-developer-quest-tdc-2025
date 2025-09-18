import { ReactNode } from 'react'
import { Card } from './Card'
import { Loading } from './Loading'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'orange'
  loading?: boolean
  trend?: {
    value: number
    label: string
  }
}

export function StatCard({ 
  title, 
  value, 
  icon, 
  color = 'blue',
  loading = false,
  trend 
}: StatCardProps) {
  const colorStyles = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      value: 'text-blue-700 dark:text-blue-300'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400',
      value: 'text-green-700 dark:text-green-300'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      text: 'text-purple-600 dark:text-purple-400',
      value: 'text-purple-700 dark:text-purple-300'
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-600 dark:text-yellow-400',
      value: 'text-yellow-700 dark:text-yellow-300'
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-600 dark:text-red-400',
      value: 'text-red-700 dark:text-red-300'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      text: 'text-orange-600 dark:text-orange-400',
      value: 'text-orange-700 dark:text-orange-300'
    }
  }

  const styles = colorStyles[color]

  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${styles.bg} mb-3`}>
        <div className={`${styles.text}`}>
          {icon}
        </div>
      </div>
      
      {loading ? (
        <Loading size="sm" />
      ) : (
        <>
          <div className={`text-2xl font-bold ${styles.value} mb-1`}>
            {value}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 dark:text-white mb-2">
            {title}
          </div>
          
          {trend && (
            <div className="text-xs text-gray-500 dark:text-gray-400 dark:text-white">
              <span className={trend.value > 0 ? 'text-green-600 dark:text-green-400' : trend.value < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400 dark:text-white'}>
                {trend.value > 0 ? '+' : ''}{trend.value}
              </span>
              {' '}
              {trend.label}
            </div>
          )}
        </>
      )}
    </Card>
  )
}
