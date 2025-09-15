import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { lists } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  try {
    console.log('GET /api/lists - Buscando listas...')

    const userLists = await db
      .select()
      .from(lists)
      .where(eq(lists.userId, 'dev-user'))
      .orderBy(desc(lists.createdAt))

    console.log(`GET /api/lists - Encontradas ${userLists.length} listas`)

    return NextResponse.json({ data: userLists })
  } catch (error) {
    console.error('GET /api/lists error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/lists - Criando lista...')
    
    const body = await request.json()

    const [newList] = await db
      .insert(lists)
      .values({
        ...body,
        userId: 'dev-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    console.log('POST /api/lists - Lista criada:', newList.id)

    return NextResponse.json({ data: newList }, { status: 201 })
  } catch (error) {
    console.error('POST /api/lists error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
