'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { useState, useEffect } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos
            gcTime: 1000 * 60 * 60 * 24, // 24 horas
          },
        },
      })
  )

  const [persister, setPersister] = useState<any>(null)

  useEffect(() => {
    // Configura o persister apenas no client-side
    if (typeof window !== 'undefined') {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
        key: 'athos-track-cache',
      })
      setPersister(localStoragePersister)
    }
  }, [])

  // Se o persister já estiver pronto, usamos o PersistQueryClientProvider
  if (persister) {
    return (
      <PersistQueryClientProvider 
        client={queryClient} 
        persistOptions={{ persister }}
      >
        {children}
      </PersistQueryClientProvider>
    )
  }

  // Enquanto o persister não está pronto (ou no servidor), usamos o Provider normal
  // Isso evita o erro "No QueryClient set" durante a renderização inicial/SSR
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
