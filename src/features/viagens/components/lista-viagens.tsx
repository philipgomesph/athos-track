'use client'

import { useQuery } from '@tanstack/react-query'
import { getViagens } from '../services/client-service'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CalendarIcon, Clock, User, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function ListaViagens() {
  const { data: viagens, isLoading, error } = useQuery({
    queryKey: ['viagens'],
    queryFn: getViagens,
  })

  if (isLoading) {
    return <div className="text-center py-10">Carregando viagens...</div>
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Erro ao carregar viagens: {error.message}
      </div>
    )
  }

  if (!viagens?.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        Nenhuma viagem registrada ainda.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {viagens.map((viagem) => (
        <Card key={viagem.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{viagem.empresa_oficina}</CardTitle>
              <div className="text-sm text-gray-500 flex flex-col items-end">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  <span>
                    {format(new Date(viagem.data + 'T00:00:00'), "dd 'de' MMM", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{viagem.hora.slice(0, 5)}</span>
                </div>
              </div>
            </div>
            {viagem.contato && (
              <CardDescription className="flex items-center gap-1 mt-1">
                <User className="w-3 h-3" />
                {viagem.contato}
              </CardDescription>
            )}
          </CardHeader>
          {viagem.observacoes && (
            <CardContent>
              <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>{viagem.observacoes}</p>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

