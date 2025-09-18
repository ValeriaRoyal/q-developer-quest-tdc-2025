import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db, hotwheels } from '@/db/client'
import { eq, desc, sql } from 'drizzle-orm'
import { carSchema } from '@/lib/validations'

export async function GET() {
  try {
    // Usar fallback para desenvolvimento se não houver sessão
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'dev-user'
    
    const cars = await db
      .select()
      .from(hotwheels)
      .where(eq(hotwheels.userId, userId))
      .orderBy(desc(hotwheels.createdAt))
      .limit(20)

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(hotwheels)
      .where(eq(hotwheels.userId, userId))

    const total = totalResult[0]?.count || 0

    return Response.json({
      data: cars,
      pagination: {
        page: 1,
        pageSize: 20,
        total: total,
        totalPages: Math.ceil(total / 20),
      },
    })
  } catch (error: any) {
    console.error('GET /api/cars error:', error?.message || error)
    return Response.json({ 
      error: 'Erro ao buscar carros',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id || 'dev-user'
    
    const body = await request.json()
    
    // Validação com Zod
    const validatedData = carSchema.parse(body)
    
    const carData = {
      userId,
      ...validatedData,
      serie: validatedData.serie || 'Hot Wheels',
    }
    
    const [newCar] = await db
      .insert(hotwheels)
      .values(carData)
      .returning()

    return Response.json(newCar, { status: 201 })
    
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return Response.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 })
    }
    
    console.error('POST /api/cars error:', error?.message || error)
    return Response.json({ 
      error: 'Erro ao salvar carrinho',
      details: process.env.NODE_ENV === 'development' ? error?.message : undefined
    }, { status: 500 })
  }
}
