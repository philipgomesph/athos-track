'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getViagens } from '../services/client-service'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ptBR } from 'date-fns/locale'
import { isSameDay, parseISO, format } from 'date-fns'
import { Clock, MapPin } from 'lucide-react'

export function CalendarioViagens() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  const { data: viagens } = useQuery({
    queryKey: ['viagens'],
    queryFn: getViagens,
  })

  // Filtra as viagens do dia selecionado
  const viagensDoDia = viagens?.filter(v => 
    date && isSameDay(parseISO(v.data), date)
  ) || []

  // Cria um array de datas que têm viagens para marcar no calendário
  const diasComViagem = viagens?.map(v => parseISO(v.data)) || []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center border rounded-md p-2 bg-white dark:bg-gray-950">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          modifiers={{
            booked: diasComViagem
          }}
          modifiersStyles={{
            booked: {
              fontWeight: 'bold',
              textDecoration: 'underline',
              color: 'var(--primary)'
            }
          }}
          className="rounded-md"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-500">
            {date ? format(date, "dd 'de' MMMM", { locale: ptBR }) : 'Selecione uma data'}
        </h3>
        
        {viagensDoDia.length > 0 ? (
            viagensDoDia.map(viagem => (
                <Card key={viagem.id} className="border-l-4 border-l-primary">
                    <CardHeader className="py-3">
                        <CardTitle className="text-base flex justify-between">
                            <span>{viagem.empresa_oficina}</span>
                            <div className="flex items-center gap-1 text-xs font-normal text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {viagem.hora.slice(0, 5)}
                            </div>
                        </CardTitle>
                        {viagem.contato && (
                            <CardDescription className="text-xs">
                                Contato: {viagem.contato}
                            </CardDescription>
                        )}
                         {viagem.observacoes && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {viagem.observacoes}
                            </p>
                        )}
                    </CardHeader>
                </Card>
            ))
        ) : (
            <p className="text-sm text-gray-400 italic">Nenhuma viagem agendada para este dia.</p>
        )}
      </div>
    </div>
  )
}

