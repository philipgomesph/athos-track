import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardView } from '@/features/dashboard/components/dashboard-view'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <DashboardView user={user} />
}
