import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { packs } from '@/db/schema'
import { eq, and, like, desc, count } from 'drizzle-orm'

// GET /api/packs
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/packs - Buscando packs...')

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
      eq(packs.userId, 'dev-user')
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

    console.log(`GET /api/packs - Encontrados ${packsData.length} packs`)

    return NextResponse.json({
      data: packsData,
      pagination: {
        page,
        pageSize,
        total: Number(total),
        totalPages: Math.ceil(Number(total) / pageSize)
      }
    })
  } catch (error) {
    console.error('GET /api/packs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/packs
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/packs - Criando pack...')
    
    const body = await request.json()
    
    const [newPack] = await db
      .insert(packs)
      .values({
        ...body,
        userId: 'dev-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    console.log('POST /api/packs - Pack criado:', newPack.id)

    return NextResponse.json({ data: newPack }, { status: 201 })
  } catch (error) {
    console.error('POST /api/packs error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
