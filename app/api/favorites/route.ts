import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { favorites } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  try {
    console.log('GET /api/favorites - Buscando favoritos...')

    const userFavorites = await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, 'dev-user'))
      .orderBy(desc(favorites.createdAt))

    console.log(`GET /api/favorites - Encontrados ${userFavorites.length} favoritos`)

    return NextResponse.json({ data: userFavorites })
  } catch (error) {
    console.error('GET /api/favorites error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/favorites - Adicionando favorito...')
    
    const { carId } = await request.json()

    // Verificar se já existe
    const existing = await db
      .select()
      .from(favorites)
      .where(eq(favorites.itemId, carId))
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json({ error: 'Already favorited' }, { status: 400 })
    }

    const [newFavorite] = await db
      .insert(favorites)
      .values({
        userId: 'dev-user',
        itemType: 'car',
        itemId: carId,
      })
      .returning()

    console.log('POST /api/favorites - Favorito criado:', newFavorite.id)

    return NextResponse.json({ data: newFavorite }, { status: 201 })
  } catch (error) {
    console.error('POST /api/favorites error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
