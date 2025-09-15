import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/db/client'
import { listItems, lists } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const items = await db
      .select()
      .from(listItems)
      .innerJoin(lists, eq(listItems.listId, lists.id))
      .where(
        and(
          eq(listItems.listId, params.id),
          eq(lists.userId, session.user.id)
        )
      )

    return NextResponse.json({ data: items })
  } catch (error) {
    console.error('GET /api/lists/[id]/items error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { itemType, itemId } = await request.json()

    if (!itemType || !itemId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const [item] = await db
      .insert(listItems)
      .values({
        listId: params.id,
        itemType,
        itemId,
      })
      .returning()

    return NextResponse.json({ data: item }, { status: 201 })
  } catch (error) {
    console.error('POST /api/lists/[id]/items error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
