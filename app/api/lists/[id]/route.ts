import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { lists } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`GET /api/lists/${params.id} - Buscando lista...`)

    const list = await db
      .select()
      .from(lists)
      .where(
        and(
          eq(lists.id, params.id),
          eq(lists.userId, 'dev-user')
        )
      )
      .limit(1)

    if (list.length === 0) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 })
    }

    return NextResponse.json({ data: list[0] })
  } catch (error) {
    console.error(`GET /api/lists/${params.id} error:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`PUT /api/lists/${params.id} - Atualizando lista...`)
    
    const body = await request.json()

    const [updatedList] = await db
      .update(lists)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(lists.id, params.id),
          eq(lists.userId, 'dev-user')
        )
      )
      .returning()

    if (!updatedList) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 })
    }

    return NextResponse.json({ data: updatedList })
  } catch (error) {
    console.error(`PUT /api/lists/${params.id} error:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`DELETE /api/lists/${params.id} - Excluindo lista...`)

    const [deletedList] = await db
      .delete(lists)
      .where(
        and(
          eq(lists.id, params.id),
          eq(lists.userId, 'dev-user')
        )
      )
      .returning()

    if (!deletedList) {
      return NextResponse.json({ error: 'List not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`DELETE /api/lists/${params.id} error:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
