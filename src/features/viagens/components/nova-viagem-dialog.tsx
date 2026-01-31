'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { viagemSchema, type ViagemSchema } from '@/lib/validations/viagens'
import { createViagem } from '../services/client-service'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'

interface NovaViagemDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
}

export function NovaViagemDialog({ open, onOpenChange, trigger }: NovaViagemDialogProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  
  // Se 'open' e 'onOpenChange' forem fornecidos (modo controlado), usamos eles.
  // Caso contrário, usamos o estado interno.
  const isControlled = open !== undefined && onOpenChange !== undefined
  const finalOpen = isControlled ? open : internalOpen
  const finalSetOpen = isControlled ? onOpenChange : setInternalOpen

  const queryClient = useQueryClient()
  
  const form = useForm<ViagemSchema>({
    resolver: zodResolver(viagemSchema),
    defaultValues: {
      empresa_oficina: '',
      data: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      hora: new Date().toTimeString().slice(0, 5), // HH:MM
      contato: '',
      observacoes: '',
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createViagem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['viagens'] })
      finalSetOpen(false)
      form.reset()
    },
    onError: (error) => {
      console.error(error)
      // Aqui poderíamos usar um toast
    },
  })

  function onSubmit(values: ViagemSchema) {
    mutate(values)
  }

  return (
    <Dialog open={finalOpen} onOpenChange={finalSetOpen}>
      {trigger !== null && (
        <DialogTrigger asChild>
          {trigger || (
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Nova Viagem
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Viagem</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="empresa_oficina"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Empresa / Oficina</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cliente A ou Oficina X" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="data"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hora"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contato (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome ou telefone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Detalhes sobre a visita..." 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

