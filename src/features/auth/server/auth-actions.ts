'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  // No Supabase, signUp pode exigir confirmação de e-mail.
  // Se 'confirm email' estiver ligado, o usuário não loga direto.
  // Se desligado, o usuário já estaria logado.
  // Vamos redirecionar para uma página de "Verifique seu e-mail" ou login com aviso.
  
  // Por pragmatismo, vou redirecionar para dashboard se logado, ou login com msg se pendente.
  // Mas como createServerClient com cookie store pode não persistir sessão imediata em alguns fluxos de signup sem confirmação,
  // vamos assumir fluxo padrão: redirecionar para login pedindo confirmação.
  
  redirect('/login?message=Verifique seu e-mail para confirmar o cadastro.')
}
