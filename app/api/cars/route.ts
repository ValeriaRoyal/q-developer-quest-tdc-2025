import { NextRequest } from 'next/server'
import { db, hotwheels } from '@/db/client'
import { eq, desc, sql } from 'drizzle-orm'

export async function GET() {
  try {
    console.log('GET /api/cars - Buscando carros...')
    
    const cars = await db
      .select()
      .from(hotwheels)
      .where(eq(hotwheels.userId, 'dev-user'))
      .orderBy(desc(hotwheels.createdAt))
      .limit(20)

    console.log('GET /api/cars - Carros encontrados:', cars.length)

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(hotwheels)
      .where(eq(hotwheels.userId, 'dev-user'))

    const total = totalResult[0]?.count || 0
    console.log('GET /api/cars - Total no banco:', total)

    return Response.json({
      data: cars,
      pagination: {
        page: 1,
        pageSize: 20,
        total: total,
        totalPages: Math.ceil(total / 20),
      },
    })
  } catch (error) {
    console.error('GET /api/cars error:', error)
    return Response.json({ error: 'Erro ao buscar carros' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('POST /api/cars - Dados recebidos:', JSON.stringify(body, null, 2))
    
    // Validação básica
    if (!body.nome || !body.ano || !body.raridade) {
      console.log('POST /api/cars - Validação falhou')
      return Response.json({ error: 'Campos obrigatórios: nome, ano, raridade' }, { status: 400 })
    }
    
    const carData = {
      userId: 'dev-user',
      nome: body.nome,
      serie: 'Hot Wheels', // Valor padrão
      ano: parseInt(body.ano),
      raridade: body.raridade,
      cor: null, // Removido
      tipo: body.tipo || 'blister',
      observacoes: body.observacoes || null,
    }
    
    console.log('POST /api/cars - Dados para inserir:', JSON.stringify(carData, null, 2))
    
    const [newCar] = await db
      .insert(hotwheels)
      .values(carData)
      .returning()

    console.log('POST /api/cars - Carrinho salvo:', JSON.stringify(newCar, null, 2))
    return Response.json(newCar, { status: 201 })
    
  } catch (error) {
    console.error('POST /api/cars - Erro completo:', error)
    return Response.json({ 
      error: 'Erro ao salvar carrinho',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}
