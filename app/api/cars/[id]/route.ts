import { NextRequest } from 'next/server'
import { db, hotwheels } from '@/db/client'
import { eq, and } from 'drizzle-orm'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    console.log('DELETE /api/cars/[id] - ID:', id)
    
    const [deletedCar] = await db
      .delete(hotwheels)
      .where(and(
        eq(hotwheels.id, id),
        eq(hotwheels.userId, 'dev-user')
      ))
      .returning()

    if (!deletedCar) {
      console.log('DELETE /api/cars/[id] - Carro não encontrado')
      return Response.json({ error: 'Carro não encontrado' }, { status: 404 })
    }

    console.log('DELETE /api/cars/[id] - Carro deletado:', deletedCar.nome)
    return Response.json({ message: 'Carro deletado com sucesso' })
    
  } catch (error) {
    console.error('DELETE /api/cars/[id] - Erro:', error)
    return Response.json({ 
      error: 'Erro ao deletar carro',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    
    if (!body.nome || !body.ano || !body.raridade) {
      return Response.json({ error: 'Campos obrigatórios: nome, ano, raridade' }, { status: 400 })
    }
    
    const [updatedCar] = await db
      .update(hotwheels)
      .set({
        nome: body.nome,
        ano: parseInt(body.ano),
        raridade: body.raridade,
        tipo: body.tipo || 'blister',
        observacoes: body.observacoes || null,
      })
      .where(and(
        eq(hotwheels.id, id),
        eq(hotwheels.userId, 'dev-user')
      ))
      .returning()

    if (!updatedCar) {
      return Response.json({ error: 'Carro não encontrado' }, { status: 404 })
    }

    return Response.json(updatedCar)
    
  } catch (error) {
    console.error('PUT /api/cars/[id] - Erro:', error)
    return Response.json({ 
      error: 'Erro ao atualizar carro',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    const [car] = await db
      .select()
      .from(hotwheels)
      .where(and(
        eq(hotwheels.id, id),
        eq(hotwheels.userId, 'dev-user')
      ))

    if (!car) {
      return Response.json({ error: 'Carro não encontrado' }, { status: 404 })
    }

    return Response.json(car)
    
  } catch (error) {
    console.error('GET /api/cars/[id] - Erro:', error)
    return Response.json({ error: 'Erro ao buscar carro' }, { status: 500 })
  }
}
