import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url('DATABASE_URL deve ser uma URL válida').optional(),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL deve ser uma URL válida').optional(),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET deve ter pelo menos 32 caracteres').optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error('❌ Variáveis de ambiente inválidas:', error)
    process.exit(1)
  }
}

export const env = validateEnv()
