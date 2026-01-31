'use client'

import { useQuery } from '@tanstack/react-query'
import { getViagens } from '../services/client-service'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, MapPin } from 'lucide-react'

export function DashboardStats() {
  const { data: viagens } = useQuery({
    queryKey: ['viagens'],
    queryFn: getViagens,
  })

  if (!viagens) return null

  // Cálculos Simples
  const totalViagens = viagens.length
  
  const hoje = new Date().toISOString().split('T')[0]
  const viagensHoje = viagens.filter(v => v.data === hoje).length
  
  const viagensMes = viagens.filter(v => {
    const dataViagem = new Date(v.data)
    const agora = new Date()
    return dataViagem.getMonth() === agora.getMonth() && 
           dataViagem.getFullYear() === agora.getFullYear()
  }).length

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Viagens Mês</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{viagensMes}</div>
          <p className="text-xs text-muted-foreground">
            {viagensHoje > 0 ? `${viagensHoje} hoje` : 'Nenhuma hoje'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Geral</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalViagens}</div>
          <p className="text-xs text-muted-foreground">
            Registradas
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

