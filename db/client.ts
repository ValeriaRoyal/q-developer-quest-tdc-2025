import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Verificar se DATABASE_URL está configurada
const connectionString = process.env.DATABASE_URL

let db: any
let client: any

if (!connectionString || connectionString.includes('placeholder')) {
  // Mock database para quando não há conexão real
  db = {
    select: () => ({
      from: () => ({
        where: () => ({
          orderBy: () => ({
            limit: () => Promise.resolve([])
          })
        })
      })
    }),
    insert: () => ({
      values: () => ({
        returning: () => Promise.resolve([])
      })
    }),
    update: () => ({
      set: () => ({
        where: () => ({
          returning: () => Promise.resolve([])
        })
      })
    }),
    delete: () => ({
      where: () => ({
        returning: () => Promise.resolve([])
      })
    })
  }
} else {
  // Conexão real com PostgreSQL
  client = postgres(connectionString, { prepare: false })
  db = drizzle(client, { schema })
}

export { db }
export * from './schema'
