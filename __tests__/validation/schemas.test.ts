import { z } from 'zod'

// Schema básico para Hot Wheels (sem dependências externas)
const hotWheelSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(100),
  serie: z.string().min(1, 'Série é obrigatória').max(50),
  ano: z.number().int().min(1968).max(2025),
  raridade: z.enum(['Comum', 'Raro', 'Super Treasure Hunt', 'Treasure Hunt']),
  tipo: z.enum(['blister', 'loose']).optional()
})

describe('Hot Wheels Schema Validation', () => {
  it('validates correct car data', () => {
    const validCar = {
      nome: 'Corvette C8',
      serie: 'Mainline 2024',
      ano: 2024,
      raridade: 'Comum' as const,
      tipo: 'blister' as const
    }

    const result = hotWheelSchema.safeParse(validCar)
    expect(result.success).toBe(true)
  })

  it('rejects empty name', () => {
    const invalidCar = {
      nome: '',
      serie: 'Mainline',
      ano: 2024,
      raridade: 'Comum' as const
    }

    const result = hotWheelSchema.safeParse(invalidCar)
    expect(result.success).toBe(false)
  })

  it('rejects invalid year', () => {
    const invalidCar = {
      nome: 'Test Car',
      serie: 'Mainline',
      ano: 1900, // Muito antigo
      raridade: 'Comum' as const
    }

    const result = hotWheelSchema.safeParse(invalidCar)
    expect(result.success).toBe(false)
  })

  it('rejects invalid raridade', () => {
    const invalidCar = {
      nome: 'Test Car',
      serie: 'Mainline',
      ano: 2024,
      raridade: 'Invalid' as any
    }

    const result = hotWheelSchema.safeParse(invalidCar)
    expect(result.success).toBe(false)
  })

  it('validates Super Treasure Hunt', () => {
    const sthCar = {
      nome: 'Porsche 911 GT3 RS',
      serie: 'Mainline 2024',
      ano: 2024,
      raridade: 'Super Treasure Hunt' as const
    }

    const result = hotWheelSchema.safeParse(sthCar)
    expect(result.success).toBe(true)
  })
})
