import { z } from 'zod'

export const viagemSchema = z.object({
  empresa_oficina: z.string().min(2, { message: 'Nome da empresa/oficina é obrigatório.' }),
  data: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Data inválida.' }),
  hora: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Hora inválida.' }),
  contato: z.string().optional(),
  observacoes: z.string().optional(),
})

export type ViagemSchema = z.infer<typeof viagemSchema>

