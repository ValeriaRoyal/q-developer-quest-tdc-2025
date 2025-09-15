import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db/client'
import { packs } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`GET /api/packs/${params.id} - Buscando pack...`)

    const pack = await db
      .select()
      .from(packs)
      .where(
        and(
          eq(packs.id, params.id),
          eq(packs.userId, 'dev-user')
        )
      )
      .limit(1)

    if (pack.length === 0) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 })
    }

    return NextResponse.json({ data: pack[0] })
  } catch (error) {
    console.error(`GET /api/packs/${params.id} error:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`PUT /api/packs/${params.id} - Atualizando pack...`)
    
    const body = await request.json()

    const [updatedPack] = await db
      .update(packs)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(packs.id, params.id),
          eq(packs.userId, 'dev-user')
        )
      )
      .returning()

    if (!updatedPack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 })
    }

    return NextResponse.json({ data: updatedPack })
  } catch (error) {
    console.error(`PUT /api/packs/${params.id} error:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(`DELETE /api/packs/${params.id} - Excluindo pack...`)

    const [deletedPack] = await db
      .delete(packs)
      .where(
        and(
          eq(packs.id, params.id),
          eq(packs.userId, 'dev-user')
        )
      )
      .returning()

    if (!deletedPack) {
      return NextResponse.json({ error: 'Pack not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`DELETE /api/packs/${params.id} error:`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
