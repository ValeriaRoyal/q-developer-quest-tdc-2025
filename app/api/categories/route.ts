import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET /api/categories
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Categorias padrão Hot Wheels
    const categories = [
      { id: '1', nome: 'Mainline', cor: '#FF6600' },
      { id: '2', nome: 'Premium', cor: '#FFD700' },
      { id: '3', nome: 'Treasure Hunt', cor: '#32CD32' },
      { id: '4', nome: 'Super Treasure Hunt', cor: '#FF1493' },
      { id: '5', nome: 'Car Culture', cor: '#4169E1' },
      { id: '6', nome: 'Fast & Furious', cor: '#8B0000' },
    ]

    return NextResponse.json({ data: categories })
  } catch (error) {
    console.error('GET /api/categories error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
