import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { favorites } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`DELETE /api/favorites/${params.id} - Removendo favorito...`)

    const [deletedFavorite] = await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.id, params.id),
          eq(favorites.userId, 'dev-user')
        )
      )
      .returning()

    if (!deletedFavorite) {
      return NextResponse.json({ error: 'Favorite not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`DELETE /api/favorites/${params.id} error:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
