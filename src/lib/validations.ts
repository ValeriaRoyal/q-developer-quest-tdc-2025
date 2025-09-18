import { z } from 'zod'

export const carSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  serie: z.string().min(1, 'Série é obrigatória'),
  ano: z.number().min(1900).max(new Date().getFullYear() + 1),
  raridade: z.enum(['common', 'rare', 'th', 'sth']),
  cor: z.string().optional(),
  tipo: z.enum(['blister', 'loose', 'premium']).default('blister'),
  observacoes: z.string().optional(),
})

export const packSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  serie: z.string().min(1, 'Série é obrigatória'),
  ano: z.number().min(1900).max(new Date().getFullYear() + 1),
  quantidade: z.number().min(1, 'Quantidade deve ser pelo menos 1'),
  observacoes: z.string().optional(),
})

export const favoriteSchema = z.object({
  itemType: z.enum(['car', 'pack']),
  itemId: z.string().uuid(),
})

export const listSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  isPublic: z.boolean().default(false),
})

export type CarInput = z.infer<typeof carSchema>
export type PackInput = z.infer<typeof packSchema>
export type FavoriteInput = z.infer<typeof favoriteSchema>
export type ListInput = z.infer<typeof listSchema>
