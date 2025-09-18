import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { NextResponse } from 'next/server'

export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }
  
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
  }
}

export function createUnauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
