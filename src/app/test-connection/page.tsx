import { createClient } from '@/lib/supabase/server'

export default async function TestConnectionPage() {
  const supabase = await createClient()
  
  // Tenta conectar ao serviço de Auth. 
  // Mesmo sem usuário logado, isso deve retornar null user e null error (ou error de sessão não encontrada, mas conecta).
  // Se a URL/Key estiverem erradas, vai dar erro de conexão ou autenticação da API.
  const { data, error } = await supabase.auth.getUser()

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">Teste de Conexão Supabase</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded bg-gray-50 dark:bg-gray-900">
          <h2 className="font-semibold mb-2">Status da Conexão:</h2>
          {error ? (
            <div className="text-red-500">
              <p>❌ Erro ao conectar ou buscar usuário.</p>
              <pre className="mt-2 text-sm bg-red-50 p-2 rounded overflow-auto">
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="text-green-600">
              <p>✅ Conexão bem-sucedida!</p>
              <p className="text-sm text-gray-600 mt-1">
                O cliente Supabase foi inicializado e contactou o serviço de Auth.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Detalhes da Sessão Atual:</h2>
          <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        
        <div className="text-sm text-gray-500 mt-8">
            <p>Se você vê "Conexão bem-sucedida" acima, suas variáveis de ambiente e o cliente `server.ts` estão configurados corretamente.</p>
        </div>
      </div>
    </div>
  )
}

