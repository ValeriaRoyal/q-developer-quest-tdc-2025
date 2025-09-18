import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db/client'
import { packs } from '@/db/schema'
import { eq, and, like, desc, count } from 'drizzle-orm'

// GET /api/packs
export async function GET(request: NextRequest) {
  try {
    // Verificar se DATABASE_URL está configurada
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
      return Response.json({ 
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
        message: 'Database not configured'
      }, { status: 200 })
    }

    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'dev-user'

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const offset = (page - 1) * pageSize
    
    // Filtros
    const q = searchParams.get('q') || ''
    const serie = searchParams.get('serie') || ''
    const ano = searchParams.get('ano') || ''

    // Construir condições WHERE
    const conditions = [
      eq(packs.userId, userId)
    ]

    if (q) {
      conditions.push(like(packs.nome, `%${q}%`))
    }

    if (serie) {
      conditions.push(eq(packs.serie, serie))
    }

    if (ano) {
      const anoNum = parseInt(ano)
      conditions.push(eq(packs.ano, anoNum))
    }

    // Buscar packs com paginação
    const packsData = await db
      .select()
      .from(packs)
      .where(and(...conditions))
      .orderBy(desc(packs.createdAt))
      .limit(pageSize)
      .offset(offset)

    // Contar total para paginação
    const [{ total }] = await db
      .select({ total: count() })
      .from(packs)
      .where(and(...conditions))

    return NextResponse.json({
      data: packsData,
      pagination: {
        page,
        pageSize,
        total: Number(total),
        totalPages: Math.ceil(Number(total) / pageSize)
      }
    })
  } catch (error: any) {
    console.error('GET /api/packs error:', error?.message || error)
    return NextResponse.json({ 
      error: 'Erro ao buscar packs',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: 500 })
  }
}

// POST /api/packs
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'dev-user'
    
    const body = await request.json()
    
    // Validação básica
    if (!body.nome || !body.ano || !body.quantidade) {
      return NextResponse.json({ error: 'Campos obrigatórios: nome, ano, quantidade' }, { status: 400 })
    }
    
    const [newPack] = await db
      .insert(packs)
      .values({
        ...body,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    return NextResponse.json({ data: newPack }, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/packs error:', error?.message || error)
    return NextResponse.json({ 
      error: 'Erro ao salvar pack',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: 500 })
  }
}
