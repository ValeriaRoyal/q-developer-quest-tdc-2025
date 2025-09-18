import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db/client'
import { lists } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'dev-user'

    const userLists = await db
      .select()
      .from(lists)
      .where(eq(lists.userId, userId))
      .orderBy(desc(lists.createdAt))

    return NextResponse.json({ data: userLists })
  } catch (error: any) {
    console.error('GET /api/lists error:', error?.message || error)
    return NextResponse.json({ 
      error: 'Erro ao buscar listas',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'dev-user'
    
    const body = await request.json()

    if (!body.nome) {
      return NextResponse.json({ error: 'Nome é obrigatório' }, { status: 400 })
    }

    const [newList] = await db
      .insert(lists)
      .values({
        userId,
        nome: body.nome,
        descricao: body.descricao || null,
        isPublic: body.isPublic || false,
        slug: body.slug || null,
      })
      .returning()

    return NextResponse.json({ data: newList }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/lists error:', error?.message || error)
    return NextResponse.json({ 
      error: 'Erro ao criar lista',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: 500 })
  }
}
