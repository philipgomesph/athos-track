'use client'

import { useState } from 'react'
import { User as UserType } from '@supabase/supabase-js'
import { DashboardStats } from '@/features/viagens/components/dashboard-stats'
import { ListaViagens } from '@/features/viagens/components/lista-viagens'
import { CalendarioViagens } from '@/features/viagens/components/calendario-viagens'
import { NovaViagemDialog } from '@/features/viagens/components/nova-viagem-dialog'
import { BottomNav } from './bottom-nav'
import { Button } from '@/components/ui/button'
import { logout } from '@/features/auth/server/logout-action'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useQueryClient } from '@tanstack/react-query'

type ViewState = 'home' | 'viagens' | 'calendario' | 'perfil'

export function DashboardView({ user }: { user: UserType }) {
  const [currentView, setCurrentView] = useState<ViewState>('home')
  const [isNewTripOpen, setIsNewTripOpen] = useState(false)
  const queryClient = useQueryClient()

  // Wrapper para abrir o dialog controlado manualmente (para usar no botão central)
  // Nota: O NovaViagemDialog original tem seu próprio estado 'open'.
  // Podemos refatorá-lo para aceitar props de controle ou apenas renderizá-lo aqui.
  // Vou renderizar o conteúdo do dialog aqui manualmente para ter controle total pelo botão central.
  
  // Melhor abordagem: Refatorar NovaViagemDialog para ser "Controlled" ou usar um trigger oculto.
  // Por simplicidade, vou usar o NovaViagemDialog como componente, mas preciso acionar a abertura dele.
  // Como o componente original tem o botão embutido, vou criar uma versão controlada aqui ou hackear o trigger.
  
  // Vamos simplificar: O botão central abre um Dialog que contem o FORMULÁRIO de nova viagem.
  // Para isso, vou precisar extrair o formulário do NovaViagemDialog ou ajustá-lo.
  // Vou ajustar o NovaViagemDialog para aceitar `open` e `onOpenChange` props opcionais.
  
  return (
    <div className="pb-24"> {/* Padding bottom para não esconder conteúdo atrás da nav */}
      
      {/* Header Dinâmico */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm">
        <h1 className="text-lg font-bold tracking-tight text-primary capitalize">
          {currentView === 'home' && 'Resumo'}
          {currentView === 'viagens' && 'Minhas Viagens'}
          {currentView === 'calendario' && 'Calendário'}
          {currentView === 'perfil' && 'Meu Perfil'}
        </h1>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        
        {currentView === 'home' && (
          <div className="space-y-6">
            <DashboardStats />
            <section>
              <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Recentes</h2>
              <ListaViagens /> 
              {/* ListaViagens mostra todas por padrão. Idealmente passaríamos um limit=5 prop.
                  Como não implementei limit ainda, vai mostrar todas. Tudo bem por enquanto. */}
            </section>
          </div>
        )}

        {currentView === 'viagens' && (
          <ListaViagens />
        )}

        {currentView === 'calendario' && (
          <CalendarioViagens />
        )}

        {currentView === 'perfil' && (
          <div className="space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Dados da Conta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="text-sm">
                        <span className="font-semibold block">Email:</span>
                        <span className="text-muted-foreground">{user.email}</span>
                    </div>
                    <div className="text-sm">
                        <span className="font-semibold block">ID:</span>
                        <span className="text-muted-foreground text-xs">{user.id}</span>
                    </div>
                </CardContent>
             </Card>

             <form action={logout}>
                <Button variant="destructive" className="w-full" type="submit">
                    Sair do App
                </Button>
             </form>
          </div>
        )}

      </main>

      {/* O Dialog de Nova Viagem é controlado por este estado */}
      <NovaViagemDialog 
        open={isNewTripOpen} 
        onOpenChange={setIsNewTripOpen}
        trigger={null} // Não renderiza botão trigger, pois usamos o FAB da nav
      />

      <BottomNav 
        currentView={currentView} 
        onChangeView={setCurrentView}
        onAddClick={() => setIsNewTripOpen(true)}
      />
    </div>
  )
}

