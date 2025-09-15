import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CarsPage } from '@/components/CarsPage'
import { cookies } from 'next/headers'

export default async function Cars() {
  // Verificar sessão dev em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    const cookieStore = cookies()
    const devSession = cookieStore.get('dev-session')
    
    if (devSession) {
      return <CarsPage />
    }
  }

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/dev-signin')
  }

  return <CarsPage />
}
