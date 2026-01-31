import { createBrowserClient } from '@supabase/ssr'
import { Viagem } from '../types'
import { ViagemSchema } from '@/lib/validations/viagens'

// Cliente Supabase para uso no client-side (React Query)
function getClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function getViagens(): Promise<Viagem[]> {
  const supabase = getClient()
  
  const { data, error } = await supabase
    .from('viagens')
    .select('*')
    .order('data', { ascending: false })
    .order('hora', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data as Viagem[]
}

export async function createViagem(viagem: ViagemSchema) {
  const supabase = getClient()

  const { data, error } = await supabase
    .from('viagens')
    .insert([
      {
        empresa_oficina: viagem.empresa_oficina,
        data: viagem.data,
        hora: viagem.hora,
        contato: viagem.contato,
        observacoes: viagem.observacoes,
      },
    ])
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as Viagem
}

